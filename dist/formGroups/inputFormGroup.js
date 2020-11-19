"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _tooltip = _interopRequireDefault(require("../custom/tooltip"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _icon = require("../custom/icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.375rem 0.75rem;\n  background-color: ", ";\n  border-left: none;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n  border: 1px solid #7a8aa0;\n\n  input {\n    height: 38px;\n    flex: 1 1 auto;\n    margin-bottom: 0;\n    border: none !important;\n  }\n\n  input[data-prefiled-data='true'] {\n    border-right: none !important;\n    background-color: #e7f2f9;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var InputGroup = _styledComponents["default"].div.attrs({
  'data-id': 'input-group'
})(_templateObject());

var InputGroupIcon = _styledComponents["default"].div.attrs({
  'data-id': 'input-group-icon'
})(_templateObject2(), function (_ref) {
  var active = _ref.active;
  return active ? '#e7f2f9' : 'inherit';
});

var IconInput = function IconInput(_ref2) {
  var active = _ref2.active,
      showIcon = _ref2.showIcon,
      _ref2$showTooltip = _ref2.showTooltip,
      showTooltip = _ref2$showTooltip === void 0 ? true : _ref2$showTooltip,
      onClick = _ref2.onClick,
      tooltipContent = _ref2.tooltipContent,
      iconUrl = _ref2.iconUrl,
      children = _ref2.children;
  return /*#__PURE__*/_react["default"].createElement(InputGroup, null, children, active || showIcon ? /*#__PURE__*/_react["default"].createElement(InputGroupIcon, {
    active: active
  }, showTooltip ? /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
    content: tooltipContent
  }, /*#__PURE__*/_react["default"].createElement(_icon.Icon, {
    showingPointer: true,
    onClick: onClick,
    icon: iconUrl
  })) : /*#__PURE__*/_react["default"].createElement(_icon.Icon, {
    icon: iconUrl
  })) : null);
};

var _default = IconInput;
exports["default"] = _default;