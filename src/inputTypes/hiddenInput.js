import React, { useEffect, useState } from 'react';

const HiddenInput = ({ name, value }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return <input type="hidden" onChange={handleChange} name={name} value={inputValue} />;
};

HiddenInput.defaultProps = {
  name: '',
  value: '',
};
export default HiddenInput;
