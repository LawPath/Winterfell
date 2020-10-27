import React, { useEffect, useRef, useState } from 'react';
import Tooltip from '../custom/tooltip';

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
  onClickInputIcon,
  enablePrefilledAnswer,
  inputIconTooltipText,
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
    <div className="input-group">
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
        data-prefiled-data={enablePrefilledAnswer}
      />
      {enablePrefilledAnswer ? (
        <div class="input-group-append">
          <span class="input-group-text">
            <Tooltip
              onClick={onClickInputIcon}
              content={inputIconTooltipText}
              icon="https://assets.lawpath.com/images/svg/editor/builder.svg"
            />
          </span>
        </div>
      ) : null}
    </div>
  );
};

TextInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: '',
  placeholder: '',
  enablePrefilledAnswer: true,
  onChange: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
  onFocus: () => {},
  onFocus: () => {},
  onClickInputIcon: () => {},
  onClickInputIcon: () => {},
};

export default TextInput;
