import React, { Component } from 'react';
import _ from 'lodash';

import inputTypes from './inputTypes';
import errorMessages from './lib/errors';
import validation from './lib/validation';
import QuestionPanel from './questionPanel';
import { getPrefillData } from './lib/questionAnswers';
import { QUESTION_INPUT_TYPES as INPUT_TYPES } from './inputTypes/index.js';

export { SwitchWithTooltip as WinterfellSwitchWithTooltip } from './custom/switch';

const FINAL_PANEL_ID = 'final-panel';

export class Winterfell extends Component {
  constructor(props) {
    super(props);

    this.formComponent = null;

    this.panelHistory = [];

    const schema = _.extend(
      {
        classes: {},
        formPanels: [],
        questionPanels: [],
        questionSets: [],
      },
      props.schema,
    );

    schema.formPanels = schema.formPanels.sort((a, b) => a.index - b.index);

    const panelId =
      typeof props.panelId !== 'undefined'
        ? props.panelId
        : schema.formPanels.length > 0
        ? schema.formPanels[0].panelId
        : undefined;

    const currentPanel =
      typeof schema !== 'undefined' &&
      typeof schema.formPanels !== 'undefined' &&
      typeof panelId !== 'undefined'
        ? _.find(schema.formPanels, (panel) => panel.panelId == panelId)
        : undefined;

    this.panelHistory.push(currentPanel.panelId);

    if (!currentPanel) {
      throw new Error('Winterfell: Could not find initial panel and failed to render.');
    }

    this.state = {
      schema: schema,
      currentPanel: currentPanel,
      action: props.action,
      questionAnswers: props.questionAnswers,
      panelMoved: false,
      currentQuestionId: undefined,
      currentQuestions: {},
      currentHasCollaboration: undefined,
    };
  }

  componentDidMount() {
    this.props.onRender();
  }

  componentWillReceiveProps(nextProps) {
    let s = nextProps.schema;
    const { collaborationFinished, hasCollaboration } = nextProps;

    let newState = {
      action: nextProps.action,
      schema: s,
      questionAnswers: nextProps.questionAnswers,
      currentHasCollaboration: hasCollaboration,
    };

    if (collaborationFinished && hasCollaboration) {
      this.handleSwitchPanel(FINAL_PANEL_ID, false);
      return;
    }

    if (nextProps.currentQuestionId) {
      let questionPanels = s.questionSets
        .map((qs) =>
          qs.questions.map((q2) => {
            return {
              questionId: q2.questionId,
              panel: s.formPanels.find(
                (p1) =>
                  s.questionPanels.find((p2) =>
                    p2.questionSets.find((pqs) => pqs.questionSetId === qs.questionSetId),
                  ).panelId === p1.panelId,
              ),
            };
          }),
        )
        .reduce((acc, el) => acc.concat(el), []);

      let questionPanel = questionPanels.find((qs) => {
        if (nextProps.currentQuestionId === qs.questionId) {
          return qs.panel;
        }
      });

      if (!questionPanel) {
        const conditionalQuestions = [];
        const questionsIdWithConditionals = s.questionSets
          .filter((f) => f.questions.length)
          .filter(
            (g) =>
              g.questions[0].input.options &&
              g.questions[0].input.options.filter((q2) => q2.conditionalQuestions).length,
          )
          .map((e) => e.questions[0])
          .map((e) => ({
            questionId: e.questionId,
            conditionalQuestionId: e.input.options.filter((f) => f.conditionalQuestions)[0]
              .conditionalQuestions[0].questionId,
          }));

        questionPanel = questionPanels.find((qs) => {
          const conditionalQuestion = questionsIdWithConditionals.find(
            (e) => e.conditionalQuestionId === nextProps.currentQuestionId,
          );

          if (conditionalQuestion && conditionalQuestion.questionId == qs.questionId) {
            return qs.panel;
          }
        });
      }

      if (questionPanel && this.state.currentPanel.panelId !== questionPanel.panel.panelId) {
        newState.currentPanel = questionPanel.panel;
        this.panelHistory.push(questionPanel.panel.panelId);
        newState.currentQuestionId = nextProps.currentQuestionId;
        this.props.onFocus(nextProps.currentQuestionId);
      }
    }

    if (!_.isEqual(this.props.labeledAnswers, nextProps.labeledAnswers)) {
      /* Update the the labeledAswers when they got updated from parent*/
      _.forEach(nextProps.questionAnswers, (value, key) => {
        let mergedData;
        const prefillData = getPrefillData(nextProps.labeledAnswers, value.label);
        if (value.enablePrefilledAnswer) {
          /* if the prefillData toggle is enabled, it will replace the input data */
          /* if the current data is empty, it will set the prefill value */
          mergedData = { ...value, value: prefillData, prefilledData: prefillData };
        } else if (!value.enablePrefilledAnswer && prefillData && _.isEmpty(value.prefilledData)) {
          /* if the current data is empty and there is prefill data, we will enable prefill data and set the value to the answer */
          mergedData = {
            ...value,
            enablePrefilledAnswer: true,
            value: prefillData,
            prefilledData: prefillData,
          };
        } else if (!_.isEqual(prefillData, value.prefilledData)) {
          /* Update prefill data only */
          mergedData = { ...value, prefilledData: prefillData };
        }
        if (mergedData) {
          _.set(newState.questionAnswers, [key], { ...mergedData });
        }
      });
    }

    if (hasCollaboration && this.state.currentHasCollaboration === false) {
      Object.entries(newState.questionAnswers).forEach(({ 0: key, 1: value }) => {
        _.set(newState.questionAnswers, [key], { ...value, enablePrefilledAnswer: false });
      });
    }

    this.setState(newState);
  }

