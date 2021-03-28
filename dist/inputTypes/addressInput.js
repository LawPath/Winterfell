"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DEFAULT_ADDRESS = exports.DEFAULT_STATE = exports.STATES = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _inputFormGroup = _interopRequireDefault(require("../formGroups/inputFormGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STATES = [{
  text: 'Select state',
  value: ''
}, {
  text: 'New South Wales',
  value: 'NSW'
}, {
  text: 'Australian Capital Territory',
  value: 'ACT'
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
exports.STATES = STATES;
var DEFAULT_STATE = {
  text: 'New South Wales',
  value: 'NSW'
};
exports.DEFAULT_STATE = DEFAULT_STATE;
var DEFAULT_ADDRESS = {
  line1: '',
  line2: '',
  city: '',
  state: DEFAULT_STATE,
  postcode: ''
};
exports.DEFAULT_ADDRESS = DEFAULT_ADDRESS;

var getAddress = function getAddress(address) {
  var addressObject = address;

  if (typeof addressObject === 'string') {
    /* Make sure that the value is a object */
    try {
      addressObject = JSON.parse(addressObject);
    } catch (e) {
      addressObject = DEFAULT_ADDRESS;
      console.error('Could not parse address string: ', address);
    }
  }

  return addressObject;
};

var AddressInputType = /*#__PURE__*/function (_React$Component) {
  _inherits(AddressInputType, _React$Component);

  var _super = _createSuper(AddressInputType);

  function AddressInputType(props) {
    var _this;

    _classCallCheck(this, AddressInputType);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSelectState", function (e) {
      var index = e.nativeEvent.target.selectedIndex;
      var _this$state$value = _this.state.value,
          line1 = _this$state$value.line1,
          line2 = _this$state$value.line2,
          city = _this$state$value.city,
          postcode = _this$state$value.postcode;

      var theState = _this.props.states.find(function (ss) {
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

      _this.setState(state, _this.props.onChange.bind(null, {
        type: 'address',
        value: state.value
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeField", function (field, e) {
      var _this$state$value2 = _this.state.value,
          line1 = _this$state$value2.line1,
          line2 = _this$state$value2.line2,
          city = _this$state$value2.city,
          postcode = _this$state$value2.postcode,
          stateObj = _this$state$value2.state;

      var theState = _this.props.states.find(function (ss) {
        return ss.value === stateObj.value;
      });

      if (!theState) {
        theState = _this.props.states[0];
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

      _this.setState(ns, _this.props.onChange.bind(null, {
        type: 'address',
        value: ns.value
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelect", function () {
      var options = _this.props.states.map(function (opt) {
        return /*#__PURE__*/_react["default"].createElement("option", {
          key: opt.value,
          value: opt.value
        }, opt.text);
      });

      return /*#__PURE__*/_react["default"].createElement("select", {
        name: "".concat(_this.props.name, "-state"),
        id: "".concat(_this.props.id, "-state"),
        className: _this.props.classes.select,
        value: _this.state.value && _this.state.value.state ? _this.state.value.state.value : '',
        required: _this.props.required ? 'required' : undefined,
        onChange: function onChange(e) {
          return _this.handleSelectState(e);
        },
        onFocus: function onFocus() {
          return _this.props.onFocus(_this.props.id);
        },
        "data-prefiled-data": _this.props.enablePrefilledAnswer
      }, options);
    });

    _this.addressNumberRef = /*#__PURE__*/(0, _react.createRef)();
    var value = DEFAULT_ADDRESS;

    if (_this.props.value) {
      var valueObj = getAddress(_this.props.value);
      value = valueObj.type ? valueObj.value : valueObj;
    }

    if (_this.props.enablePrefilledAnswer) {
      /* Trigger focus event to once there is prefill data */
      _this.props.onFocus(_this.props.id);
    }

    _this.state = {
      value: value
    };
    return _this;
  }

  _createClass(AddressInputType, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && !_lodash["default"].isEqual(nextProps.value, this.state.value)) {
        var valueObj = getAddress(nextProps.value);
        this.setState({
          value: valueObj.type ? valueObj.value : valueObj
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.addressNumberRef.current.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _onFocus = _this$props.onFocus,
          placeholders = _this$props.placeholders,
          enablePrefilledAnswer = _this$props.enablePrefilledAnswer,
          prefilledData = _this$props.prefilledData,
          questionLabel = _this$props.questionLabel;
      var sel = this.renderSelect();

      var address = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "address-line"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "address-line-1"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        ref: this.addressNumberRef,
        name: "".concat(this.props.name, "-line1"),
        id: "".concat(this.props.id, "-line1"),
        "aria-labelledby": "".concat(this.props.labelId, "-line1"),
        className: "".concat(this.props.classes.input ? this.props.classes.input : 'form-control'),
        placeholder: placeholders.line1,
        value: this.state.value.line1,
        required: this.props.required ? 'required' : undefined,
        onChange: function onChange(e) {
          return _this2.handleChangeField('line1', e);
        },
        onFocus: function onFocus() {
          return _onFocus(_this2.props.id);
        },
        "data-prefiled-data": enablePrefilledAnswer
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "address-line-2"
      }, /*#__PURE__*/_react["default"].createElement(_inputFormGroup["default"], {
        active: enablePrefilledAnswer,
        showIcon: enablePrefilledAnswer || !prefilledData && questionLabel,
        onClick: this.props.onClickInputIcon
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        name: "".concat(this.props.name, "-line2"),
        id: "".concat(this.props.id, "-line2"),
        "aria-labelledby": "".concat(this.props.labelId, "-line2"),
        className: this.props.classes.input,
        placeholder: placeholders.line2,
        value: this.state.value.line2,
        required: this.props.required ? 'required' : undefined,
        onChange: function onChange(e) {
          return _this2.handleChangeField('line2', e);
        },
        onFocus: function onFocus() {
          return _onFocus(_this2.props.id);
        },
        "data-prefiled-data": enablePrefilledAnswer
      })))), /*#__PURE__*/_react["default"].createElement("div", {
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
          return _this2.handleChangeField('city', e);
        },
        onFocus: function onFocus() {
          return _onFocus(_this2.props.id);
        },
        "data-prefiled-data": enablePrefilledAnswer
      })), /*#__PURE__*/_react["default"].createElement("div", {
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
          return _this2.handleChangeField('postcode', e);
        },
        onFocus: function onFocus() {
          return _onFocus(_this2.props.id);
        },
        "data-prefiled-data": enablePrefilledAnswer
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "state-line"
      }, sel));

      return address;
    }
  }]);

  return AddressInputType;
}(_react["default"].Component);

exports["default"] = AddressInputType;
AddressInputType.propTypes = {
  value: _propTypes["default"].object,
  states: _propTypes["default"].array,
  onChange: _propTypes["default"].func,
  name: _propTypes["default"].string,
  id: _propTypes["default"].string,
  classes: _propTypes["default"].object,
  required: _propTypes["default"].string,
  onFocus: _propTypes["default"].func,
  placeholders: _propTypes["default"].object,
  labelId: _propTypes["default"].string.isRequired,
  enablePrefilledAnswer: _propTypes["default"].bool.isRequired
};
AddressInputType.defaultProps = {
  classes: {},
  name: '',
  id: '',
  required: undefined,
  enablePrefilledAnswer: false,
  value: {
    line1: '',
    line2: '',
    city: '',
    state: DEFAULT_STATE,
    postcode: ''
  },
  placeholders: {
    line1: 'E.g. 2/100',
    line2: 'E.g. Smith Street',
    city: 'E.g. Sydney',
    postcode: 'E.g. 2000'
  },
  states: STATES,
  onChange: function onChange() {},
  onClickInputIcon: function onClickInputIcon() {},
  onFocus: function onFocus() {}
};