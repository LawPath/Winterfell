import React, { useEffect, useState } from 'react';

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
  const [inputValue, setInputValue] = useState(value.length > 0 ? [...value] : []);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    const { checked, value: newValue } = e.target;
    let updatedInputValue = [...inputValue];
    if (checked) {
      updatedInputValue.push(newValue);
    } else {
      updatedInputValue = updatedInputValue.filter((v) => v !== newValue);
    }
    setInputValue(updatedInputValue);
    onChange(updatedInputValue);
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
              onChange={handleChange}
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
