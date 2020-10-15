"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RadioOptionsInput = function RadioOptionsInput(value, classes) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var name = arguments.length > 3 ? arguments[3] : undefined;
  var labelId = arguments.length > 4 ? arguments[4] : undefined;
  var required = arguments.length > 5 ? arguments[5] : undefined;
  var onFocus = arguments.length > 6 ? arguments[6] : undefined;
  var id = arguments.length > 7 ? arguments[7] : undefined;

  var _onBlur = arguments.length > 8 ? arguments[8] : undefined;

  var _useState = (0, _react.useState)(value),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var handleChange = function handleChange(e) {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: classes.radioList
  }, options.map(function (opt) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: opt.value,
      className: classes.radioListItem
    }, /*#__PURE__*/_react["default"].createElement("label", {
      className: classes.radioLabel,
      id: labelId
    }, /*#__PURE__*/_react["default"].createElement("input", {
      type: "radio",
      name: name,
      "aria-labelledby": labelId,
      checked: inputValue == opt.value,
      className: classes.radio,
      required: required ? 'required' : undefined,
      onClick: function onClick() {
        return onFocus(id);
      },
      onChange: function onChange() {
        return handleChange(opt.value);
      },
      onBlur: function onBlur() {
        return _onBlur(inputValue);
      }
    }), opt.text));
  }));
};

RadioOptionsInput.defaultProps = {
  classes: {},
  name: '',
  value: '',
  options: [],
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  onFocus: function onFocus() {}
};
var _default = RadioOptionsInput;
exports["default"] = _default;