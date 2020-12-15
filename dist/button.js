"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Button = function Button(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? undefined : _ref$className,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? 'Submit' : _ref$text;

  var handleClick = function handleClick(e) {
    e.preventDefault();
    onClick();
  };

  return /*#__PURE__*/_react["default"].createElement("button", {
    href: "#",
    className: className,
    onClick: handleClick
  }, text);
};

var _default = Button;
exports["default"] = _default;