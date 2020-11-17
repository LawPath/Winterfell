"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSwitch = _interopRequireDefault(require("react-switch"));

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

var InavailablePrefill = function InavailablePrefill() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "This field cannot be pre-", /*#__PURE__*/_react["default"].createElement("br", null), "filled.");
};

var DisabledPrefill = function DisabledPrefill() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "Pre-fill information has ", /*#__PURE__*/_react["default"].createElement("br", null), " been used. Toggle off to ", /*#__PURE__*/_react["default"].createElement("br", null), " remove.");
};

var EnabledPrefill = function EnabledPrefill() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "Pre-fill information is ", /*#__PURE__*/_react["default"].createElement("br", null), " available. Toggle on to use.");
};

var OffButton = function OffButton() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "switch-btn"
  }, "OFF");
};

var OnButton = function OnButton() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "switch-btn"
  }, "ON");
};

var switchConfig = {
  onColor: '#00C08B',
  offColor: '#D2D8DF',
  offHandleColor: '#FFF',
  onHandleColor: '#FFF',
  activeBoxShadow: '0px 1px 3px #00000036',
  boxShadow: '0px 1px 3px #00000036',
  height: 20,
  width: 45
};

var Switch = function Switch(_ref) {
  var active = _ref.active,
      onChange = _ref.onChange,
      disabled = _ref.disabled;

  var _useState = (0, _react.useState)(active),
      _useState2 = _slicedToArray(_useState, 2),
      checked = _useState2[0],
      setChecked = _useState2[1];

  (0, _react.useEffect)(function () {
    return setChecked(active);
  }, [active]);

  var handleChange = function handleChange() {
    onChange(!checked);
    setChecked(!checked);
  };

  return /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
    content: disabled ? InavailablePrefill : checked ? DisabledPrefill : EnabledPrefill,
    placement: "top"
  }, /*#__PURE__*/_react["default"].createElement(_reactSwitch["default"], _extends({}, switchConfig, {
    className: "switch-control ".concat(disabled ? 'switch-control-disabled' : checked ? 'switch-control-active' : 'switch-control-inactive'),
    uncheckedIcon: /*#__PURE__*/_react["default"].createElement(OffButton, null),
    checkedIcon: /*#__PURE__*/_react["default"].createElement(OnButton, null),
    checked: checked,
    onChange: handleChange,
    disabled: disabled
  })));
};

var _default = Switch;
exports["default"] = _default;