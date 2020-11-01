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
      _ref2$placement = _ref2.placement,
      placement = _ref2$placement === void 0 ? 'bottom' : _ref2$placement,
      children = _ref2.children;
  return /*#__PURE__*/_react["default"].createElement(_reactSimpleTooltip["default"], {
    content: tooltipContent({
      content: content
    }),
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