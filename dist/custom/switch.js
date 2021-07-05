"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchWithTooltip = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSwitch = _interopRequireDefault(require("react-switch"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _tooltip = _interopRequireDefault(require("./tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-size: 11px;\n  display: inline-block;\n  padding: 0 5px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ToggleText = _styledComponents["default"].div.attrs({
  'data-id': 'toggle-button-text'
})(_templateObject());

var UnavailablePrefillMessage = function UnavailablePrefillMessage() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "This field cannot be pre-", /*#__PURE__*/_react["default"].createElement("br", null), "filled.");
};

var PrefillOnMessage = function PrefillOnMessage() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "Pre-fill information has ", /*#__PURE__*/_react["default"].createElement("br", null), " been used. Toggle off to ", /*#__PURE__*/_react["default"].createElement("br", null), " remove.");
};

var PrefillOffMessage = function PrefillOffMessage() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "Pre-fill information is ", /*#__PURE__*/_react["default"].createElement("br", null), " available. Toggle on to use.");
};

var OffButton = function OffButton() {
  return /*#__PURE__*/_react["default"].createElement(ToggleText, null, " OFF ");
};

var OnButton = function OnButton() {
  return /*#__PURE__*/_react["default"].createElement(ToggleText, null, " ON ");
};

var switchConfig = {
  onColor: '#00C08B',
  offColor: '#D2D8DF',
  offHandleColor: '#FFF',
  onHandleColor: '#FFF',
  activeBoxShadow: '0px 1px 3px #00000036',
  boxShadow: '0px 1px 3px #00000036',
  height: 20,
  width: 45,
  fontSize: 11
};

var SwitchWithTooltip = function SwitchWithTooltip(props) {
  var active = props.active,
      disabled = props.disabled,
      inputDisableTooltipMessage = props.disableTooltipMessage,
      inputOnTooltipMessage = props.onTooltipMessage,
      inputOffTooltipMessage = props.offTooltipMessage,
      _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? function () {} : _props$onChange;

  var _useState = (0, _react.useState)(active),
      _useState2 = _slicedToArray(_useState, 2),
      checked = _useState2[0],
      setChecked = _useState2[1];

  var disableTooltipMessage = inputDisableTooltipMessage !== null && inputDisableTooltipMessage !== void 0 ? inputDisableTooltipMessage : UnavailablePrefillMessage;
  var onTooltipMessage = inputOnTooltipMessage !== null && inputOnTooltipMessage !== void 0 ? inputOnTooltipMessage : PrefillOnMessage;
  var offTooltipMessage = inputOffTooltipMessage !== null && inputOffTooltipMessage !== void 0 ? inputOffTooltipMessage : PrefillOffMessage;
  (0, _react.useEffect)(function () {
    return setChecked(active);
  }, [active]);

  var handleChange = function handleChange() {
    onChange(!checked);
    setChecked(!checked);
  };

  var isActiveClass = disabled ? 'switch-control-disabled' : checked ? 'switch-control-active' : 'switch-control-inactive';
  return /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
    content: disabled ? disableTooltipMessage : checked ? onTooltipMessage : offTooltipMessage,
    arrowStyle: "right: 20px;",
    placement: "top"
  }, /*#__PURE__*/_react["default"].createElement(_reactSwitch["default"], _extends({}, switchConfig, {
    className: "switch-control ".concat(isActiveClass),
    uncheckedIcon: /*#__PURE__*/_react["default"].createElement(OffButton, null),
    checkedIcon: /*#__PURE__*/_react["default"].createElement(OnButton, null),
    checked: checked,
    onChange: handleChange,
    disabled: disabled
  })));
};

exports.SwitchWithTooltip = SwitchWithTooltip;