"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSimpleTooltip = _interopRequireDefault(require("react-simple-tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DefaultTooltipContent = function DefaultTooltipContent() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "This field has been ", /*#__PURE__*/_react["default"].createElement("br", null), "pre-filled. Click ", /*#__PURE__*/_react["default"].createElement("a", null, "here"), " to edit ", /*#__PURE__*/_react["default"].createElement("br", null), " your pre-filled information");
};

var Tooltip = function Tooltip(_ref) {
  var TooltipContent = _ref.content,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottom' : _ref$placement,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_reactSimpleTooltip["default"], {
    content: TooltipContent ? /*#__PURE__*/_react["default"].createElement(TooltipContent, null) : /*#__PURE__*/_react["default"].createElement(DefaultTooltipContent, null),
    placement: placement,
    color: "#000",
    padding: 10,
    fontSize: "12px",
    border: "#FFEABC",
    radius: 3,
    background: "#FFEABC",
    style: {
      whiteSpace: 'nowrap',
      textAlign: 'center'
    }
  }, children);
};

var _default = Tooltip;
exports["default"] = _default;