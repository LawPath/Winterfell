"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAnswersToLabledAnswers = exports.groupAnswersByLabel = exports.getPrefillData = exports.syncAnswerQuestionsToLabledAnswers = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var syncAnswerQuestionsToLabledAnswers = function syncAnswerQuestionsToLabledAnswers(questionAnswers, labeledAnswers) {
  var newQuestionAnswers = questionAnswers;

  _lodash["default"].forEach(newQuestionAnswers, function (value, key) {
    if (value && value.label) {
      var foundLabeledAnswers = _lodash["default"].find(labeledAnswers, {
        id: value.label
      });

      if (foundLabeledAnswers) {
        var firstLabeledAnswer = _lodash["default"].find(foundLabeledAnswers.answers, {
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

var getPrefillData = function getPrefillData(labeledAnswers, label) {
  var foundLabeledAnswer = _lodash["default"].find(labeledAnswers, {
    id: label
  });

  if (foundLabeledAnswer) {
    return foundLabeledAnswer.defaultValue;
  }

  return null;
};

exports.getPrefillData = getPrefillData;

var groupAnswersByLabel = function groupAnswersByLabel(questionAnswers) {
  var category = {};

  _lodash["default"].forEach(questionAnswers, function (value, key) {
    if (value && value.label && value.value && value.value !== '') {
      if (category[value.label]) {
        /* Group answers have same label */
        category[value.label].push({
          value: _lodash["default"].isObject(value.value) ? JSON.stringify(value.value) : value.value,
          id: key
        });
      } else {
        category[value.label] = [{
          value: _lodash["default"].isObject(value.value) ? JSON.stringify(value.value) : value.value,
          id: key
        }];
      }
    }
  });

  return category;
};

exports.groupAnswersByLabel = groupAnswersByLabel;

var addAnswersToLabledAnswers = function addAnswersToLabledAnswers(labeledAnswsers, questionAnswers) {
  var groupedLabels = groupAnswersByLabel(questionAnswers);
  var data = Array.from(labeledAnswsers);

  var updatedAnswersGroupedLabels = _lodash["default"].chain(data).merge(groupedLabels).value();

  var temporaryData = Array.from(updatedAnswersGroupedLabels.map(function (label) {
    if (label && label.answers && label.answers.length > 0 && (!label.defaultValue || label.defaultValue && label.defaultValue.value)) {
      var newLabel = label;
      newLabel.defaultValue = label.answers[0].value;
      return newLabel;
    }

    return label;
  }));
};

exports.addAnswersToLabledAnswers = addAnswersToLabledAnswers;