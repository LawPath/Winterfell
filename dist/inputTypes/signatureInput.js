'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignatureInput = function (_React$Component) {
  _inherits(SignatureInput, _React$Component);

  function SignatureInput(props) {
    _classCallCheck(this, SignatureInput);

    var _this = _possibleConstructorReturn(this, (SignatureInput.__proto__ || Object.getPrototypeOf(SignatureInput)).call(this, props));

    _this.state = {
      value: _this.props.value.type ? _this.props.value.value : _this.props.value
    };
    return _this;
  }

  _createClass(SignatureInput, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({
        value: e.target.value
      }, this.props.onChange.bind(null, {
        type: 'signature',
        value: e.target.value
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', {
        type: 'text',
        name: this.props.name,
        id: this.props.id,
        'aria-labelledby': this.props.labelId,
        className: this.props.classes.signature,
        placeholder: this.props.placeholder,
        value: this.state.value,
        required: this.props.required ? 'required' : undefined,
        onChange: this.handleChange.bind(this),
        onFocus: this.props.onFocus.bind(null, this.props.id),
        onBlur: this.props.onBlur.bind(null, this.state.value),
        onKeyDown: this.props.onKeyDown
      });
    }
  }]);

  return SignatureInput;
}(_react2.default.Component);

exports.default = SignatureInput;


SignatureInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: '',
  placeholder: '',
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  onKeyDown: function onKeyDown() {},
  onFocus: function onFocus() {}
};