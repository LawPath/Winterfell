import React, { useCallback } from 'react';

const Button = ({
  className = undefined,
  onClick = () => {},
  text = 'Submit',
  type = 'button',
  disabled = false,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button type={type} className={className} onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  );
};
export default Button;
