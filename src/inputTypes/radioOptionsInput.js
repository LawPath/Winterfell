import React, { useState } from 'react';

const RadioOptionsInput = (
  value,
  classes,
  options = [],
  name,
  labelId,
  required,
  onFocus,
  id,
  onBlur,
) => {
  const [inputValue, setInputValue] = useState(value);
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <ul className={classes.radioList}>
      {options.map((opt) => (
        <li key={opt.value} className={classes.radioListItem}>
          <label className={classes.radioLabel} id={labelId}>
            <input
              type="radio"
              name={name}
              aria-labelledby={labelId}
              checked={inputValue == opt.value}
              className={classes.radio}
              required={required ? 'required' : undefined}
              onClick={() => onFocus(id)}
              onChange={() => handleChange(opt.value)}
              onBlur={() => onBlur(inputValue)}
            />
            {opt.text}
          </label>
        </li>
      ))}
    </ul>
  );
};

RadioOptionsInput.defaultProps = {
  classes: {},
  name: '',
  value: '',
  options: [],
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};

export default RadioOptionsInput;
