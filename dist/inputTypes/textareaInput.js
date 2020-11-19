"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _tooltip = _interopRequireDefault(require("../custom/tooltip"));

var _icon = require("../custom/icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.375rem 0.75rem;\n  border-left: none;\n  cursor: pointer;\n  background-color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  min-height: 60px;\n  border: 1px solid #7a8aa0;\n\n  textarea {\n    resize: vertical;\n    padding-right: 45px;\n    min-height: 60px;\n    max-height: 120px;\n    border: none !important;\n    background-color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TextareaWrapper = _styledComponents["default"].div.attrs({
  'data-id': 'textarea-wrapper'
})(_templateObject(), function (_ref) {
  var isActive = _ref.isActive;
  return isActive ? '#e7f2f9' : 'inherit';
});

var InputGroupIcon = _styledComponents["default"].div.attrs({
  'data-id': 'input-group-icon'
})(_templateObject2(), function (_ref2) {
  var active = _ref2.active;
  return active ? '#e7f2f9' : 'inherit';
});

var TextareaInput = function TextareaInput(_ref3) {
  var name = _ref3.name,
      id = _ref3.id,
      value = _ref3.value,
      labelId = _ref3.labelId,
      classes = _ref3.classes,
      placeholder = _ref3.placeholder,
      required = _ref3.required,
      onChange = _ref3.onChange,
      _onFocus = _ref3.onFocus,
      _onBlur = _ref3.onBlur,
      onClickInputIcon = _ref3.onClickInputIcon,
      enablePrefilledAnswer = _ref3.enablePrefilledAnswer,
      questionLabel = _ref3.questionLabel,
      prefilledData = _ref3.prefilledData;

  var _useState = (0, _react.useState)(value),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  (0, _react.useEffect)(function () {
    setInputValue(value);

    if (enablePrefilledAnswer) {
      _onFocus(id);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value, enablePrefilledAnswer]);

  var handleChange = function handleChange(e) {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return /*#__PURE__*/_react["default"].createElement(TextareaWrapper, {
    isActive: enablePrefilledAnswer
  }, /*#__PURE__*/_react["default"].createElement("textarea", {
    type: "text",
    name: name,
    id: id,
    "aria-labelledby": labelId,
    className: classes.input,
    placeholder: placeholder,
    value: inputValue,
    required: required ? 'required' : undefined,
    onChange: handleChange,
    onFocus: function onFocus() {
      return _onFocus(id);
    },
    onBlur: function onBlur() {
      return _onBlur(inputValue);
    }
  }), enablePrefilledAnswer || !enablePrefilledAnswer && questionLabel && !prefilledData ? /*#__PURE__*/_react["default"].createElement(InputGroupIcon, {
    active: enablePrefilledAnswer
  }, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], null, /*#__PURE__*/_react["default"].createElement(_icon.Icon, {
    showingPointer: true,
    onClick: onClickInputIcon
  }))) : null);
};

TextareaInput.propTypes = {
  classes: _propTypes["default"].object,
  name: _propTypes["default"].string,
  id: _propTypes["default"].string,
  value: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  onFocus: _propTypes["default"].func
};
TextareaInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: '',
  placeholder: '',
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  onFocus: function onFocus() {}
};
var _default = TextareaInput;
exports["default"] = _default;