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

var CheckboxInput = /*#__PURE__*/function (_React$Component) {
  _inherits(CheckboxInput, _React$Component);

  var _super = _createSuper(CheckboxInput);

  function CheckboxInput(props) {
    var _this;

    _classCallCheck(this, CheckboxInput);

    _this = _super.call(this, props);
    _this.state = {
      checked: props.defaultChecked
    };
    return _this;
  }

  _createClass(CheckboxInput, [{
    key: "handleChange",
    value: function handleChange(e) {
      var _this2 = this;

      if (e) {
        this.setState({
          checked: !this.state.checked
        }, function () {
          _this2.props.onChange(_this2.state.checked ? _this2.props.value : undefined);
        });
      } else {
        this.props.onChange(this.state.checked ? this.props.value : undefined);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.state.checked) {
        this.handleChange();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.classes.checkboxInput
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: this.props.classes.checkboxLabel,
        id: this.props.labelId
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "checkbox",
        name: this.props.name,
        "aria-labelledby": this.props.labelId,
        className: this.props.classes.checkbox,
        defaultChecked: this.state.checked,
        value: this.props.value,
        required: this.props.required ? 'required' : undefined,
        onChange: this.handleChange.bind(this),
        onFocus: this.props.onFocus.bind(null, this.props.id),
        onBlur: this.props.onBlur.bind(null, this.state.checked ? this.props.value : undefined)
      }), this.props.text));
    }
  }]);

  return CheckboxInput;
}(_react["default"].Component);

CheckboxInput.defaultProps = {
  text: '',
  defaultChecked: false,
  classes: {},
  name: '',
  value: '',
  onChange: function onChange() {},
  onBlur: function onBlur() {}
};
var _default = CheckboxInput;
exports["default"] = _default;