"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _inputFormGroup = _interopRequireDefault(require("../formGroups/inputFormGroup"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var calendarIconUrl = 'https://assets.lawpath.com/images/svg/calendar.svg';

var CustomInput = function CustomInput(_ref) {
  var style = _ref.style,
      onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value,
      isSecure = _ref.isSecure,
      id = _ref.id,
      onClick = _ref.onClick,
      onClickInputIcon = _ref.onClickInputIcon;
  return /*#__PURE__*/_react["default"].createElement(_inputFormGroup["default"], {
    showIcon: true,
    showTooltip: false,
    onClick: onClickInputIcon,
    iconUrl: calendarIconUrl
  }, /*#__PURE__*/_react["default"].createElement("input", {
    onChange: onChange,
    placeholder: placeholder,
    value: value,
    isSecure: isSecure,
    id: id,
    className: style,
    onClick: onClick
  }));
};

var DateInputType = /*#__PURE__*/function (_React$Component) {
  _inherits(DateInputType, _React$Component);

  var _super = _createSuper(DateInputType);

  function DateInputType(props) {
    var _this;

    _classCallCheck(this, DateInputType);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (date) {
      // Null checked: Date when typed manually
      if (date === null) {
        return;
      }

      _this.setState({
        value: date
      }, _this.props.onChange.bind(null, {
        type: 'date',
        value: (0, _moment["default"])(date)
      }));
    });

    _this.state = {
      value: _this.props.value && _this.props.value.type && (0, _moment["default"])(_this.props.value.value)
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DateInputType, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _onFocus = this.props.onFocus;
      return /*#__PURE__*/_react["default"].createElement(_reactDatepicker["default"], {
        customInput: /*#__PURE__*/_react["default"].createElement(CustomInput, {
          style: this.props.classes.input,
          onClickInputIcon: this.props.onClickInputIcon
        }),
        name: "".concat(this.props.name),
        id: "".concat(this.props.id),
        "aria-labelledby": "".concat(this.props.labelId),
        selected: this.state.value,
        value: this.state.value,
        onSelect: this.props.onBlur,
        onFocus: function onFocus() {
          return _onFocus(_this2.props.id);
        },
        onChange: this.handleChange,
        dateFormat: "DD MMM YYYY",
        peekNextMonth: true,
        showMonthDropdown: true,
        showYearDropdown: true,
        dropdownMode: "select"
      });
    }
  }]);

  return DateInputType;
}(_react["default"].Component);

exports["default"] = DateInputType;
DateInputType.propTypes = {
  value: _propTypes["default"].any,
  onChange: _propTypes["default"].func.isRequired,
  onBlur: _propTypes["default"].func,
  name: _propTypes["default"].string,
  id: _propTypes["default"].string.isRequired,
  classes: _propTypes["default"].object,
  onFocus: _propTypes["default"].func,
  labelId: _propTypes["default"].string.isRequired
};
DateInputType.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: (0, _moment["default"])(),
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  onFocus: function onFocus() {}
};