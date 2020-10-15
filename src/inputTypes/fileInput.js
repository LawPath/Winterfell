import React, { useEffect, useRef, useState } from 'react';

const FileInput = ({ name, id, labelId, classes, required, onFocus, onBlur }) => {
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
      type="file"
      name={name}
      id={id}
      aria-labelledby={labelId}
      className={classes.file}
      required={required ? 'required' : undefined}
      onChange={handleChange}
      onFocus={() => onFocus(id)}
      onBlur={() => onBlur(inputValue)}
    />
  );
};

FileInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: '',
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};
export default FileInput;
