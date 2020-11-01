"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _tooltip = _interopRequireDefault(require("../custom/tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var IconInput = function IconInput(_ref) {
  var children = _ref.children,
      active = _ref.active,
      onClick = _ref.onClick,
      tooltipContent = _ref.tooltipContent;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "input-group"
  }, children, active ? /*#__PURE__*/_react["default"].createElement("div", {
    "class": "input-group-append"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    "class": "input-group-text"
  }, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
    onClick: onClick,
    content: tooltipContent
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "prefill-icon"
  })))) : null);
};

var _default = IconInput;
exports["default"] = _default;