import React, { useEffect, useState } from 'react';
import SimpleSwitch from 'react-switch';

const Switch = ({ active, onChange, disabled }) => {
  const [checked, setChecked] = useState(active);
  useEffect(() => setChecked(active), [active]);

  const handleChange = () => {
    onChange(!checked);
    setChecked(!checked);
  };

  return (
    <SimpleSwitch
      checked={checked}
      onChange={handleChange}
      onColor="#00C08B"
      offColor="#D2D8DF"
      offHandleColor="#FFF"
      onHandleColor="#FFF"
      activeBoxShadow={undefined}
      uncheckedIcon={
        <div style={{ color: '#FFF', lineHeight: '20px', fontSize: '11px', paddingLeft: '3px' }}>
          OFF
        </div>
      }
      checkedIcon={
        <div style={{ color: '#FFF', lineHeight: '20px', fontSize: '11px', paddingLeft: '3px' }}>
          ON
        </div>
      }
      className="switch-control"
      height={20}
      width={45}
      id="icon-switch"
      disabled={disabled}
    />
  );
};

export default Switch;
