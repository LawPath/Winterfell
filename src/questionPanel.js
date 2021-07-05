import React, { createRef } from 'react';
import _ from 'lodash';
import KeyCodez from 'keycodez';
import Validation from './lib/validation';
import ErrorMessages from './lib/errors';
import Button from './button';
import QuestionSet from './questionSet';
import { SwitchWithTooltip } from './custom/switch';
import styled from 'styled-components';
import ProgressBar from './custom/progressBar';

export const constants = {
  headerHeight: 55,
  actionButtons: 50,
  progressBar: 30,
  buttonsBar: 80,
  mobileButtonsBarExtra: 60,
  suggestionContent: '20vh',
  verticalPadding: 40,
  footer: 31,
  suggestionHeader: 54,
  magicHeight: '10vh',
  minQuestionSection: '230px',
};

export const breakpoint = {
  smallMobile: 450,
  mobile: 575,
  tablet: 767,
  widerThanTablet: 850,
  desktop: 1024,
  wideDesktop: 1200,
};

export const mediaQuery = {
  desktop: `min-width: ${breakpoint.desktop}px`,
  wideDesktop: `min-width: ${breakpoint.wideDesktop}px`,
};

const gaps =
  constants.actionButtons + constants.progressBar + constants.buttonsBar + constants.footer;

const QuestionPanelStyleComponent = styled.div.attrs({ 'data-id': 'winterfell-question-panel' })`
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'body'
    'footer';

  .winterfell-question-sets {
    min-height: calc(
      ${({ windowHeight }) => windowHeight}px - ${gaps}px - ${constants.suggestionContent} -
        ${({ suggestionHeaderHeight }) => suggestionHeaderHeight}px
    );

    @media only screen and (max-width: ${breakpoint.smallMobile}px) {
      min-height: calc(
        ${({ windowHeight }) => windowHeight}px - ${gaps + constants.mobileButtonsBarExtra}px -
          ${constants.suggestionContent} -
          ${({ suggestionHeaderHeight }) => suggestionHeaderHeight}px
      );
    }

    @media only screen and (min-width: ${breakpoint.tablet +
      1}px) and (max-width: ${breakpoint.wideDesktop + 1}px) {
      min-height: clamp(
        ${constants.minQuestionSection},
        calc(
          ${({ windowHeight }) => windowHeight}px - ${gaps + constants.mobileButtonsBarExtra}px -
            ${constants.suggestionContent} -
            ${({ suggestionHeaderHeight }) => suggestionHeaderHeight}px
        ),
        ${({ windowHeight }) => (windowHeight - gaps - constants.mobileButtonsBarExtra) / 2}px
      );
    }

    @media only screen and (min-width: ${breakpoint.wideDesktop + 1}px) {
      /* Move the suggestion panel up to fill the empty space */
      min-height: clamp(
        ${constants.minQuestionSection},
        calc(
          ${({ windowHeight }) => windowHeight}px - ${gaps}px - ${constants.suggestionContent} -
            ${({ suggestionHeaderHeight }) => suggestionHeaderHeight}px -
            ${({ windowHeight }) => (windowHeight - gaps) / 4}px
        ),
        ${({ windowHeight }) => (windowHeight - gaps) / 2}px
      );
    }
  }

  /* Add 10vh for the suggestion body because the height of the suggestion is moved up to 10vh  */
  @media only screen and (min-width: ${breakpoint.wideDesktop + 1}px) {
    .question-panel-suggestion-body {
      min-height: min(${({ windowHeight }) => (windowHeight - gaps) / 4}px, 20vh) !important;
      overflow-y: unset !important;
      height: auto !important;
    }
    .winterfell-suggestion-panel {
      overflow-y: unset;
    }
  }

  @media only screen and (max-width: ${breakpoint.widerThanTablet}px) {
    grid-template-rows: auto auto auto;
    height: auto;

    .winterfell-question-sets {
      min-height: auto;
    }
  }
`;

