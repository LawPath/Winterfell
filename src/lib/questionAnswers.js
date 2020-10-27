export const syncAnswerQuestionsToLabledAnswers = (questionAnswers, labeledAnswsers) => {
  const newQuestionAnswers = questionAnswers;
  _.forEach(newQuestionAnswers, (value, key) => {
    if (value && value.label) {
      const foundLabeledAnswers = _.find(labeledAnswsers, {
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

export const getPrefillData = (labeledAnswsers, label) => {
  const foundLabeledAnswers = _.find(labeledAnswsers, {
    id: label,
  });
  if (foundLabeledAnswers) {
    return firstLabeledAnswer.defaultValue;
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
