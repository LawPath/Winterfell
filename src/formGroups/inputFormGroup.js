import React from 'react';
import Tooltip from '../custom/tooltip';
import styled from 'styled-components';
import { Icon } from '../custom/icon';

const InputGroup = styled.div.attrs({ 'data-id': 'input-group' })`
  display: flex;
  align-items: stretch;
  width: 100%;
  border: 1px solid #7a8aa0;

  input {
    height: 38px;
    flex: 1 1 auto;
    margin-bottom: 0;
    border: none !important;
  }

  input[data-prefiled-data='true'] {
    border-right: none !important;
    background-color: #e7f2f9;
  }
`;

const InputGroupIcon = styled.div.attrs({ 'data-id': 'input-group-icon' })`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  background-color: ${({ active }) => (active ? '#e7f2f9' : 'inherit')};
  border-left: none;
`;

const IconInput = ({
  active,
  showIcon,
  showTooltip = true,
  onClick,
  tooltipContent,
  iconUrl,
  children,
}) => {
  return (
    <InputGroup>
      {children}
      {active || showIcon ? (
        <InputGroupIcon active={active}>
          {showTooltip ? (
            <Tooltip content={tooltipContent}>
              <Icon onClick={onClick} icon={iconUrl} />
            </Tooltip>
          ) : (
            <Icon icon={iconUrl} />
          )}
        </InputGroupIcon>
      ) : null}
    </InputGroup>
  );
};

export default IconInput;
