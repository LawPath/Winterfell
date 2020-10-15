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

var STATES = [{
  text: 'Australian Capital Territory',
  value: 'ACT'
}, {
  text: 'New South Wales',
  value: 'NSW'
}, {
  text: 'Northern Territory',
  value: 'NT'
}, {
  text: 'Queensland',
  value: 'QLD'
}, {
  text: 'South Australia',
  value: 'SA'
}, {
  text: 'Tasmania',
  value: 'TAS'
}, {
  text: 'Victoria',
  value: 'VIC'
}, {
  text: 'Western Australia',
  value: 'WA'
}];

var AddressInput = function AddressInput(_ref) {
  var states = _ref.states,
      name = _ref.name,
      id = _ref.id,
      classes = _ref.classes,
      required = _ref.required,
      placeholders = _ref.placeholders,
      _onFocus = _ref.onFocus,
      labelId = _ref.labelId;

  var _useState = (0, _react.useState)(value.type ? value.value : value),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var handleSelectState = function handleSelectState(e) {
    var index = e.nativeEvent.target.selectedIndex;
    var line1 = inputValue.line1,
        line2 = inputValue.line2,
        city = inputValue.city,
        postcode = inputValue.postcode;
    var theState = states.find(function (ss) {
      return ss.value === e.nativeEvent.target[index].value;
    });
    var state = {
      value: {
        line1: line1,
        line2: line2,
        city: city,
        state: theState,
        postcode: postcode
      }
    };
    setInputValue(state);
    onChange({
      type: 'address',
      value: state.value
    });
  };

  var handleChangeField = function handleChangeField(field, e) {
    var line1 = inputValue.line1,
        line2 = inputValue.line2,
        city = inputValue.city,
        postcode = inputValue.postcode;
    var theState = states.find(function (ss) {
      return ss.value === inputValue.state.value;
    });

    if (!theState) {
      theState = states[0];
    }

    var newState = {
      value: {
        line1: line1,
        line2: line2,
        city: city,
        state: theState,
        postcode: postcode
      }
    };
    newState.value[field] = e.target.value;
    setInputValue(newState);
    onChange({
      type: 'address',
      value: newState.value
    });
  };

  var renderSelect = function renderSelect() {
    var options = states.map(function (opt) {
      return /*#__PURE__*/_react["default"].createElement("option", {
        key: opt.value,
        value: opt.value
      }, opt.text);
    });
    return /*#__PURE__*/_react["default"].createElement("select", {
      name: "".concat(name, "-state"),
      id: "".concat(id, "-state"),
      className: classes.select,
      value: value.state ? inputValue.state.value : '',
      required: required ? 'required' : undefined,
      onChange: function onChange(e) {
        return handleSelectState(e);
      },
      onFocus: function onFocus() {
        return _onFocus(id);
      }
    }, options);
  };

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "".concat(name, "-line1"),
    id: "".concat(id, "-line1"),
    "aria-labelledby": "".concat(labelId, "-line1"),
    className: classes.input,
    placeholder: placeholders.line1,
    value: inputValue.line1,
    required: required ? 'required' : undefined,
    onChange: function onChange(e) {
      return handleChangeField('line1', e);
    },
    onFocus: function onFocus() {
      return _onFocus(id);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "".concat(name, "-line2"),
    id: "".concat(id, "-line2"),
    "aria-labelledby": "".concat(labelId, "-line2"),
    className: classes.input,
    placeholder: placeholders.line2,
    value: inputValue.line2,
    required: required ? 'required' : undefined,
    onChange: function onChange(e) {
      return handleChangeField('line2', e);
    },
    onFocus: function onFocus() {
      return _onFocus(id);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "city-line"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "beginning"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "".concat(name, "-city"),
    id: "".concat(id, "-city"),
    "aria-labelledby": "".concat(labelId, "-city"),
    className: classes.input,
    placeholder: placeholders.city,
    value: inputValue.city,
    required: required ? 'required' : undefined,
    onChange: function onChange(e) {
      return handleChangeField('city', e);
    },
    onFocus: function onFocus() {
      return _onFocus(id);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "middle"
  }, renderSelect()), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ending"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "".concat(name, "-postcode"),
    id: "".concat(id, "-postcode"),
    "aria-labelledby": "".concat(labelId, "-postcode"),
    className: classes.input,
    placeholder: placeholders.postcode,
    value: inputValue.postcode,
    required: required ? 'required' : undefined,
    onChange: function onChange(e) {
      return handleChangeField('postcode', e);
    },
    onFocus: function onFocus() {
      return _onFocus(id);
    }
  }))));
};

AddressInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: {
    line1: '',
    line2: '',
    city: '',
    state: {
      text: 'New South Wales',
      value: 'NSW'
    },
    postcode: ''
  },
  placeholders: {
    line1: 'E.g 100 Pitt St',
    line2: 'E.g Sydney CBD',
    city: 'E.g Sydney',
    postcode: 'E.g 2000'
  },
  states: STATES,
  onChange: function onChange() {},
  onFocus: function onFocus() {}
};
var _default = AddressInput;
exports["default"] = _default;