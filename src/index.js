import React, { Component } from 'react';
import _ from 'lodash';

import inputTypes from './inputTypes';
import errorMessages from './lib/errors';
import validation from './lib/validation';
import postQuestionComponents from './custom/postQuestionComponents';
import QuestionPanel from './questionPanel';

class Winterfell extends Component {
  constructor(props) {
    super(props);

    this.formComponent = null;

    this.panelHistory = [];

    var schema = _.extend(
      {
        classes: {},
        formPanels: [],
        questionPanels: [],
        questionSets: [],
      },
      props.schema,
    );

    schema.formPanels = schema.formPanels.sort((a, b) => a.index - b.index);

    var panelId =
      typeof props.panelId !== 'undefined'
        ? props.panelId
        : schema.formPanels.length > 0
        ? schema.formPanels[0].panelId
        : undefined;

    var currentPanel =
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
    };
  }

  componentWillReceiveProps(nextProps) {
    let s = nextProps.schema;
    let newState = {
      action: nextProps.action,
      schema: s,
      questionAnswers: nextProps.questionAnswers,
    };

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
          if (
            qs.questionId ===
            questionsIdWithConditionals.find(
              (e) => e.conditionalQuestionId === nextProps.currentQuestionId,
            ).questionId
          ) {
            return qs.panel;
          }
        });
      }

      if (this.state.currentPanel.panelId !== questionPanel.panel.panelId) {
        newState.currentPanel = questionPanel.panel;
        this.panelHistory.push(questionPanel.panel.panelId);
        newState.currentQuestionId = nextProps.currentQuestionId;
        this.props.onFocus(nextProps.currentQuestionId);
      }
    }

    this.setState(newState);
  }

  handleAnswerChange(questionId, questionAnswer, questionLabel) {
    var questionAnswers = _.chain(this.state.questionAnswers)
      .set(questionId, { value: questionAnswer, label: questionLabel })
      .value();
    this.setState({
      questionAnswers: questionAnswers,
    });
    this.props.onUpdate.bind(null, questionAnswers);
  }

  handleSwitchPanel(panelId, preventHistory) {
    var panel = _.find(this.props.schema.formPanels, {
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

    this.setState(
      {
        currentPanel: panel,
        currentQuestionId: undefined,
      },
      this.props.onSwitchPanel.bind(null, panel),
    );
  }

  handleBackButtonClick() {
    if (this.panelHistory.length > 1) {
      this.panelHistory.pop();
    }

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
  }

  handleSubmit(action) {
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
  }

  render() {
    var currentPanel = _.find(
      this.state.schema.questionPanels,
      (panel) => panel.panelId == this.state.currentPanel.panelId,
    );

    var numPanels = this.state.schema.questionPanels.length;
    var currentPanelIndex = _.indexOf(this.state.schema.questionPanels, currentPanel) + 1;

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
            onPostQuestionComponent={this.props.onPostQuestionComponent}
          />
          {this.props.extraComponent ? this.props.extraComponent : null}
        </div>
      </form>
    );
  }

  componentDidMount() {
    this.props.onRender();
  }
}

Winterfell.inputTypes = inputTypes;
Winterfell.errorMessages = errorMessages;
Winterfell.validation = validation;

Winterfell.postQuestionComponents = postQuestionComponents;

Winterfell.addInputType = Winterfell.inputTypes.addInputType;
Winterfell.addInputTypes = Winterfell.inputTypes.addInputTypes;

Winterfell.addPostQuestionComponent = Winterfell.postQuestionComponents.addPostQuestionComponent;

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
  renderError: undefined,
  renderRequiredAsterisk: undefined,
  currentQuestionId: undefined,
  onSubmit: () => {},
  onUpdate: () => {},
  onFocus: () => {},
  onSwitchPanel: () => {},
  onRender: () => {},
  onPostQuestionComponent: {},
};
export default Winterfell;