  handleAnswerChange = (questionId, questionAnswer, questionLabel) => {
    const currentAnswer = _.get(this.state.questionAnswers, [questionId]);
    const mergedData = { ...currentAnswer, value: questionAnswer, label: questionLabel };

    if (
      mergedData &&
      mergedData.enablePrefilledAnswer &&
      mergedData.value !== mergedData.prefilledData
    ) {
      /* If user edit the prefill data, we will toggle out the prefill toggle */
      mergedData.enablePrefilledAnswer = false;
    }

    const questionAnswers = _.set(this.state.questionAnswers, questionId, mergedData);

    const newCurrentQuestions = {
      ...this.state.currentQuestions,
      [questionId]: questionAnswers[questionId],
    };

    this.setState({ questionAnswers: questionAnswers, currentQuestions: newCurrentQuestions });
    this.props.onUpdate(questionAnswers);
  };

  onQuestionMounted = (questionId, label) => {
    let currentQuestionAnswers = this.state.questionAnswers;

    if (label) {
      const prefillData = getPrefillData(this.props.labeledAnswers, label);

      const currentQuestion = _.get(this.state.questionAnswers, questionId);

      if (currentQuestion === null || currentQuestion === undefined) {
        if (prefillData) {
          console.log('Set prefill data: answer is empty and have prefill data');

          if (this.props.hasCollaboration && this.state.currentHasCollaboration === false) {
            Object.entries(newState.questionAnswers).forEach(({ 0: key, 1: value }) => {
              _.set(currentQuestionAnswers, [questionId], {
                label: label,
                enablePrefilledAnswer: false,
                prefilledData: prefillData,
              });
            });
          } else {
            _.set(currentQuestionAnswers, questionId, {
              label: label,
              enablePrefilledAnswer: true,
              value: prefillData,
              prefilledData: prefillData,
            });
          }
        } else {
          console.log(
            'Set prefill data: answer is empty and no prefill data ',
            this.props.labeledAnswers,
          );

          _.set(currentQuestionAnswers, questionId, {
            label: label,
            enablePrefilledAnswer: false,
            prefilledData: prefillData,
          });
        }
      } else {
        /* Get the enable prefill toggle variable*/
        const enablePrefilledAnswer = _.get(this.state.questionAnswers, [
          questionId,
          'enablePrefilledAnswer',
        ]);

        let mergedData;
        if (!enablePrefilledAnswer) {
          mergedData = {
            ..._.get(this.state.questionAnswers, [questionId]),
            label: label,
            prefilledData: prefillData,
          };
          console.log(
            'Set prefill data: answer is existed and prefillMode is disable ',
            mergedData,
          );
        } else {
          mergedData = {
            ..._.get(this.state.questionAnswers, [questionId]),
            label: label,
            enablePrefilledAnswer: true,
            prefilledData: prefillData,
          };
          console.log('Set prefill data: answer is existed and prefillMode is enable ', mergedData);
        }

        if (
          mergedData.value &&
          mergedData.enablePrefilledAnswer &&
          !_.isEqual(mergedData.value, mergedData.prefilledData)
        ) {
          console.log('Set prefill data: have prefilled data and data is overriden by user');
          mergedData.enablePrefilledAnswer = false;
        } else if (!mergedData.value && mergedData.enablePrefilledAnswer) {
          console.log(
            'Set prefill data: prefillMode is enable and prefilledData will override the user-input data ',
          );
          mergedData.value = mergedData.prefilledData;
        }
        _.set(currentQuestionAnswers, [questionId], { ...mergedData });
      }
    } else {
      const mergedData = {
        ..._.get(this.state.questionAnswers, [questionId]),
        label: null,
        enablePrefilledAnswer: false,
      };
      _.set(currentQuestionAnswers, [questionId], { ...mergedData });
    }

    /* Add mounted question to the questions in the panel  */
    const newCurrentQuestions = {
      ...this.state.currentQuestions,
      [questionId]: currentQuestionAnswers[questionId],
    };

    this.setState({
      questionAnswers: currentQuestionAnswers,
      currentQuestionId: questionId,
      currentQuestions: newCurrentQuestions,
    });

    this.props.onRender({
      questionAnswers: currentQuestionAnswers,
      questionId,
      currentQuestionAnswers,
      currentPanel: this.state.currentPanel,
    });
  };

