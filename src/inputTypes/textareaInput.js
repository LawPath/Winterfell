import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tooltip from '../custom/tooltip';
import { Icon } from '../custom/icon';

const TextareaWrapper = styled.div.attrs({
  'data-id': 'textarea-wrapper',
})`
  position: relative;
  min-height: 60px;
  border: 1px solid #7a8aa0;

  textarea {
    resize: vertical;
    padding-right: 45px;
    min-height: 60px;
    max-height: 120px;
    border: none !important;
    background-color: ${({ active }) => (active ? '#e7f2f9' : 'inherit')} !important;
  }
`;

const InputGroupIcon = styled.div.attrs({ 'data-id': 'input-group-icon' })`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  border-left: none;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#e7f2f9' : 'inherit')};
`;

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
  onClickInputIcon,
  enablePrefilledAnswer,
  questionLabel,
  prefilledData,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);

    if (enablePrefilledAnswer) {
      onFocus(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, enablePrefilledAnswer]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };
  return (
    <TextareaWrapper active={enablePrefilledAnswer}>
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
      {enablePrefilledAnswer || (!enablePrefilledAnswer && questionLabel && !prefilledData) ? (
        <InputGroupIcon active={enablePrefilledAnswer}>
          <Tooltip>
            <Icon showingPointer={true} onClick={onClickInputIcon} />
          </Tooltip>
        </InputGroupIcon>
      ) : null}
    </TextareaWrapper>
  );
};

TextareaInput.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
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
