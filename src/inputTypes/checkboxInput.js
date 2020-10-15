import React, { useEffect, useState } from 'react';

const CheckboxInput = ({
  id,
  value,
  text,
  classes,
  labelId,
  name,
  required,
  onFocus,
  onBlur,
  onChange,
  defaultChecked,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    handleChange();
  }, [value]);

  const handleChange = (e) => {
    if (e) {
      const result = !checked;
      setChecked(result);
      onChange(result ? value : undefined);
    } else {
      onChange(checked ? value : undefined);
    }
  };

  return (
    <div className={classes.checkboxInput}>
      <label className={classes.checkboxLabel} id={labelId}>
        <input
          type="checkbox"
          name={name}
          aria-labelledby={labelId}
          className={classes.checkbox}
          defaultChecked={checked}
          value={value}
          required={required ? 'required' : undefined}
          onChange={handleChange}
          onFocus={() => onFocus(id)}
          onBlur={() => onBlur(checked ? value : undefined)}
        />
        {text}
      </label>
    </div>
  );
};

CheckboxInput.defaultProps = {
  text: '',
  defaultChecked: false,
  classes: {},
  name: '',
  value: '',
  onChange: () => {},
  onBlur: () => {},
};

export default CheckboxInput;
