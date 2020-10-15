import React, { useEffect, useRef, useState } from 'react';

const TextInput = ({
  name,
  id,
  value,
  required,
  classes,
  placeholder,
  labelId,
  onChange,
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
      type="text"
      name={name}
      id={id}
      aria-labelledby={labelId}
      className={classes.input}
      placeholder={placeholder}
      value={inputValue}
      required={required ? 'required' : undefined}
      onChange={handleChange}
      onFocus={() => onFocus(id)}
      onBlur={() => onBlur(value)}
      onKeyDown={onKeyDown}
    />
  );
};

TextInput.defaultProps = {
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

export default TextInput;
