import React, { useEffect, useRef, useState } from 'react';

const SignatureInput = ({
  name,
  id,
  value,
  labelId,
  classes,
  placeholder,
  required,
  onFocus,
  onChange,
  onBlur,
  onKeyDown,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setValue(value.type ? value.value : value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange({
      type: 'signature',
      value: e.target.value,
    });
  };

  return (
    <input
      type="text"
      name={name}
      id={id}
      aria-labelledby={labelId}
      className={classes.signature}
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

SignatureInput.defaultProps = {
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

export default SignatureInput;
