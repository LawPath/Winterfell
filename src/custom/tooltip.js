import React from 'react';
import SimpleTooltip from 'react-simple-tooltip';
import { css } from 'styled-components';

const DefaultTooltipContent = () => (
  <span>
    This field has been <br />
    pre-filled. Click <a>here</a> to edit <br /> your pre-filled information
  </span>
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
        div[class$='BaseToolTop'] {
          left: unset;
          right: 0;
          transform: translateX(5%);
        }
        div[class$='BaseArrow'] {
          left: unset;
          ${arrowStyle}
        }
      `}
      style={{ whiteSpace: 'nowrap', textAlign: 'center' }}
    >
      {children}
    </SimpleTooltip>
  );
};
export default Tooltip;
