"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  width: 20px;\n  height: 20px;\n  background: url(", ") 0 0/100% 100% no-repeat;\n  background-position: center;\n\n  &.onclick {\n    cursor: pointer;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var builderIconUrl = 'https://assets.lawpath.com/images/svg/editor/builder.svg';

var Icon = _styledComponents["default"].div.attrs({
  data: 'input-icon'
})(_templateObject(), function (_ref) {
  var icon = _ref.icon;
  return icon || builderIconUrl;
});

exports.Icon = Icon;