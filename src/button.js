import React from 'react';

const Button = ({ className = undefined, onClick = () => {}, text = 'Submit' }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button href="#" className={className} onClick={handleClick}>
      {text}
    </button>
  );
};
export default Button;
