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

var AddressInput = function (_React$Component) {
  _inherits(AddressInput, _React$Component);

  function AddressInput(props) {
    _classCallCheck(this, AddressInput);

    var _this = _possibleConstructorReturn(this, (AddressInput.__proto__ || Object.getPrototypeOf(AddressInput)).call(this, props));

    _this.state = {
      value: _this.props.value.type ? _this.props.value.value : _this.props.value
    };

    _this.handleChangeField = _this.handleChangeField.bind(_this);
    _this.handleSelectState = _this.handleSelectState.bind(_this);
    return _this;
  }

  _createClass(AddressInput, [{
    key: 'handleSelectState',
    value: function handleSelectState(e) {
      var index = e.nativeEvent.target.selectedIndex;
      var _state$value = this.state.value,
          line1 = _state$value.line1,
          line2 = _state$value.line2,
          city = _state$value.city,
          postcode = _state$value.postcode;

      var theState = this.props.states.find(function (ss) {
        return ss.value === e.nativeEvent.target[index].value;
      });
      var state = {
        value: {
          line1: line1, line2: line2, city: city, state: theState, postcode: postcode
        }
      };
      this.setState(state, this.props.onChange.bind(null, { type: 'address', value: state.value }));
    }
  }, {
    key: 'handleChangeField',
    value: function handleChangeField(field, e) {
      var _this2 = this;

      var _state$value2 = this.state.value,
          line1 = _state$value2.line1,
          line2 = _state$value2.line2,
          city = _state$value2.city,
          postcode = _state$value2.postcode;

      var theState = this.props.states.find(function (ss) {
        return ss.value === _this2.state.value.state.value;
      });
      if (!theState) {
        theState = this.props.states[0];
      }
      var ns = {
        value: {
          line1: line1, line2: line2, city: city, state: theState, postcode: postcode
        }
      };
      ns.value[field] = e.target.value;
      this.setState(ns, this.props.onChange.bind(null, { type: 'address', value: ns.value }));
    }
  }, {
    key: 'renderSelect',
    value: function renderSelect() {
      var _this3 = this;

      var options = this.props.states.map(function (opt) {
        return _react2.default.createElement(
          'option',
          { key: opt.value, value: opt.value },
          opt.text
        );
      });

      return _react2.default.createElement(
        'select',
        {
          name: this.props.name + '-state',
          id: this.props.id + '-state',
          className: this.props.classes.select,
          value: this.state.value.state ? this.state.value.state.value : '',
          required: this.props.required ? 'required' : undefined,
          onChange: function onChange(e) {
            return _this3.handleSelectState(e);
          },
          onFocus: function onFocus() {
            return _this3.props.onFocus(_this3.props.id);
          }
        },
        options
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          _onFocus = _props.onFocus,
          placeholders = _props.placeholders;

      var sel = this.renderSelect();
      var address = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', {
            type: 'text',
            name: this.props.name + '-line1',
            id: this.props.id + '-line1',
            'aria-labelledby': this.props.labelId + '-line1',
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
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', {
            type: 'text',
            name: this.props.name + '-line2',
            id: this.props.id + '-line2',
            'aria-labelledby': this.props.labelId + '-line2',
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
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'city-line' },
          _react2.default.createElement(
            'div',
            { className: 'beginning' },
            _react2.default.createElement('input', {
              type: 'text',
              name: this.props.name + '-city',
              id: this.props.id + '-city',
              'aria-labelledby': this.props.labelId + '-city',
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
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'middle' },
            sel
          ),
          _react2.default.createElement(
            'div',
            { className: 'ending' },
            _react2.default.createElement('input', {
              type: 'text',
              name: this.props.name + '-postcode',
              id: this.props.id + '-postcode',
              'aria-labelledby': this.props.labelId + '-postcode',
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
            })
          )
        )
      );

      return address;
    }
  }]);

  return AddressInput;
}(_react2.default.Component);

exports.default = AddressInput;


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
    line1: 'e.g 100 Pitt St',
    line2: 'e.g Sydney CBD',
    city: 'e.g Sydney',
    postcode: 'e.g 2000'
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