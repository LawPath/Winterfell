"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _checkboxInput = _interopRequireDefault(require("./checkboxInput"));

var _checkboxOptionsInput = _interopRequireDefault(require("./checkboxOptionsInput"));

var _emailInput = _interopRequireDefault(require("./emailInput"));

var _fileInput = _interopRequireDefault(require("./fileInput"));

var _hiddenInput = _interopRequireDefault(require("./hiddenInput"));

var _passwordInput = _interopRequireDefault(require("./passwordInput"));

var _radioOptionsInput = _interopRequireDefault(require("./radioOptionsInput"));

var _selectInput = _interopRequireDefault(require("./selectInput"));

var _textareaInput = _interopRequireDefault(require("./textareaInput"));

var _textInput = _interopRequireDefault(require("./textInput"));

var _addressInput = _interopRequireDefault(require("./addressInput"));

var _dateInput = _interopRequireDefault(require("./dateInput"));

var _signatureInput = _interopRequireDefault(require("./signatureInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var inputTypes = {
  checkboxInput: _checkboxInput["default"],
  checkboxOptionsInput: _checkboxOptionsInput["default"],
  emailInput: _emailInput["default"],
  fileInput: _fileInput["default"],
  hiddenInput: _hiddenInput["default"],
  passwordInput: _passwordInput["default"],
  radioOptionsInput: _radioOptionsInput["default"],
  selectInput: _selectInput["default"],
  textareaInput: _textareaInput["default"],
  textInput: _textInput["default"],
  addressInput: _addressInput["default"],
  dateInput: _dateInput["default"],
  signatureInput: _signatureInput["default"]
};
/**
 * Add an input type
 *
 * @param  type      name     Name of InputType
 * @param  Component instance Input Type Component
 */

inputTypes.addInputType = function (name, instance) {
  if (typeof name !== 'string') {
    throw new Error('Winterfell: First parameter of addInputType ' + 'must be of type string');
  }

  if (!_react["default"].Component instanceof instance.constructor) {
    throw new Error('Winterfell: Cannot not assign "' + name + '" as an inputType. ' + 'Second paramter expects a React component');
  }

  inputTypes[name] = instance;
};
/**
 * Add multiple InputTypes
 *
 * @param  object types InputTypes to add. string => Component
 */


inputTypes.addInputTypes = function (types) {
  if (_typeof(types) !== 'object') {
    throw new Error('Winterfell: First parameter of addInputTypes ' + 'must be of type object');
  }

  for (var type in types) {
    inputTypes.addInputType(type, types[type]);
  }
};

var _default = inputTypes;
exports["default"] = _default;