  handleOnEnablePrefilledAnswer = (enable) => {
    let questionAnswers = { ...this.state.questionAnswers };
    let updatedCurrentQuestions = {};

    _.forEach(this.state.currentQuestions, (value, key) => {
      if (value && value.label) {
        const mergedData = { ...questionAnswers[key], enablePrefilledAnswer: enable };

        if (mergedData.enablePrefilledAnswer) {
          /* if the prefill-value is enabled, we will replace the inputed text  */
          mergedData.value = mergedData.prefilledData;
        }
        questionAnswers = _.chain(questionAnswers).set(key, mergedData).value();
        updatedCurrentQuestions = { ...updatedCurrentQuestions, [key]: mergedData };
      }
    });

    if (questionAnswers) {
      const newCurrentQuestions = { ...this.state.currentQuestions, ...updatedCurrentQuestions };
      this.setState({ questionAnswers: questionAnswers, currentQuestions: newCurrentQuestions });
      this.props.onUpdate(questionAnswers);
    }
  };

  handleSwitchPanel = (panelId, preventHistory) => {
    const panel = _.find(this.props.schema.formPanels, {
      panelId: panelId,
    });

    if (!panel) {
      throw new Error(
        'Winterfell: Tried to switch to panel "' + panelId + '", which does not exist.',
      );
    }

    if (!preventHistory) {
      this.panelHistory.push(panel.panelId);
    }

    if (panel && panel.panelId === FINAL_PANEL_ID) {
      /* The final panel does not contain any question */
      this.setState({ currentQuestionId: undefined });
    }

    /* Clear questions on panel */
    this.setState({
      currentPanel: panel,
      conditionalQuestionId: undefined,
      currentQuestions: {},
    });

    this.props.onSwitchPanel(panel);
  };

  handleBackButtonClick = () => {
    if (this.panelHistory.length > 1) {
      this.panelHistory.pop();
    }

    /* Clear questions on panel */
    this.setState({ currentQuestions: {} });

    this.handleSwitchPanel.call(this, this.panelHistory[this.panelHistory.length - 1], true);
    // let panelIndex = this.state.schema.formPanels.find(fp =>
    //   fp.panelId === this.state.currentPanel.panelId).index;
    // let newPanelIndex = panelIndex > 0 ? this.state.schema.formPanels.find(fp =>
    //   fp.index === panelIndex - 1) : null;
    //
    // console.log("this.state.schema.formPanels", JSON.stringify(this.state.schema.formPanels));
    // console.log("panelIndex", JSON.stringify(panelIndex));
    // console.log("newPanelIndex", JSON.stringify(newPanelIndex));
    //
    // this.handleSwitchPanel.call(
    //   this, newPanelIndex ? newPanelIndex.panelId : 0
    // );
  };

  handleSubmit = (action) => {
    if (this.props.disableSubmit) {
      this.props.onSubmit(this.state.questionAnswers, action);
      return;
    }

    /*
     * If we are not disabling the functionality of the form,
     * we need to set the action provided in the form, then submit.
     */
    this.setState(
      {
        action: action,
      },
      () => {
        if (!this.formComponent) {
          return;
        }

        this.formComponent.submit();
      },
    );
  };

