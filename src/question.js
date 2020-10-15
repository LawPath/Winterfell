import React, { Component } from 'react';
import _ from 'lodash';

import InputTypes from './inputTypes';
import PostQuestionComponents from './custom/postQuestionComponents';

export default class Question extends Component {
  componentDidMount() {
    const { input, questionAnswers, questionId } = this.props;
    if (
      typeof input.default === 'undefined' ||
      (input.type === 'checkboxInput' && typeof questionAnswers[questionId] === 'undefined')
    ) {
      return;
    }
    this.handleInputChange(questionId, input.default);
  }

  handleInputChange = (questionId, value) => {
    this.props.onAnswerChange(
      questionId,
      value,
      this.props.label,
      this.props.validations,
      this.props.validateOn,
    );
  };

  handleInputBlur = (questionId, value) => {
    this.props.onQuestionBlur(questionId, value, this.props.validations, this.props.validateOn);
  };

  render() {
    const Input = InputTypes[this.props.input.type];
    const PostQuestionComponent =
      this.props.postQuestionComponent && this.props.postQuestionComponent.name
        ? PostQuestionComponents[this.props.postQuestionComponent.name]
        : null;
    if (!Input) {
      throw new Error(
        'Winterfell: Input Type "' +
          this.props.input.type +
          '" not defined as Winterfell Input Type',
      );
    }

    /*
     * Conditional Questions
     *
     * Go through the inputs options and filter them down
     * to options where the value matches the current questions
     * value. If we have conditional questions on a given option,
     * then render this component with the props for the conditional
     * question.
     */
    const conditionalItems = [];
    if (typeof this.props.input.options !== 'undefined') {
      this.props.input.options
        .filter((option) => {
          return this.props.value instanceof Array
            ? this.props.value.indexOf(option.value) > -1
            : this.props.value == option.value;
        })
        .filter((option) => {
          return (
            typeof option.conditionalQuestions !== 'undefined' &&
            option.conditionalQuestions.length > 0
          );
        })
        .forEach((option) =>
          [].forEach.bind(option.conditionalQuestions, (conditionalQuestion) => {
            const answer = this.props.questionAnswers[conditionalQuestion.questionId];
            conditionalItems.push(
              <Question
                key={conditionalQuestion.questionId}
                questionSetId={this.props.questionSetId}
                questionId={conditionalQuestion.questionId}
                question={conditionalQuestion.question}
                text={conditionalQuestion.text}
                postText={conditionalQuestion.postText}
                validateOn={conditionalQuestion.validateOn}
                validations={conditionalQuestion.validations}
                value={answer ? answer.value : undefined}
                input={conditionalQuestion.input}
                classes={this.props.classes}
                renderError={this.props.renderError}
                questionAnswers={this.props.questionAnswers}
                validationErrors={this.props.validationErrors}
                onAnswerChange={this.props.onAnswerChange}
                onQuestionBlur={this.props.onQuestionBlur}
                onFocus={this.props.onFocus}
                onKeyDown={this.props.onKeyDown}
                onPostQuestionComponent={this.props.onPostQuestionComponent}
              />,
            );
          })(),
        );
    }

    // Get the current value. If none is set, then use
    // the default if given.
    const value =
      typeof this.props.value !== 'undefined'
        ? this.props.value
        : typeof this.props.input.default !== 'undefined'
        ? this.props.input.default
        : undefined;
    // Retrieve the validation errors for the
    // current question and map them in to
    // error-message blocks.
    const validationErrors =
      typeof this.props.validationErrors[this.props.questionId] !== 'undefined'
        ? this.props.validationErrors[this.props.questionId].map((error) => {
            return typeof this.props.renderError === 'function' ? (
              this.props.renderError(error, this.props.questionId)
            ) : (
              <div
                key={this.props.questionId + 'Error' + error.type}
                className={this.props.classes.errorMessage}
              >
                {error.message}
              </div>
            );
          })
        : [];

    let labelId = `${this.props.questionId}-label`;
    return (
      <div className={this.props.classes.question}>
        {!!this.props.question ? (
          <label className={this.props.classes.label} id={labelId} htmlFor={this.props.questionId}>
            {this.props.question}
            {typeof this.props.renderRequiredAsterisk !== 'undefined' && this.props.input.required
              ? this.props.renderRequiredAsterisk()
              : undefined}
          </label>
        ) : undefined}
        {!!this.props.text ? (
          <p className={this.props.classes.questionText}>{this.props.text}</p>
        ) : undefined}
        {validationErrors}
        <Input
          name={this.props.questionId}
          id={this.props.questionId}
          labelId={labelId}
          value={value}
          text={this.props.input.text}
          options={this.props.input.options}
          placeholder={this.props.input.placeholder}
          required={this.props.input.required}
          classes={this.props.classes}
          onChange={this.handleInputChange.bind(this, this.props.questionId)}
          onBlur={this.handleInputBlur.bind(this, this.props.questionId)}
          onFocus={this.props.onFocus}
          onKeyDown={this.props.onKeyDown}
          {...(typeof this.props.input.props === 'object' ? this.props.input.props : {})}
        />
        {!!this.props.postText ? (
          <p className={this.props.classes.questionPostText}>{this.props.postText}</p>
        ) : undefined}
        {conditionalItems}
        {this.props.postQuestionComponent && this.props.postQuestionComponent.name ? (
          <PostQuestionComponent
            questionId={this.props.questionId}
            onChange={this.handleInputChange.bind(this, this.props.questionId)}
            {...this.props.postQuestionComponent}
            {...this.props.onPostQuestionComponent}
          />
        ) : undefined}
      </div>
    );
  }
}

Question.defaultProps = {
  questionSetId: undefined,
  questionId: undefined,
  question: '',
  validateOn: 'blur',
  validations: [],
  text: undefined,
  postText: undefined,
  postQuestionComponent: {},
  onPostQuestionComponent: {},
  value: undefined,
  input: {
    default: undefined,
    type: 'textInput',
    limit: undefined,
    placeholder: undefined,
  },
  label: undefined,
  classes: {},
  questionAnswers: {},
  validationErrors: {},
  onAnswerChange: () => {},
  onQuestionBlur: () => {},
  onKeyDown: () => {},
  onFocus: () => {},
  renderError: undefined,
  renderRequiredAsterisk: undefined,
};
