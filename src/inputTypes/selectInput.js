import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';

const SelectInput = ({
  name,
  id,
  classes,
  value,
  required,
  onChange,
  onFocus,
  onBlur,
  options,
}) => {
  const selectRef = useRef(null);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (_.isEmpty(value) && options && _.isArray(options) && options.length > 0) {
      onChange(options[0].value);
    }
    onFocus(id)
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const selectOptions = options.map((opt) => (
    <option key={opt.value} value={opt.value}>
      {opt.text}
    </option>
  ));
  return (
    <select
      ref={selectRef}
      name={name}
      id={id}
      className={classes.select}
      value={inputValue}
      required={required ? 'required' : undefined}
      onChange={handleChange}
      onFocus={() => onFocus(id)}
      onBlur={() => onBlur(inputValue)}
    >
      {selectOptions}
    </select>
  );
};

SelectInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: '',
  options: [],
  onChange: () => {},
  onBlur: () => {},
};

export default SelectInput;
