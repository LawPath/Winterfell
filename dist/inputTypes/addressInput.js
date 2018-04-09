'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../less/addressInput.less');

var AddressInput = (function (_React$Component) {
  _inherits(AddressInput, _React$Component);

  function AddressInput(props) {
    _classCallCheck(this, AddressInput);

    _get(Object.getPrototypeOf(AddressInput.prototype), 'constructor', this).call(this, props);

    this.state = {
      value: this.props.value.type ? this.props.value.value : this.props.value
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSelectState = this.handleSelectState.bind(this);
  }

  _createClass(AddressInput, [{
    key: 'handleSelectState',
    value: function handleSelectState(e) {
      var index = e.nativeEvent.target.selectedIndex;
      var _state$value = this.state.value;
      var line1 = _state$value.line1;
      var line2 = _state$value.line2;
      var city = _state$value.city;
      var postcode = _state$value.postcode;

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
      var _this = this;

      var _state$value2 = this.state.value;
      var line1 = _state$value2.line1;
      var line2 = _state$value2.line2;
      var city = _state$value2.city;
      var postcode = _state$value2.postcode;

      var theState = this.props.states.find(function (ss) {
        return ss.value === _this.state.value.state.value;
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
      var _this2 = this;

      var options = this.props.states.map(function (opt) {
        return _react2['default'].createElement(
          'option',
          { key: opt.value, value: opt.value },
          opt.text
        );
      });

      return _react2['default'].createElement(
        'select',
        {
          name: this.props.name + '-state',
          id: this.props.id + '-state',
          className: this.props.classes.select,
          value: this.state.value.state ? this.state.value.state.value : '',
          required: this.props.required ? 'required' : undefined,
          onChange: function (e) {
            return _this2.handleSelectState(e);
          },
          onFocus: function () {
            return _this2.props.onFocus(_this2.props.id);
          }
        },
        options
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var onFocus = _props.onFocus;
      var placeholders = _props.placeholders;

      var sel = this.renderSelect();
      var address = _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement('input', {
            type: 'text',
            name: this.props.name + '-line1',
            id: this.props.id + '-line1',
            'aria-labelledby': this.props.labelId + '-line1',
            className: this.props.classes.input,
            placeholder: placeholders.line1,
            value: this.state.value.line1,
            required: this.props.required ? 'required' : undefined,
            onChange: function (e) {
              return _this3.handleChangeField('line1', e);
            },
            onFocus: function () {
              return onFocus(_this3.props.id);
            }
          })
        ),
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement('input', {
            type: 'text',
            name: this.props.name + '-line2',
            id: this.props.id + '-line2',
            'aria-labelledby': this.props.labelId + '-line2',
            className: this.props.classes.input,
            placeholder: placeholders.line2,
            value: this.state.value.line2,
            required: this.props.required ? 'required' : undefined,
            onChange: function (e) {
              return _this3.handleChangeField('line2', e);
            },
            onFocus: function () {
              return onFocus(_this3.props.id);
            }
          })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'city-line' },
          _react2['default'].createElement(
            'div',
            { className: 'beginning' },
            _react2['default'].createElement('input', {
              type: 'text',
              name: this.props.name + '-city',
              id: this.props.id + '-city',
              'aria-labelledby': this.props.labelId + '-city',
              className: this.props.classes.input,
              placeholder: placeholders.city,
              value: this.state.value.city,
              required: this.props.required ? 'required' : undefined,
              onChange: function (e) {
                return _this3.handleChangeField('city', e);
              },
              onFocus: function () {
                return onFocus(_this3.props.id);
              }
            })
          ),
          _react2['default'].createElement(
            'div',
            { className: 'middle' },
            sel
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ending' },
            _react2['default'].createElement('input', {
              type: 'text',
              name: this.props.name + '-postcode',
              id: this.props.id + '-postcode',
              'aria-labelledby': this.props.labelId + '-postcode',
              className: this.props.classes.input,
              placeholder: placeholders.postcode,
              value: this.state.value.postcode,
              required: this.props.required ? 'required' : undefined,
              onChange: function (e) {
                return _this3.handleChangeField('postcode', e);
              },
              onFocus: function () {
                return onFocus(_this3.props.id);
              }
            })
          )
        )
      );

      return address;
    }
  }]);

  return AddressInput;
})(_react2['default'].Component);

exports['default'] = AddressInput;

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
module.exports = exports['default'];