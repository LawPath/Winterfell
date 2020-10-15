import React, { useEffect, useState } from 'react';

const STATES = [
  {
    text: 'Australian Capital Territory',
    value: 'ACT',
  },
  {
    text: 'New South Wales',
    value: 'NSW',
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

const AddressInput = ({ states, name, id, classes, required, placeholders, onFocus, labelId }) => {
  const [inputValue, setInputValue] = useState(value.type ? value.value : value);

  const handleSelectState = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const { line1, line2, city, postcode } = inputValue;
    const theState = states.find((ss) => ss.value === e.nativeEvent.target[index].value);
    const state = {
      value: {
        line1,
        line2,
        city,
        state: theState,
        postcode,
      },
    };
    setInputValue(state);
    onChange({ type: 'address', value: state.value });
  };

  const handleChangeField = (field, e) => {
    const { line1, line2, city, postcode } = inputValue;
    let theState = states.find((ss) => ss.value === inputValue.state.value);
    if (!theState) {
      theState = states[0];
    }
    const newState = {
      value: {
        line1,
        line2,
        city,
        state: theState,
        postcode,
      },
    };
    newState.value[field] = e.target.value;
    setInputValue(newState);
    onChange({ type: 'address', value: newState.value });
  };

  const renderSelect = () => {
    const options = states.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.text}
      </option>
    ));

    return (
      <select
        name={`${name}-state`}
        id={`${id}-state`}
        className={classes.select}
        value={inputValue.state ? inputValue.state.value : ''}
        required={required ? 'required' : undefined}
        onChange={(e) => handleSelectState(e)}
        onFocus={() => onFocus(id)}
      >
        {options}
      </select>
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name={`${name}-line1`}
          id={`${id}-line1`}
          aria-labelledby={`${labelId}-line1`}
          className={classes.input}
          placeholder={placeholders.line1}
          value={inputValue.line1}
          required={required ? 'required' : undefined}
          onChange={(e) => handleChangeField('line1', e)}
          onFocus={() => onFocus(id)}
        />
      </div>
      <div>
        <input
          type="text"
          name={`${name}-line2`}
          id={`${id}-line2`}
          aria-labelledby={`${labelId}-line2`}
          className={classes.input}
          placeholder={placeholders.line2}
          value={inputValue.line2}
          required={required ? 'required' : undefined}
          onChange={(e) => handleChangeField('line2', e)}
          onFocus={() => onFocus(id)}
        />
      </div>
      <div className="city-line">
        <div className="beginning">
          <input
            type="text"
            name={`${name}-city`}
            id={`${id}-city`}
            aria-labelledby={`${labelId}-city`}
            className={classes.input}
            placeholder={placeholders.city}
            value={inputValue.city}
            required={required ? 'required' : undefined}
            onChange={(e) => handleChangeField('city', e)}
            onFocus={() => onFocus(id)}
          />
        </div>
        <div className="middle">{renderSelect()}</div>
        <div className="ending">
          <input
            type="text"
            name={`${name}-postcode`}
            id={`${id}-postcode`}
            aria-labelledby={`${labelId}-postcode`}
            className={classes.input}
            placeholder={placeholders.postcode}
            value={inputValue.postcode}
            required={required ? 'required' : undefined}
            onChange={(e) => handleChangeField('postcode', e)}
            onFocus={() => onFocus(id)}
          />
        </div>
      </div>
    </div>
  );
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
      value: 'NSW',
    },
    postcode: '',
  },
  placeholders: {
    line1: 'E.g 100 Pitt St',
    line2: 'E.g Sydney CBD',
    city: 'E.g Sydney',
    postcode: 'E.g 2000',
  },
  states: STATES,
  onChange: () => {},
  onFocus: () => {},
};

export default AddressInput;
