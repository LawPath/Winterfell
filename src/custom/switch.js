import React, { useEffect, useState } from 'react';
import SimpleSwitch from 'react-switch';
import Tooltip from './tooltip';

const InavailablePrefill = () => (
  <span>
    This field cannot be pre-
    <br />
    filled.
  </span>
);
const DisabledPrefill = () => (
  <span>
    Pre-fill information has <br /> been used. Toggle off to <br /> remove.
  </span>
);
const EnabledPrefill = () => (
  <span>
    Pre-fill information is <br /> available. Toggle on to use.
  </span>
);

const OffButton = () => {
  return <div className="switch-btn">OFF</div>;
};
const OnButton = () => {
  return <div className="switch-btn">ON</div>;
};

const switchConfig = {
  onColor: '#00C08B',
  offColor: '#D2D8DF',
  offHandleColor: '#FFF',
  onHandleColor: '#FFF',
  activeBoxShadow: '0px 1px 3px #00000036',
  boxShadow: '0px 1px 3px #00000036',
  height: 20,
  width: 45,
};

const Switch = ({ active, onChange, disabled }) => {
  const [checked, setChecked] = useState(active);
  useEffect(() => setChecked(active), [active]);

  const handleChange = () => {
    onChange(!checked);
    setChecked(!checked);
  };
  return (
    <Tooltip
      content={disabled ? InavailablePrefill : checked ? DisabledPrefill : EnabledPrefill}
      arrowStyle={`right: 20px;`}
      placement="top"
    >
      <SimpleSwitch
        {...switchConfig}
        className={`switch-control ${
          disabled
            ? 'switch-control-disabled'
            : checked
            ? 'switch-control-active'
            : 'switch-control-inactive'
        }`}
        uncheckedIcon={<OffButton />}
        checkedIcon={<OnButton />}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
    </Tooltip>
  );
};

export default Switch;
