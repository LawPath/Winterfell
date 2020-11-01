"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupAnswersByLabel = exports.getPrefillData = exports.syncAnswerQuestionsToLabledAnswers = void 0;

var syncAnswerQuestionsToLabledAnswers = function syncAnswerQuestionsToLabledAnswers(questionAnswers, labeledAnswsers) {
  var newQuestionAnswers = questionAnswers;

  _.forEach(newQuestionAnswers, function (value, key) {
    if (value && value.label) {
      var foundLabeledAnswers = _.find(labeledAnswsers, {
        id: value.label
      });

      if (foundLabeledAnswers) {
        var firstLabeledAnswer = _.find(foundLabeledAnswers.answers, {
          id: key
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

exports.syncAnswerQuestionsToLabledAnswers = syncAnswerQuestionsToLabledAnswers;

var getPrefillData = function getPrefillData(labeledAnswsers, label) {
  var foundLabeledAnswers = _.find(labeledAnswsers, {
    id: label
  });

  if (foundLabeledAnswers) {
    return foundLabeledAnswers.defaultValue;
  }

  return null;
};

exports.getPrefillData = getPrefillData;

var groupAnswersByLabel = function groupAnswersByLabel(questionAnswers) {
  var category = {};

  _.forEach(questionAnswers, function (value, key) {
    if (value && value.label && value.value && value.value !== '') {
      if (category[value.label]) {
        /* Group answers have same label */
        category[value.label].push({
          value: _.isObject(value.value) ? JSON.stringify(value.value) : value.value,
          id: key
        });
      } else {
        category[value.label] = [{
          value: _.isObject(value.value) ? JSON.stringify(value.value) : value.value,
          id: key
        }];
      }
    }
  });

  return category;
};

exports.groupAnswersByLabel = groupAnswersByLabel;