  render() {
    const currentPanel = this.state.schema.questionPanels.find(
      (panel) => panel.panelId == this.state.currentPanel.panelId,
    );

    const disableNavigationButtons =
      currentPanel.panelId === FINAL_PANEL_ID &&
      this.props.hasCollaboration &&
      this.props.collaborationFinished;

    const numPanels = this.state.schema.questionPanels.length;
    const currentPanelIndex = _.indexOf(this.state.schema.questionPanels, currentPanel) + 1;

    return (
      <form
        method={this.props.method}
        encType={this.props.encType}
        action={this.state.action}
        ref={(ref) => (this.formComponent = ref)}
        className={this.state.schema.classes.form}
      >
        <div className={this.state.schema.classes.questionPanels}>
          <QuestionPanel
            schema={this.state.schema}
            classes={this.state.schema.classes}
            panelConstants={this.state.schema.panelConstants}
            defaultSuggestions={this.state.schema.defaultSuggestions}
            suggestionPanel={this.state.schema.suggestionPanel}
            panelId={currentPanel.panelId}
            panelIndex={currentPanel.panelIndex}
            panelHeader={currentPanel.panelHeader}
            panelText={currentPanel.panelText}
            action={currentPanel.action}
            button={currentPanel.button}
            backButton={currentPanel.backButton}
            extraClasses={currentPanel.classes}
            questionSets={currentPanel.questionSets}
            progress={currentPanel.progress}
            numPanels={numPanels}
            currentPanelIndex={currentPanelIndex}
            questionAnswers={this.state.questionAnswers}
            renderError={this.props.renderError}
            renderRequiredAsterisk={this.props.renderRequiredAsterisk}
            onAnswerChange={this.handleAnswerChange.bind(this)}
            onFocus={this.props.onFocus}
            onPanelBack={this.handleBackButtonClick.bind(this)}
            onSwitchPanel={this.handleSwitchPanel.bind(this)}
            onSubmit={this.handleSubmit.bind(this)}
            onClickInputIcon={this.props.onClickInputIcon}
            panelAcions={this.props.extraComponent}
            onQuestionMounted={this.onQuestionMounted.bind(this)}
            labeledAnswers={this.props.labeledAnswers}
            currentQuestionId={this.state.currentQuestionId}
            onEnablePrefilledAnswer={this.handleOnEnablePrefilledAnswer.bind(this)}
            answersSuggestionComponent={this.props.answersSuggestionComponent}
            windowHeight={this.props.windowHeight}
            currentQuestionsOnPanel={this.state.currentQuestions}
            hasCollaboration={this.props.hasCollaboration}
            disableNavigationButtons={disableNavigationButtons}
          />
        </div>
      </form>
    );
  }
}

Winterfell.inputTypes = inputTypes;
Winterfell.errorMessages = errorMessages;
Winterfell.validation = validation;

Winterfell.addInputType = Winterfell.inputTypes.addInputType;
Winterfell.addInputTypes = Winterfell.inputTypes.addInputTypes;

Winterfell.addErrorMessage = Winterfell.errorMessages.addErrorMessage;
Winterfell.addErrorMessages = Winterfell.errorMessages.addErrorMessages;

Winterfell.addValidationMethod = Winterfell.validation.addValidationMethod;
Winterfell.addValidationMethods = Winterfell.validation.addValidationMethods;

Winterfell.defaultProps = {
  questionAnswers: {},
  encType: 'application/x-www-form-urlencoded',
  method: 'POST',
  action: '',
  panelId: undefined,
  disableSubmit: false,
  hasCollaboration: false,
  collaborationFinished: false,
  renderError: undefined,
  renderRequiredAsterisk: undefined,
  currentQuestionId: undefined,
  panelConstants: undefined,
  questionAnswers: undefined,
  answersSuggestionComponent: undefined,
  labeledAnswers: [],
  windowHeight: 0,
  onSubmit: () => {},
  onUpdate: () => {},
  onFocus: () => {},
  onSwitchPanel: () => {},
  onRender: () => {},
  onClickInputIcon: () => {},
};

export const QUESTION_INPUT_TYPES = INPUT_TYPES;
export default Winterfell;
