import React, { useEffect, useRef, useState } from 'react';

const TextareaInput = ({
  name,
  id,
  value,
  labelId,
  classes,
  placeholder,
  required,
  onChange,
  onFocus,
  onBlur,
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
    <textarea
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
      onBlur={() => onBlur(inputValue)}
    />
  );
};

TextareaInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: '',
  placeholder: '',
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};
export default TextareaInput;
