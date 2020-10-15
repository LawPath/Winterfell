"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _cloneArray = _interopRequireDefault(require("../lib/cloneArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CheckboxOptionsInput = function CheckboxOptionsInput(_ref) {
  var classes = _ref.classes,
      options = _ref.options,
      labelId = _ref.labelId,
      name = _ref.name,
      required = _ref.required,
      _onFocus = _ref.onFocus,
      id = _ref.id,
      _onBlur = _ref.onBlur,
      value = _ref.value,
      onChange = _ref.onChange;

  var _useState = (0, _react.useState)(value.length > 0 ? (0, _cloneArray["default"])(value) : []),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  (0, _react.useEffect)(function () {
    console.log('This is data: ', value);
    setInputValue(value);
  }, [value]);

  var handleChange = function handleChange(e, newVal) {
    var currentValue = value;

    if (e.target.checked) {
      currentValue.push(newVal);
    } else {
      currentValue = currentValue.filter(function (v) {
        return v != newVal;
      });
    }

    setInputValue(currentValue);
    onChange(currentValue);
  };

  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: classes.checkboxList
  }, options.map(function (opt) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: opt.value,
      className: classes.checkboxListItem
    }, /*#__PURE__*/_react["default"].createElement("label", {
      className: classes.checkboxLabel,
      id: labelId
    }, /*#__PURE__*/_react["default"].createElement("input", {
      type: "checkbox",
      name: name,
      "aria-labelledby": labelId,
      value: opt.value,
      checked: inputValue.indexOf(opt.value) > -1,
      className: classes.checkbox,
      required: required ? 'required' : undefined,
      onChange: function onChange(event) {
        return handleChange(event, opt.value);
      },
      onFocus: function onFocus() {
        return _onFocus(id);
      },
      onBlur: function onBlur() {
        return _onBlur(inputValue);
      }
    }), opt.text));
  }));
};

CheckboxOptionsInput.defaultProps = {
  classes: {},
  name: '',
  value: [],
  options: [],
  onChange: function onChange() {},
  onBlur: function onBlur() {}
};
var _default = CheckboxOptionsInput;
exports["default"] = _default;