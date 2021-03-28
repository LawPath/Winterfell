import React, { useEffect, useState } from 'react';

const PasswordInput = ({
  name,
  id,
  labelId,
  classes,
  placeholder,
  required,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <input
      type="password"
      name={name}
      id={id}
      aria-labelledby={labelId}
      className={classes.input}
      placeholder={placeholder}
      value={inputValue}
      required={required ? 'required' : undefined}
      onChange={handleChange}
      onFocus={() => onFocus(id)}
      onBlur={() => onBlur(inputValue)}
      onKeyDown={onKeyDown}
    />
  );
};

PasswordInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: '',
  placeholder: '',
  onChange: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
  onFocus: () => {},
};

export default PasswordInput;