const SuggesstionWrapper = styled.div.attrs({ 'data-id': 'winterfell-suggestion-wrapper' })`
  display: block;
  background-color: #e7f2f9;
  @media only screen and (max-width: ${breakpoint.widerThanTablet + 1}px) {
    display: none;
  }
`;
export default class QuestionPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validationErrors: this.props.validationErrors,
      currentQuestion: null,
      prefillQuestion: undefined,
    };
    this.suggestionHeaderRef = createRef();
  }

  componentWillReceiveProps(newprops) {
    if (newprops.currentQuestionId) {
      let currentQuestion = this.props.questionAnswers
        ? this.props.questionAnswers[newprops.currentQuestionId]
        : null;
      if (!currentQuestion) return;
      this.setState({ currentQuestion });
    } else {
      this.setState({ currentQuestion: null });
    }

    /* Check prefill questions status */
    if (newprops.currentQuestionsOnPanel) {
      let prefillQuestion = _.find(newprops.currentQuestionsOnPanel, (item) => {
        return item.label && item.enablePrefilledAnswer;
      });
      if (!prefillQuestion) {
        prefillQuestion = _.find(newprops.currentQuestionsOnPanel, (item) => {
          return item.label;
        });
      }
      this.setState({ prefillQuestion });
    }
  }

  handleAnswerValidate = (questionId, questionAnswer, validations) => {
    if (typeof validations === 'undefined' || validations.length === 0) {
      return;
    }

    /*
     * Run the question through its validations and
     * show any error messages if invalid.
     */
    var questionValidationErrors = [];
    validations.forEach((validation) => {
      if (Validation.validateAnswer(questionAnswer.value, validation, this.props.questionAnswers)) {
        return;
      }

      questionValidationErrors.push({
        type: validation.type,
        message: ErrorMessages.getErrorMessage(validation),
      });
    });

    var validationErrors = _.chain(this.state.validationErrors)
      .set(questionId, questionValidationErrors)
      .value();

    this.setState({
      validationErrors: validationErrors,
    });
  };

  handleMainButtonClick = () => {
    var action = this.props.action.default;
    var conditions = this.props.action.conditions || [];

    /*
     * We need to get all the question sets for this panel.
     * Collate a list of the question set IDs required
     * and run through the schema to grab the question sets.
     */
    var questionSetIds = this.props.questionSets.map((qS) => qS.questionSetId);
    var questionSets = _.chain(this.props.schema.questionSets)
      .filter((qS) => questionSetIds.indexOf(qS.questionSetId) > -1)
      .value();

    /*
     * Get any incorrect fields that need error messages.
     */
    var invalidQuestions = Validation.getQuestionPanelInvalidQuestions(
      questionSets,
      this.props.questionAnswers,
    );

    /*
     * If the panel isn't valid...
     */
    if (Object.keys(invalidQuestions).length > 0) {
      var validationErrors = _.mapValues(invalidQuestions, (validations) => {
        return validations.map((validation) => {
          return {
            type: validation.type,
            message: ErrorMessages.getErrorMessage(validation),
          };
        });
      });

      this.setState({
        validationErrors: validationErrors,
      });
      return;
    }

    /*
     * Panel is valid. So what do we do next?
     * Check our conditions and act upon them, or the default.
     */
    conditions.forEach((condition) => {
      const answerObject = this.props.questionAnswers[condition.questionId];
      if (answerObject) {
        const { value: answer } = answerObject;
        action =
          answer == condition.value
            ? {
                action: condition.action,
                target: condition.target,
              }
            : action;
      }
    });

    /*
     * Decide which action to take depending on
     * the action decided upon.
     */
    switch (action.action) {
      case 'GOTO':
        this.props.onSwitchPanel(action.target);
        break;

      case 'SUBMIT':
        this.props.onSubmit(action.target);
        break;
    }
  };

  handleBackButtonClick = () => {
    this.props.onPanelBack();
  };

  handleAnswerChange = (questionId, questionAnswer, questionLabel, validations, validateOn) => {
    this.props.onAnswerChange(questionId, questionAnswer, questionLabel);
    this.setState({
      validationErrors: _.chain(this.state.validationErrors).set(questionId, []).value(),
    });

    if (validateOn === 'change') {
      this.handleAnswerValidate(questionId, questionAnswer, validations);
    }
  };

  handleQuestionBlur = (questionId, questionAnswer, validations, validateOn) => {
    if (validateOn === 'blur') {
      this.handleAnswerValidate(questionId, questionAnswer, validations);
    }
  };

  handleInputKeyDown = (e) => {
    if (KeyCodez[e.keyCode] === 'enter') {
      e.preventDefault();
      this.handleMainButtonClick.call(this);
    }
  };

  getProgressBarInfo = () => {
    let completionPercent = 0;
    let progressBarText = '';
    const { progress } = this.props;

    if (progress) {
      if (!progress.variation || progress.variation === 'classic') {
        completionPercent = Math.floor((100 / this.props.numPanels) * this.props.currentPanelIndex);
      } else if (progress.variation === 'only-completed' && this.props.questionAnswers) {
        const questionSetsCompleted = this.props.schema.questionSets.reduce(
          (acc, qs) =>
            acc.concat(
              qs.questions.map((q) => ({
                questionId: q.questionId,
                answered: !!this.props.questionAnswers[q.questionId],
              })),
            ),
          [],
        );
        let nQuestionsCompleted = questionSetsCompleted.filter((e) => e.answered).length;
        let nQuestionsTotal = questionSetsCompleted.length;
        completionPercent = Math.floor((100 / nQuestionsTotal) * nQuestionsCompleted);
      }

      progressBarText = `${progress.preText || ''}${completionPercent}%${progress.postText || ''}`;
    }
    return { text: progressBarText, progress: completionPercent };
  };

  render() {
    const { progress: completionPercent, text: progressText } = this.getProgressBarInfo();

    const questionSets = this.props.questionSets.map((questionSetMeta) => {
      const questionSet = _.find(this.props.schema.questionSets, {
        questionSetId: questionSetMeta.questionSetId,
      });

      if (!questionSet) {
        return undefined;
      }

      return (
        <QuestionSet
          key={questionSet.questionSetId}
          id={questionSet.questionSetId}
          name={questionSet.name}
          questionSetHeader={questionSet.questionSetHeader}
          questionSetText={questionSet.questionSetText}
          questions={questionSet.questions}
          classes={this.props.classes}
          questionAnswers={this.props.questionAnswers}
          labeledAnswers={this.props.labeledAnswers}
          renderError={this.props.renderError}
          renderRequiredAsterisk={this.props.renderRequiredAsterisk}
          validationErrors={this.state.validationErrors}
          panelConstants={this.props.panelConstants}
          onAnswerChange={this.handleAnswerChange}
          onQuestionBlur={this.handleQuestionBlur}
          onFocus={this.props.onFocus}
          onKeyDown={this.handleInputKeyDown}
          onClickInputIcon={this.props.onClickInputIcon}
          onQuestionMounted={this.props.onQuestionMounted}
        />
      );
    });

    /* Append suggestion section to the form builder */
    const suggestionSets = this.props.questionSets.map((questionSetMeta) => {
      const questionSet = _.find(this.props.schema.questionSets, {
        questionSetId: questionSetMeta.questionSetId,
      });
      if (!questionSet) {
        return undefined;
      }
      const SuggestionSet = this.props.answersSuggestionComponent;
      return (
        <SuggestionSet
          questions={questionSet.questions}
          classes={this.props.classes}
          suggestionPanel={this.props.suggestionPanel}
          panelConstants={this.props.panelConstants}
          questionAnswers={this.props.questionAnswers}
          onAnswerChange={this.props.onAnswerChange}
          defaultSuggestions={this.props.defaultSuggestions}
          headerRef={this.suggestionHeaderRef}
        />
      );
    });

    return (
      <QuestionPanelStyleComponent
        windowHeight={this.props.windowHeight}
        suggestionHeaderHeight={
          this.suggestionHeaderRef.current
            ? this.suggestionHeaderRef.current.clientHeight
            : constants.suggestionHeader
        }
      >
        <div className="question-panel-header">
          {this.props.panelAcions}
          <ProgressBar progress={completionPercent} text={progressText} hasCollaboration={this.props.hasCollaboration} />
        </div>
        <div className="question-panel-body">
          <div className={this.props.classes.questionSets}>{questionSets}</div>

          <div className="question-panel-body-footer">
            <div
              className={`${this.props.classes.buttonBar} ${
                this.props.extraClasses.buttonBar || ''
              }`}
            >
              {this.props.currentPanelIndex > 0 && !this.props.backButton.disabled ? (
                <Button
                  text={this.props.backButton.text || 'Back'}
                  onClick={this.handleBackButtonClick}
                  className={`${this.props.classes.backButton} ${
                    this.props.extraClasses.backButton || ''
                  }`}
                />
              ) : undefined}
              {!this.props.button.disabled ? (
                <Button
                  type="submit"
                  text={this.props.button.text}
                  onClick={this.handleMainButtonClick}
                  className={`${this.props.classes.controlButton} ${
                    this.props.extraClasses.button || ''
                  }`}
                />
              ) : undefined}
            </div>
            <SuggesstionWrapper>{suggestionSets}</SuggesstionWrapper>
          </div>
        </div>
        <div className="question-panel-footer px-0">
          <div className="p-3 text-center bg-white">
            <small className="color-polar-snow">
              Content on this page is not legal advice and you should always seek advice from a
              qualified professional.
            </small>
          </div>
          <div className="prefill-action-bar px-3">
            <img
              className="prefill-action-bar-icon"
              src="https://assets.lawpath.com/images/svg/editor/builder.svg"
            />
            <span className="prefill-action-bar-text">Use pre-fill information</span>
            <span className="prefill-action-bar-action">
              {this.state.prefillQuestion ? (
                <SwitchWithTooltip
                  active={this.state.prefillQuestion.enablePrefilledAnswer}
                  onChange={(status) => this.props.onEnablePrefilledAnswer(status)}
                  disabled={!this.state.prefillQuestion.label}
                />
              ) : (
                <SwitchWithTooltip active={false} disabled={true} />
              )}
            </span>
          </div>
        </div>
      </QuestionPanelStyleComponent>
    );
  }
}

QuestionPanel.defaultProps = {
  validationErrors: {},
  schema: {},
  classes: {},
  extraClasses: {},
  panelId: undefined,
  panelIndex: undefined,
  panelHeader: undefined,
  panelAcions: undefined,
  panelConstants: undefined,
  panelText: undefined,
  progress: undefined,
  numPanels: undefined,
  currentPanelIndex: undefined,
  hasCollaboration: false,
  labeledAnswers: [],
  action: {
    default: {},
    conditions: [],
  },
  button: {
    text: 'Submit',
  },
  backButton: {
    text: 'Back',
  },
  questionSets: [],
  questionAnswers: {},
  renderError: undefined,
  renderRequiredAsterisk: undefined,
  currentQuestionId: undefined,
  windowHeight: 0,
  currentQuestionsOnPanel: {},
  onAnswerChange: () => {},
  onSwitchPanel: () => {},
  onPanelBack: () => {},
  onFocus: () => {},
  onClickInputIcon: () => {},
  onQuestionMounted: () => {},
  onEnablePrefilledAnswer: () => {},
};
