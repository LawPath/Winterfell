import React, { useEffect, useState } from 'react';

const RadioOptionsInput = ({
  id,
  name,
  value,
  classes,
  options,
  labelId,
  required,
  onFocus,
  onChange,
  onBlur,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (optionValue) => {
    setInputValue(optionValue);
    onChange(optionValue);
  };

  if (!options) return null;
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
