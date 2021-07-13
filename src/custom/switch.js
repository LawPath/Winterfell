import React, { useEffect, useState } from 'react';
import SimpleSwitch from 'react-switch';
import styled from 'styled-components';
import Tooltip from './tooltip';

const ToggleText = styled.div.attrs({ 'data-id': 'toggle-button-text' })`
  font-size: 11px;
  display: inline-block;
  padding: 0 5px;
`;

const UnavailablePrefillMessage = () => (
  <span>
    This field cannot be pre-
    <br />
    filled.
  </span>
);

const PrefillOnMessage = () => (
  <span>
    Pre-fill information has <br /> been used. Toggle off to <br /> remove.
  </span>
);

const PrefillOffMessage = () => (
  <span>
    Pre-fill information is <br /> available. Toggle on to use.
  </span>
);

const OffButton = () => {
  return <ToggleText> OFF </ToggleText>;
};

const OnButton = () => {
  return <ToggleText> ON </ToggleText>;
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
  fontSize: 11,
};

export const SwitchWithTooltip = (props) => {
  const {
    active,
    disabled,
    disableTooltipMessage: inputDisableTooltipMessage,
    onTooltipMessage: inputOnTooltipMessage,
    offTooltipMessage: inputOffTooltipMessage,
    tooltipPlacement = 'bottom',
    onChange = () => {},
  } = props;
  const [checked, setChecked] = useState(active);

  const disableTooltipMessage = inputDisableTooltipMessage ?? UnavailablePrefillMessage;
  const onTooltipMessage = inputOnTooltipMessage ?? PrefillOnMessage;
  const offTooltipMessage = inputOffTooltipMessage ?? PrefillOffMessage;

  useEffect(() => {
    setChecked(active);
  }, [active, checked]);

  const handleChange = () => {
    onChange(!checked);
    setChecked(!checked);
  };

  const isActiveClass = disabled
    ? 'switch-control-disabled'
    : checked
    ? 'switch-control-active'
    : 'switch-control-inactive';

  return (
    <Tooltip
      content={disabled ? disableTooltipMessage : checked ? onTooltipMessage : offTooltipMessage}
      arrowStyle={`right: 20px;`}
      placement={tooltipPlacement}
    >
      <SimpleSwitch
        {...switchConfig}
        className={`switch-control ${isActiveClass}`}
        uncheckedIcon={<OffButton />}
        checkedIcon={<OnButton />}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
    </Tooltip>
  );
};
