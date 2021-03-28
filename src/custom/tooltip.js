import React from 'react';
import SimpleTooltip from 'react-simple-tooltip';
import styled, { css } from 'styled-components';

const TooltipContent = styled.span.attrs({ 'data-id': 'tooltip-content' })``;

const DefaultTooltipContent = () => (
  <TooltipContent>
    This is a pre-fillable field. <br />
    Click <a>here</a> to edit <br /> your pre-filled information
  </TooltipContent>
);

const arrowDefaultStyle = `
    right: 10px;
`;

const Tooltip = ({
  content: TooltipContent = DefaultTooltipContent,
  placement = 'bottom',
  children,
  arrowStyle = arrowDefaultStyle,
}) => {
  return (
    <SimpleTooltip
      content={typeof TooltipContent === 'string' ? TooltipContent : <TooltipContent />}
      placement={placement}
      color="#000"
      padding={10}
      fontSize="12px"
      border="#FFEABC"
      radius={3}
      background="#FFEABC"
      customCss={css`
        /*Class selector does not work on production. Using position selector to query */
        > :nth-child(2) {
          left: unset;
          right: 0;
          transform: translateX(5%);

          > :first-child > :first-child {
            left: unset;
            ${arrowStyle}
          }
        }
      `}
      style={{ whiteSpace: 'nowrap', textAlign: 'center' }}
    >
      {children}
    </SimpleTooltip>
  );
};
export default Tooltip;
