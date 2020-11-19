"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSimpleTooltip = _interopRequireDefault(require("react-simple-tooltip"));

var _styledComponents = require("styled-components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        div[class$='BaseToolTop'] {\n          left: unset;\n          right: 50%;\n          transform: translateX(5%);\n        }\n        div[class$='BaseArrow'] {\n          right: 0;\n          left: unset;\n        }\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DefaultTooltipContent = function DefaultTooltipContent() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "This field has been ", /*#__PURE__*/_react["default"].createElement("br", null), "pre-filled. Click ", /*#__PURE__*/_react["default"].createElement("a", null, "here"), " to edit ", /*#__PURE__*/_react["default"].createElement("br", null), " your pre-filled information");
};

var Tooltip = function Tooltip(_ref) {
  var _ref$content = _ref.content,
      TooltipContent = _ref$content === void 0 ? DefaultTooltipContent : _ref$content,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottom' : _ref$placement,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_reactSimpleTooltip["default"], {
    content: typeof TooltipContent === 'string' ? TooltipContent : /*#__PURE__*/_react["default"].createElement(TooltipContent, null),
    placement: placement,
    color: "#000",
    padding: 10,
    fontSize: "12px",
    border: "#FFEABC",
    radius: 3,
    background: "#FFEABC",
    customCss: (0, _styledComponents.css)(_templateObject()),
    style: {
      whiteSpace: 'nowrap',
      textAlign: 'center'
    }
  }, children);
};

var _default = Tooltip;
exports["default"] = _default;