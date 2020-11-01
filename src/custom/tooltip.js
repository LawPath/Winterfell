import React from 'react';
import SimpleTooltip from 'react-simple-tooltip';

const tooltipContent = ({ content }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: content,
    }}
  ></span>
);
const Tooltip = ({ content, placement = 'bottom', children }) => {
  return (
    <SimpleTooltip
      content={tooltipContent({ content })}
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
