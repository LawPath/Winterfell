import React from 'react';
import SimpleTooltip from 'react-simple-tooltip';

const DefaultTooltipContent = () => (
  <span>
    This field has been <br />
    pre-filled. Click <a>here</a> to edit <br /> your pre-filled information
  </span>
);

const Tooltip = ({ content: TooltipContent, placement = 'bottom', children }) => {
  return (
    <SimpleTooltip
      content={TooltipContent ? <TooltipContent /> : <DefaultTooltipContent />}
      placement={placement}
      color="#000"
      padding={10}
      fontSize="12px"
      border="#FFEABC"
      radius={3}
      background="#FFEABC"
      style={{ whiteSpace: 'nowrap', textAlign: 'center' }}
    >
      {children}
    </SimpleTooltip>
  );
};
export default Tooltip;
