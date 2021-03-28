"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSimpleTooltip = _interopRequireDefault(require("react-simple-tooltip"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        /*Class selector does not work on production. Using position selector to query */\n        > :nth-child(2) {\n          left: unset;\n          right: 0;\n          transform: translateX(5%);\n\n          > :first-child > :first-child {\n            left: unset;\n            ", "\n          }\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TooltipContent = _styledComponents["default"].span.attrs({
  'data-id': 'tooltip-content'
})(_templateObject());

var DefaultTooltipContent = function DefaultTooltipContent() {
  return /*#__PURE__*/_react["default"].createElement(TooltipContent, null, "This is a pre-fillable field. ", /*#__PURE__*/_react["default"].createElement("br", null), "Click ", /*#__PURE__*/_react["default"].createElement("a", null, "here"), " to edit ", /*#__PURE__*/_react["default"].createElement("br", null), " your pre-filled information");
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
    customCss: (0, _styledComponents.css)(_templateObject2(), arrowStyle),
    style: {
      whiteSpace: 'nowrap',
      textAlign: 'center'
    }
  }, children);
};

var _default = Tooltip;
exports["default"] = _default;