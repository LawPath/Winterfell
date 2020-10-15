import React, { useEffect, useState } from 'react';
import cloneArray from '../lib/cloneArray';

const CheckboxOptionsInput = ({
  classes,
  options,
  labelId,
  name,
  required,
  onFocus,
  id,
  onBlur,
  value,

  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value.length > 0 ? cloneArray(value) : []);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e, newVal) => {
    var currentValue = value;
    if (e.target.checked) {
      currentValue.push(newVal);
    } else {
      currentValue = currentValue.filter((v) => v != newVal);
    }
    setInputValue(currentValue);
    onChange(currentValue);
  };

  return (
    <ul className={classes.checkboxList}>
      {options.map((opt) => (
        <li key={opt.value} className={classes.checkboxListItem}>
          <label className={classes.checkboxLabel} id={labelId}>
            <input
              type="checkbox"
              name={name}
              aria-labelledby={labelId}
              value={opt.value}
              checked={inputValue.indexOf(opt.value) > -1}
              className={classes.checkbox}
              required={required ? 'required' : undefined}
              onChange={(event) => handleChange(event, opt.value)}
              onFocus={() => onFocus(id)}
              onBlur={() => onBlur(inputValue)}
            />
            {opt.text}
          </label>
        </li>
      ))}
    </ul>
  );
};

CheckboxOptionsInput.defaultProps = {
  classes: {},
  name: '',
  value: [],
  options: [],
  onChange: () => {},
  onBlur: () => {},
};

export default CheckboxOptionsInput;
