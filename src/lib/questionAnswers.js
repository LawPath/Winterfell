import _ from 'lodash';

export const syncAnswerQuestionsToLabledAnswers = (questionAnswers, labeledAnswers) => {
  const newQuestionAnswers = questionAnswers;
  _.forEach(newQuestionAnswers, (value, key) => {
    if (value && value.label) {
      const foundLabeledAnswers = _.find(labeledAnswers, {
        id: value.label,
      });
      if (foundLabeledAnswers) {
        const firstLabeledAnswer = _.find(foundLabeledAnswers.answers, {
          id: key,
        });
        if (firstLabeledAnswer) {
          newQuestionAnswers[key].prefilledData = firstLabeledAnswer.value;
          newQuestionAnswers[key].enablePrefilledAnswer = true;
        }
      }
    }
  });
  return newQuestionAnswers;
};

export const getPrefillData = (labeledAnswers, label) => {
  const foundLabeledAnswer = _.find(labeledAnswers, {
    id: label,
  });
  if (foundLabeledAnswer) {
    return foundLabeledAnswer.defaultValue;
  }
  return null;
};

export const groupAnswersByLabel = (questionAnswers) => {
  const category = {};
  _.forEach(questionAnswers, (value, key) => {
    if (value && value.label && value.value && value.value !== '') {
      if (category[value.label]) {
        /* Group answers have same label */
        category[value.label].push({
          value: _.isObject(value.value) ? JSON.stringify(value.value) : value.value,
          id: key,
        });
      } else {
        category[value.label] = [
          {
            value: _.isObject(value.value) ? JSON.stringify(value.value) : value.value,
            id: key,
          },
        ];
      }
    }
  });

  return category;
};

export const addAnswersToLabledAnswers = (labeledAnswsers, questionAnswers) => {
  const groupedLabels = groupAnswersByLabel(questionAnswers);
  const data = Array.from(labeledAnswsers);
  const updatedAnswersGroupedLabels = _.chain(data).merge(groupedLabels).value();
  const temporaryData = Array.from(
    updatedAnswersGroupedLabels.map((label) => {
      if (
        label &&
        label.answers &&
        label.answers.length > 0 &&
        (!label.defaultValue || (label.defaultValue && label.defaultValue.value))
      ) {
        const newLabel = label;
        newLabel.defaultValue = label.answers[0].value;
        return newLabel;
      }

      return label;
    }),
  );
};
