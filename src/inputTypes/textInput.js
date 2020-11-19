import React, { useEffect, useState } from 'react';
import IconInput from '../formGroups/inputFormGroup';

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
  inputIconTooltipContent,
  prefilledData,
  questionLabel,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);

    if (enablePrefilledAnswer) {
      onFocus(id);
    }
  }, [value, enablePrefilledAnswer]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <IconInput
      active={enablePrefilledAnswer}
      showIcon={!enablePrefilledAnswer && !prefilledData && questionLabel}
      onClick={onClickInputIcon}
      tooltipContent={inputIconTooltipContent}
    >
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
    </IconInput>
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
};

export default TextInput;
