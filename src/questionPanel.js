import React from 'react';
import _ from 'lodash';
import KeyCodez from 'keycodez';
import Validation from './lib/validation';
import ErrorMessages from './lib/errors';
import Button from './button';
import QuestionSet from './questionSet';
import Switch from './custom/switch';
import styled from 'styled-components';

export const constants = {
  headerHeight: 55,
};

export const breakpoint = {
  desktop: 768,
  wideDesktop: 1200,
};

export const mediaQuery = {
  desktop: `min-width: ${breakpoint.desktop}px`,
  wideDesktop: `min-width: ${breakpoint.wideDesktop}px`,
};

const QuestionPanelStyleComponent = styled.div.attrs({ 'data-id': 'winterfell-question-panel' })`
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr calc(20vh + 155px) auto;
  grid-template-areas:
    'header'
    'body'
    'bodyFooter'
    'footer';

  @media only screen and (max-width: 768px) {
    grid-template-rows: auto auto auto auto;
    height: auto;
  }
`;

export default class QuestionPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validationErrors: this.props.validationErrors,
      currentQuestion: null,
    };
  }

  componentWillReceiveProps(newprops) {
    if (newprops.currentQuestionId) {
      console.log('This is the state of the information before: ', newprops);
      let currentQuestion = this.props.questionAnswers
        ? this.props.questionAnswers[newprops.currentQuestionId]
        : null;
      if (!currentQuestion) return;
      console.log(
        'This is the state of the information: ',
        newprops,
        newprops.currentQuestionId,
        currentQuestion.enablePrefilledAnswer,
        currentQuestion,
      );
      this.setState({ currentQuestion });
    }
  }

  handleAnswerValidate(questionId, questionAnswer, validations) {
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
  }

  handleMainButtonClick() {
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
      const { value: answer } = answerObject;
      action =
        answer == condition.value
          ? {
              action: condition.action,
              target: condition.target,
            }
          : action;
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
  }

  handleBackButtonClick() {
    this.props.onPanelBack();
  }

  handleAnswerChange(questionId, questionAnswer, questionLabel, validations, validateOn) {
    this.props.onAnswerChange(questionId, questionAnswer, questionLabel);
    this.setState({
      validationErrors: _.chain(this.state.validationErrors).set(questionId, []).value(),
    });

    if (validateOn === 'change') {
      this.handleAnswerValidate(questionId, questionAnswer, validations);
    }
  }

  handleQuestionBlur(questionId, questionAnswer, validations, validateOn) {
    if (validateOn === 'blur') {
      this.handleAnswerValidate(questionId, questionAnswer, validations);
    }
  }

  handleInputKeyDown(e) {
    if (KeyCodez[e.keyCode] === 'enter') {
      e.preventDefault();
      this.handleMainButtonClick.call(this);
    }
  }

  render() {
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
          onAnswerChange={this.handleAnswerChange.bind(this)}
          onQuestionBlur={this.handleQuestionBlur.bind(this)}
          onFocus={this.props.onFocus}
          onKeyDown={this.handleInputKeyDown.bind(this)}
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
        />
      );
    });

    var completionPercent = 0;

    if (typeof this.props.progress !== 'undefined') {
      if (!this.props.progress.variation || this.props.progress.variation === 'classic') {
        completionPercent = Math.floor((100 / this.props.numPanels) * this.props.currentPanelIndex);
      } else if (this.props.progress.variation === 'only-completed' && this.props.questionAnswers) {
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
    }

    var progressBar = undefined;
    if (typeof this.props.progress !== 'undefined' && this.props.progress.showBar) {
      progressBar = (
        <div className={this.props.classes.progressBar}>
          <div className={this.props.classes.progressBarIncomplete}>
            <div
              className={this.props.classes.progressBarComplete}
              style={{ width: `${completionPercent}%` }}
            >
              {this.props.progress.showPercent
                ? `${
                    this.props.progress.postText ? this.props.progress.postText : ''
                  }${completionPercent}%${
                    this.props.progress.postText ? this.props.progress.postText : ''
                  }`
                : ''}
            </div>
          </div>
        </div>
      );
    }
    return (
      <QuestionPanelStyleComponent>
        <div className="question-panel-header">
          {this.props.panelAcions}
          {this.props.progress && this.props.progress.position === 'top' ? progressBar : undefined}
        </div>
        <div className="question-panel-body">
          <div className={this.props.classes.questionSets}>{questionSets}</div>
          {this.props.progress && this.props.progress.position === 'middle'
            ? progressBar
            : undefined}
        </div>

        <div className="question-panel-body-footer">
          <div
            className={`${this.props.classes.buttonBar} ${this.props.extraClasses.buttonBar || ''}`}
          >
            {this.props.currentPanelIndex > 0 && !this.props.backButton.disabled ? (
              <Button
                text={this.props.backButton.text || 'Back'}
                onClick={this.handleBackButtonClick.bind(this)}
                className={`${this.props.classes.backButton} ${
                  this.props.extraClasses.backButton || ''
                }`}
              />
            ) : undefined}
            {!this.props.button.disabled ? (
              <Button
                text={this.props.button.text}
                onClick={this.handleMainButtonClick.bind(this)}
                className={`${this.props.classes.controlButton} ${
                  this.props.extraClasses.button || ''
                }`}
              />
            ) : undefined}
          </div>
          <div className="d-none d-md-block">{suggestionSets}</div>
        </div>
        <div className="question-panel-footer">
          <div className="prefill-action-bar">
            <img
              className="prefill-action-bar-icon"
              src="https://assets.lawpath.com/images/svg/editor/builder.svg"
            />
            <span className="prefill-action-bar-text">Use pre-fill information</span>
            <span className="prefill-action-bar-action">
              {this.state.currentQuestion ? (
                <Switch
                  active={this.state.currentQuestion.enablePrefilledAnswer}
                  onChange={this.props.onEnablePrefilledAnswer}
                  disabled={
                    !this.state.currentQuestion ||
                    (this.state.currentQuestion && !this.state.currentQuestion.label)
                  }
                />
              ) : null}
            </span>
          </div>
        </div>
        {this.props.progress && this.props.progress.position === 'bottom' ? progressBar : undefined}
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
  onAnswerChange: () => {},
  onSwitchPanel: () => {},
  onPanelBack: () => {},
  onFocus: () => {},
  onClickInputIcon: () => {},
  onQuestionMounted: () => {},
  onEnablePrefilledAnswer: () => {},
};
