"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSimpleTooltip = _interopRequireDefault(require("react-simple-tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tooltipContent = function tooltipContent(_ref) {
  var content = _ref.content;
  return /*#__PURE__*/_react["default"].createElement("span", {
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};

var Tooltip = function Tooltip(_ref2) {
  var content = _ref2.content,
      icon = _ref2.icon,
      onClick = _ref2.onClick;
  return /*#__PURE__*/_react["default"].createElement(_reactSimpleTooltip["default"], {
    content: tooltipContent({
      content: content
    }),
    placement: "bottom",
    color: "#000",
    padding: 10,
    fontSize: "12px",
    border: "#FFEABC",
    radius: 3,
    background: "#FFEABC"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    onClick: onClick,
    src: icon
  }));
};

var _default = Tooltip;
exports["default"] = _default;