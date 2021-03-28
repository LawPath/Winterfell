import React, { Component } from 'react';
import _ from 'lodash';

import Question from './question';

export default class QuestionSet extends Component {
  render() {
    const questions = this.props.questions.map((question) => {
      const answer = this.props.questionAnswers[question.questionId];
      return (
        <Question
          key={question.questionId}
          questionSetId={this.props.id}
          questionId={question.questionId}
          question={question.question}
          validateOn={question.validateOn}
          validations={question.validations}
          text={question.text}
          postText={question.postText}
          label={question.label}
          suggestions={question.suggestions}
          value={answer ? answer.value : undefined}
          prefilledData={answer ? answer.prefilledData : undefined}
          enablePrefilledAnswer={answer ? answer.enablePrefilledAnswer : undefined}
          input={question.input}
          classes={this.props.classes}
          renderError={this.props.renderError}
          renderRequiredAsterisk={this.props.renderRequiredAsterisk}
          questionAnswers={this.props.questionAnswers}
          labeledAnswers={this.props.labeledAnswers}
          panelConstants={this.props.panelConstants}
          validationErrors={this.props.validationErrors}
          onAnswerChange={this.props.onAnswerChange}
          onQuestionBlur={this.props.onQuestionBlur}
          onFocus={this.props.onFocus}
          onKeyDown={this.props.onKeyDown}
          onClickInputIcon={this.props.onClickInputIcon}
          onMounted={this.props.onQuestionMounted}
        />
      );
    });

    return (
      <div className={this.props.classes.questionSet}>
        {typeof this.props.questionSetHeader !== 'undefined' ||
        typeof this.props.questionSetText !== 'undefined' ? (
          <div className={this.props.classes.questionSetHeaderContainer}>
            {typeof this.props.questionSetHeader !== 'undefined' ? (
              <h4 className={this.props.classes.questionSetHeader}>
                {this.props.questionSetHeader}
              </h4>
            ) : undefined}
            {typeof this.props.questionSetText !== 'undefined' ? (
              <p className={this.props.classes.questionSetText}>{this.props.questionSetText}</p>
            ) : undefined}
          </div>
        ) : undefined}
        {questions}
      </div>
    );
  }
}

QuestionSet.defaultProps = {
  id: undefined,
  name: '',
  questionSetHeader: undefined,
  questionSetText: undefined,
  questions: [],
  questionAnswers: {},
  classes: {},
  validationErrors: {},
  renderError: undefined,
  renderRequiredAsterisk: undefined,
  panelConstants: undefined,
  labeledAnswers: [],
  onAnswerChange: () => {},
  onQuestionBlur: () => {},
  onKeyDown: () => {},
  onFocus: () => {},
  onClickInputIcon: () => {},
  onSwitchQuestion: () => {},
};
