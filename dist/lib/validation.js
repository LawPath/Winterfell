"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.addValidationMethods = exports.addValidationMethod = exports.getQuestionPanelInvalidQuestions = exports.getActiveQuestionsFromQuestionSets = exports.getActiveQuestions = exports.validateAnswer = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _validator = _interopRequireDefault(require("validator"));

var _stringParser = _interopRequireDefault(require("./stringParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var extraValidators = {
  /*
   * isAccepted Validation Mehod
   */
  isAccepted: function isAccepted(value, expected) {
    return value == expected;
  },

  /*
   * isAllIn Validation Method
   */
  isAllIn: function isAllIn(value, options) {
    if (!value) {
      return false;
    }

    return _lodash["default"].every(value, function (item) {
      return options.indexOf(item) > -1;
    });
  }
};
/**
 * Validate a value against a validation item
 *
 * @param  any     value          Value being tested
 * @param  object  validationItem Rule set for validator
 * @return boolean                Valid?
 */

var validateAnswer = function validateAnswer(value, validationItem, questionAnswers) {
  var validationMethod = typeof extraValidators[validationItem.type] !== 'undefined' ? extraValidators[validationItem.type] : _validator["default"].hasOwnProperty(validationItem.type) && typeof _validator["default"][validationItem.type] === 'function' ? _validator["default"][validationItem.type] : undefined;

  if (!validationMethod) {
    throw new Error('Winterfell: Attempted to validate for undefined method "' + validationItem.type + '"');
  }
  /*
   * Clone the validation parameters so it doesn't effect the
   * parameters elsewhere by reference.
   */


  var validationParameters = (validationItem.params || []).slice(0);
  /*
   * Run the parameters through the stringParser with the
   * questionAnswers so that it sets the questionAnswer
   * as the parameter.
   */

  validationParameters = validationParameters.map(function (p) {
    return typeof p === 'string' ? (0, _stringParser["default"])(p, questionAnswers) : p;
  });
  /*
   * Push the value of the question we're validating to
   * the first parameter of the validationParameters
   */

  validationParameters.unshift(value);
  /*
   * Return the result of the validation method running
   * wtih the validationParameters.
   */

  return validationMethod.apply(null, validationParameters);
};
/**
 * Get active questions from an array of questions,
 * recursively. Follows active conditions.
 *
 * @param  array  questions       Questions to run through
 * @param  object questionAnswers Current answers for questions
 * @param  array  activeQuestions
 * @return array                  All active questions
 */


exports.validateAnswer = validateAnswer;

var getActiveQuestions = function getActiveQuestions(questions, questionAnswers, activeQuestions) {
  activeQuestions = activeQuestions || [];
  questions.forEach(function (question) {
    activeQuestions.push({
      questionId: question.questionId,
      validations: question.validations
    });

    if (typeof question.input.options === 'undefined' || question.input.options.length === 0) {
      return;
    }

    question.input.options.forEach(function (option) {
      var answer = questionAnswers[question.questionId];
      if (!answer) return;

      if (typeof option.conditionalQuestions === 'undefined' || option.conditionalQuestions.length == 0 || answer.value != option.value) {
        return;
      }

      activeQuestions = getActiveQuestions(option.conditionalQuestions, questionAnswers, activeQuestions);
    });
  });
  return activeQuestions;
};
/**
 * Get active questions from multiple question sets
 *
 * @param  array  questionSets    All question sets
 * @param  object questionAnswers Current answers for questions
 * @return array                  All active questions
 */


exports.getActiveQuestions = getActiveQuestions;

var getActiveQuestionsFromQuestionSets = function getActiveQuestionsFromQuestionSets(questionSets, questionAnswers) {
  var questionsToCheck = [];
  questionSets.forEach(function (questionSet) {
    return Array.prototype.push.apply(questionsToCheck, getActiveQuestions(questionSet.questions, questionAnswers));
  });
  return questionsToCheck;
};
/**
 * Get all invalid questions from question sets
 *
 * @param  array  questionSets     All question sets
 * @param  object questionAnswers  Current answers for questions
 * @return object                  Set of questions and their invalidations
 */


exports.getActiveQuestionsFromQuestionSets = getActiveQuestionsFromQuestionSets;

var getQuestionPanelInvalidQuestions = function getQuestionPanelInvalidQuestions(questionSets, questionAnswers) {
  var questionsToCheck = getActiveQuestionsFromQuestionSets(questionSets, questionAnswers).filter(function (question) {
    return question.validations instanceof Array && question.validations.length > 0;
  });
  /*
   * Now we run validations for the questions
   * we need to check for errors.
   *
   * Go through every question, and its validations
   * then run the question and answer through
   * the validation method required.
   */

  var errors = {};
  questionsToCheck.forEach(function (_ref) {
    var questionId = _ref.questionId,
        validations = _ref.validations;
    return [].forEach.bind(validations, function (validation) {
      var valid = validateAnswer(questionAnswers[questionId], validation, questionAnswers);

      if (valid) {
        return;
      }
      /*
       * If we got here, the validation failed. Add
       * an validation error and continue to the next!
       */


      if (typeof errors[questionId] === 'undefined') {
        errors[questionId] = [];
      }

      errors[questionId].push(validation);
    })();
  });
  return errors;
};
/**
 * Add a single validation method
 *
 * @param  string   name   Name of validation method
 * @param  function method Validation method
 */


exports.getQuestionPanelInvalidQuestions = getQuestionPanelInvalidQuestions;

var addValidationMethod = function addValidationMethod(name, method) {
  if (typeof name !== 'string') {
    throw new Error('Winterfell: First parameter of addValidationMethod ' + 'must be of type string');
  }

  if (typeof method !== 'function') {
    throw new Error('Winterfell: Second parameter of addValidationMethod ' + 'must be of type function');
  }

  extraValidators[name] = method;
};
/**
 * Add multiple validation methods
 *
 * @param  array methods Methods to add. name => func
 */


exports.addValidationMethod = addValidationMethod;

var addValidationMethods = function addValidationMethods(methods) {
  if (_typeof(methods) !== 'object') {
    throw new Error('Winterfell: First parameter of addValidationMethods ' + 'must be of type object');
  }

  for (var methodName in methods) {
    addValidationMethod(methodName, methods[methodName]);
  }
};

exports.addValidationMethods = addValidationMethods;
var _default = {
  addValidationMethods: addValidationMethods,
  addValidationMethod: addValidationMethod,
  getQuestionPanelInvalidQuestions: getQuestionPanelInvalidQuestions,
  getActiveQuestionsFromQuestionSets: getActiveQuestionsFromQuestionSets,
  getActiveQuestions: getActiveQuestions,
  validateAnswer: validateAnswer
};
exports["default"] = _default;