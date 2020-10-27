"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var SuggestionItem = function SuggestionItem(_ref) {
  var data = _ref.data,
      _onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("span", {
    onClick: function onClick() {
      return _onClick(data);
    },
    className: "suggestion-item"
  }, data.id);
};

var Suggestions = function Suggestions(_ref2) {
  var onAnswerChange = _ref2.onAnswerChange,
      questionId = _ref2.questionId,
      questionLabel = _ref2.questionLabel,
      postText = _ref2.postText,
      suggestions = _ref2.suggestions,
      defaultSuggestions = _ref2.defaultSuggestions;

  var handleOnChangeAnsewer = function handleOnChangeAnsewer(answer) {
    onAnswerChange(questionId, answer.text, questionLabel);
  };

  return /*#__PURE__*/_react["default"].createElement("div", null, suggestions ? /*#__PURE__*/_react["default"].createElement("div", null, suggestions.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(SuggestionItem, {
      onClick: handleOnChangeAnsewer,
      data: item
    });
  })) : postText ? /*#__PURE__*/_react["default"].createElement("div", null, postText) : /*#__PURE__*/_react["default"].createElement("div", {
    dangerouslySetInnerHTML: {
      __html: defaultSuggestions[getRandomInt(defaultSuggestions.length)].content
    }
  }));
};

var SuggestionSet = function SuggestionSet(_ref3) {
  var questions = _ref3.questions,
      suggestionPanel = _ref3.suggestionPanel,
      onAnswerChange = _ref3.onAnswerChange,
      defaultSuggestions = _ref3.defaultSuggestions;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: suggestionPanel.classes.panel
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "class": suggestionPanel.classes.body
  }, questions.map(function (question) {
    return /*#__PURE__*/_react["default"].createElement(Suggestions, _extends({
      onAnswerChange: onAnswerChange
    }, question, {
      defaultSuggestions: defaultSuggestions
    }));
  })));
};

var _default = SuggestionSet;
exports["default"] = _default;