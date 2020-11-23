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
  var data = _taggedTemplateLiteral(["\n        /*Class selector does not work on production. Using position selector to query */\n        > :nth-child(2) {\n          left: unset;\n          right: 0;\n          transform: translateX(5%);\n\n          > :first-child > :first-child {\n            left: unset;\n            ", "\n          }\n        }\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DefaultTooltipContent = function DefaultTooltipContent() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "This field has been ", /*#__PURE__*/_react["default"].createElement("br", null), "pre-filled. Click ", /*#__PURE__*/_react["default"].createElement("a", null, "here"), " to edit ", /*#__PURE__*/_react["default"].createElement("br", null), " your pre-filled information");
};

var arrowDefaultStyle = "\n    right: 10px;\n";

var Tooltip = function Tooltip(_ref) {
  var _ref$content = _ref.content,
      TooltipContent = _ref$content === void 0 ? DefaultTooltipContent : _ref$content,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottom' : _ref$placement,
      children = _ref.children,
      _ref$arrowStyle = _ref.arrowStyle,
      arrowStyle = _ref$arrowStyle === void 0 ? arrowDefaultStyle : _ref$arrowStyle;
  return /*#__PURE__*/_react["default"].createElement(_reactSimpleTooltip["default"], {
    content: typeof TooltipContent === 'string' ? TooltipContent : /*#__PURE__*/_react["default"].createElement(TooltipContent, null),
    placement: placement,
    color: "#000",
    padding: 10,
    fontSize: "12px",
    border: "#FFEABC",
    radius: 3,
    background: "#FFEABC",
    fixed: true,
    customCss: (0, _styledComponents.css)(_templateObject(), arrowStyle),
    style: {
      whiteSpace: 'nowrap',
      textAlign: 'center'
    }
  }, children);
};

var _default = Tooltip;
exports["default"] = _default;