"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: flex;\n  height: 30px;\n  font-size: 13px;\n  line-height: 30px;\n  overflow: hidden;\n  font-weight: bold;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background: #f6f7f9;\n  color: #000;\n  clip-path: inset(0 0 0 ", "%);\n  transition: clip-path 1s ease-in-out;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  background: #0075bf;\n  color: #f6f7f9;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Background = _styledComponents["default"].div.attrs({
  'data-id': 'progress-bar-background'
})(_templateObject());

var Foreground = _styledComponents["default"].div.attrs({
  'data-id': 'progress-bar-foreground'
})(_templateObject2(), function (_ref) {
  var progress = _ref.progress;
  return progress;
});

var ProgressBarWrapper = _styledComponents["default"].div.attrs({
  'data-id': 'progress-bar'
})(_templateObject3());

var ProgressBar = function ProgressBar(_ref2) {
  var progress = _ref2.progress,
      text = _ref2.text;
  return /*#__PURE__*/_react["default"].createElement(ProgressBarWrapper, null, /*#__PURE__*/_react["default"].createElement(Background, null, text), /*#__PURE__*/_react["default"].createElement(Foreground, {
    progress: progress
  }, text));
};

var _default = ProgressBar;
exports["default"] = _default;