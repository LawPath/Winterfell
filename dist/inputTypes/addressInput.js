"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AddressInput = /*#__PURE__*/function (_React$Component) {
  _inherits(AddressInput, _React$Component);

  var _super = _createSuper(AddressInput);

  function AddressInput(props) {
    var _this;

    _classCallCheck(this, AddressInput);

    _this = _super.call(this, props);
    _this.state = {
      value: _this.props.value.type ? _this.props.value.value : _this.props.value
    };
    _this.handleChangeField = _this.handleChangeField.bind(_assertThisInitialized(_this));
    _this.handleSelectState = _this.handleSelectState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddressInput, [{
    key: "handleSelectState",
    value: function handleSelectState(e) {
      var index = e.nativeEvent.target.selectedIndex;
      var _this$state$value = this.state.value,
          line1 = _this$state$value.line1,
          line2 = _this$state$value.line2,
          city = _this$state$value.city,
          postcode = _this$state$value.postcode;
      var theState = this.props.states.find(function (ss) {
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
      this.setState(state, this.props.onChange.bind(null, {
        type: 'address',
        value: state.value
      }));
    }
  }, {
    key: "handleChangeField",
    value: function handleChangeField(field, e) {
      var _this2 = this;

      var _this$state$value2 = this.state.value,
          line1 = _this$state$value2.line1,
          line2 = _this$state$value2.line2,
          city = _this$state$value2.city,
          postcode = _this$state$value2.postcode;
      var theState = this.props.states.find(function (ss) {
        return ss.value === _this2.state.value.state.value;
      });

      if (!theState) {
        theState = this.props.states[0];
      }

      var ns = {
        value: {
          line1: line1,
          line2: line2,
          city: city,
          state: theState,
          postcode: postcode
        }
      };
      ns.value[field] = e.target.value;
      this.setState(ns, this.props.onChange.bind(null, {
        type: 'address',
        value: ns.value
      }));
    }
  }, {
    key: "renderSelect",
    value: function renderSelect() {
      var _this3 = this;

      var options = this.props.states.map(function (opt) {
        return /*#__PURE__*/_react["default"].createElement("option", {
          key: opt.value,
          value: opt.value
        }, opt.text);
      });
      return /*#__PURE__*/_react["default"].createElement("select", {
        name: "".concat(this.props.name, "-state"),
        id: "".concat(this.props.id, "-state"),
        className: this.props.classes.select,
        value: this.state.value.state ? this.state.value.state.value : '',
        required: this.props.required ? 'required' : undefined,
        onChange: function onChange(e) {
          return _this3.handleSelectState(e);
        },
        onFocus: function onFocus() {
          return _this3.props.onFocus(_this3.props.id);
        }
      }, options);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          _onFocus = _this$props.onFocus,
          placeholders = _this$props.placeholders;
      var sel = this.renderSelect();

      var address = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        name: "".concat(this.props.name, "-line1"),
        id: "".concat(this.props.id, "-line1"),
        "aria-labelledby": "".concat(this.props.labelId, "-line1"),
        className: this.props.classes.input,
        placeholder: placeholders.line1,
        value: this.state.value.line1,
        required: this.props.required ? 'required' : undefined,
        onChange: function onChange(e) {
          return _this4.handleChangeField('line1', e);
        },
        onFocus: function onFocus() {
          return _onFocus(_this4.props.id);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        name: "".concat(this.props.name, "-line2"),
        id: "".concat(this.props.id, "-line2"),
        "aria-labelledby": "".concat(this.props.labelId, "-line2"),
        className: this.props.classes.input,
        placeholder: placeholders.line2,
        value: this.state.value.line2,
        required: this.props.required ? 'required' : undefined,
        onChange: function onChange(e) {
          return _this4.handleChangeField('line2', e);
        },
        onFocus: function onFocus() {
          return _onFocus(_this4.props.id);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "city-line"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "beginning"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        name: "".concat(this.props.name, "-city"),
        id: "".concat(this.props.id, "-city"),
        "aria-labelledby": "".concat(this.props.labelId, "-city"),
        className: this.props.classes.input,
        placeholder: placeholders.city,
        value: this.state.value.city,
        required: this.props.required ? 'required' : undefined,
        onChange: function onChange(e) {
          return _this4.handleChangeField('city', e);
        },
        onFocus: function onFocus() {
          return _onFocus(_this4.props.id);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "middle"
      }, sel), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ending"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        name: "".concat(this.props.name, "-postcode"),
        id: "".concat(this.props.id, "-postcode"),
        "aria-labelledby": "".concat(this.props.labelId, "-postcode"),
        className: this.props.classes.input,
        placeholder: placeholders.postcode,
        value: this.state.value.postcode,
        required: this.props.required ? 'required' : undefined,
        onChange: function onChange(e) {
          return _this4.handleChangeField('postcode', e);
        },
        onFocus: function onFocus() {
          return _onFocus(_this4.props.id);
        }
      }))));

      return address;
    }
  }]);

  return AddressInput;
}(_react["default"].Component);

exports["default"] = AddressInput;
AddressInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: {
    line1: '',
    line2: '',
    city: '',
    state: {
      text: 'Australian Capital Territory',
      value: 'ACT'
    },
    postcode: ''
  },
  placeholders: {
    line1: 'E.g 100 Pitt St',
    line2: 'E.g Sydney CBD',
    city: 'E.g Sydney',
    postcode: 'E.g 2000'
  },
  states: [{
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
  }],
  onChange: function onChange() {},
  onFocus: function onFocus() {}
};