import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import IconInput from '../formGroups/inputFormGroup';

export const STATES = [
  {
    text: 'Select state',
    value: '',
  },
  {
    text: 'New South Wales',
    value: 'NSW',
  },
  {
    text: 'Australian Capital Territory',
    value: 'ACT',
  },
  {
    text: 'Northern Territory',
    value: 'NT',
  },
  {
    text: 'Queensland',
    value: 'QLD',
  },
  {
    text: 'South Australia',
    value: 'SA',
  },
  {
    text: 'Tasmania',
    value: 'TAS',
  },
  {
    text: 'Victoria',
    value: 'VIC',
  },
  {
    text: 'Western Australia',
    value: 'WA',
  },
];
export const DEFAULT_STATE = {
  text: 'New South Wales',
  value: 'NSW',
};

export const DEFAULT_ADDRESS = {
  line1: '',
  line2: '',
  city: '',
  state: DEFAULT_STATE,
  postcode: '',
};

const getAddress = (address) => {
  let addressObject = address;
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

export default class AddressInputType extends React.Component {
  constructor(props) {
    super(props);
    let value = DEFAULT_ADDRESS;
    if (this.props.value) {
      const valueObj = getAddress(this.props.value);
      value = valueObj.type ? valueObj.value : valueObj;
    }

    if (this.props.enablePrefilledAnswer) {
      /* Trigger focus event to once there is prefill data */
      this.props.onFocus(this.props.id);
    }
    this.state = { value };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && !_.isEqual(nextProps.value, this.state.value)) {
      const valueObj = getAddress(nextProps.value);
      this.setState({ value: valueObj.type ? valueObj.value : valueObj });
    }
  }

  handleSelectState = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const { line1, line2, city, postcode } = this.state.value;
    const theState = this.props.states.find((ss) => ss.value === e.nativeEvent.target[index].value);
    const state = {
      value: {
        line1,
        line2,
        city,
        state: theState,
        postcode,
      },
    };
    this.setState(state, this.props.onChange.bind(null, { type: 'address', value: state.value }));
  };

  handleChangeField = (field, e) => {
    const { line1, line2, city, postcode, state: stateObj } = this.state.value;
    let theState = this.props.states.find((ss) => ss.value === stateObj.value);
    if (!theState) {
      theState = this.props.states[0];
    }
    const ns = {
      value: {
        line1,
        line2,
        city,
        state: theState,
        postcode,
      },
    };
    ns.value[field] = e.target.value;
    this.setState(ns, this.props.onChange.bind(null, { type: 'address', value: ns.value }));
  };

  renderSelect = () => {
    const options = this.props.states.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.text}
      </option>
    ));

    return (
      <select
        name={`${this.props.name}-state`}
        id={`${this.props.id}-state`}
        className={this.props.classes.select}
        value={this.state.value && this.state.value.state ? this.state.value.state.value : ''}
        required={this.props.required ? 'required' : undefined}
        onChange={(e) => this.handleSelectState(e)}
        onFocus={() => this.props.onFocus(this.props.id)}
        data-prefiled-data={this.props.enablePrefilledAnswer}
      >
        {options}
      </select>
    );
  };

  render() {
    const { onFocus, placeholders, enablePrefilledAnswer } = this.props;
    const sel = this.renderSelect();
    const address = (
      <div>
        <div className="address-line">
          <div className="address-line-1">
            <div className="input-group">
              <input
                type="text"
                name={`${this.props.name}-line1`}
                id={`${this.props.id}-line1`}
                aria-labelledby={`${this.props.labelId}-line1`}
                className={`${
                  this.props.classes.input ? this.props.classes.input : 'form-control'
                }`}
                placeholder={placeholders.line1}
                value={this.state.value.line1}
                required={this.props.required ? 'required' : undefined}
                onChange={(e) => this.handleChangeField('line1', e)}
                onFocus={() => onFocus(this.props.id)}
                data-prefiled-data={enablePrefilledAnswer}
              />
            </div>
          </div>
          <div className="address-line-2">
            <IconInput
              active={enablePrefilledAnswer}
              onClick={this.props.onClickInputIcon}
            >
              <input
                type="text"
                name={`${this.props.name}-line2`}
                id={`${this.props.id}-line2`}
                aria-labelledby={`${this.props.labelId}-line2`}
                className={this.props.classes.input}
                placeholder={placeholders.line2}
                value={this.state.value.line2}
                required={this.props.required ? 'required' : undefined}
                onChange={(e) => this.handleChangeField('line2', e)}
                onFocus={() => onFocus(this.props.id)}
                data-prefiled-data={enablePrefilledAnswer}
              />
            </IconInput>
          </div>
        </div>
        <div className="city-line">
          <div className="beginning">
            <input
              type="text"
              name={`${this.props.name}-city`}
              id={`${this.props.id}-city`}
              aria-labelledby={`${this.props.labelId}-city`}
              className={this.props.classes.input}
              placeholder={placeholders.city}
              value={this.state.value.city}
              required={this.props.required ? 'required' : undefined}
              onChange={(e) => this.handleChangeField('city', e)}
              onFocus={() => onFocus(this.props.id)}
              data-prefiled-data={enablePrefilledAnswer}
            />
          </div>
          <div className="ending">
            <input
              type="text"
              name={`${this.props.name}-postcode`}
              id={`${this.props.id}-postcode`}
              aria-labelledby={`${this.props.labelId}-postcode`}
              className={this.props.classes.input}
              placeholder={placeholders.postcode}
              value={this.state.value.postcode}
              required={this.props.required ? 'required' : undefined}
              onChange={(e) => this.handleChangeField('postcode', e)}
              onFocus={() => onFocus(this.props.id)}
              data-prefiled-data={enablePrefilledAnswer}
            />
          </div>
        </div>
        <div className="state-line">{sel}</div>
      </div>
    );

    return address;
  }
}

AddressInputType.propTypes = {
  value: PropTypes.object,
  states: PropTypes.array,
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  classes: PropTypes.object,
  required: PropTypes.string,
  onFocus: PropTypes.func,
  placeholders: PropTypes.object,
  labelId: PropTypes.string.isRequired,
  enablePrefilledAnswer: PropTypes.bool.isRequired,
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
    postcode: '',
  },
  placeholders: {
    line1: 'E.g. 2/100',
    line2: 'E.g. Smith Street',
    city: 'E.g. Sydney',
    postcode: 'E.g. 2000',
  },
  states: STATES,
  onChange: () => {},
  onClickInputIcon: () => {},
  onFocus: () => {},
};
