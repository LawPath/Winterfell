"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _inputFormGroup = _interopRequireDefault(require("../formGroups/inputFormGroup"));

var _useFocus3 = _interopRequireDefault(require("../lib/hooks/useFocus"));

var _TextInput$defaultPro;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TextInput = function TextInput(_ref) {
  var name = _ref.name,
      id = _ref.id,
      value = _ref.value,
      required = _ref.required,
      classes = _ref.classes,
      placeholder = _ref.placeholder,
      labelId = _ref.labelId,
      onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      _onBlur = _ref.onBlur,
      onKeyDown = _ref.onKeyDown,
      onClickInputIcon = _ref.onClickInputIcon,
      enablePrefilledAnswer = _ref.enablePrefilledAnswer,
      inputIconTooltipContent = _ref.inputIconTooltipContent,
      prefilledData = _ref.prefilledData,
      questionLabel = _ref.questionLabel;

  var _useState = (0, _react.useState)(value),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useFocus = (0, _useFocus3["default"])(),
      _useFocus2 = _slicedToArray(_useFocus, 2),
      inputRef = _useFocus2[0],
      setInputFocus = _useFocus2[1];

  (0, _react.useEffect)(function () {
    setInputFocus();
    setInputValue(value);

    if (enablePrefilledAnswer) {
      _onFocus(id);
    }
  }, [value, enablePrefilledAnswer]);

  var handleChange = function handleChange(e) {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return /*#__PURE__*/_react["default"].createElement(_inputFormGroup["default"], {
    active: enablePrefilledAnswer,
    showIcon: enablePrefilledAnswer || !prefilledData && questionLabel,
    onClick: onClickInputIcon,
    tooltipContent: inputIconTooltipContent
  }, /*#__PURE__*/_react["default"].createElement("input", {
    ref: inputRef,
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
      return _onBlur(value);
    },
    onKeyDown: onKeyDown,
    "data-prefiled-data": enablePrefilledAnswer
  }));
};

TextInput.defaultProps = (_TextInput$defaultPro = {
  classes: {},
  name: '',
  id: '',
  value: '',
  placeholder: '',
  enablePrefilledAnswer: true,
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  onKeyDown: function onKeyDown() {},
  onFocus: function onFocus() {}
}, _defineProperty(_TextInput$defaultPro, "onFocus", function onFocus() {}), _defineProperty(_TextInput$defaultPro, "onClickInputIcon", function onClickInputIcon() {}), _TextInput$defaultPro);
var _default = TextInput;
exports["default"] = _default;