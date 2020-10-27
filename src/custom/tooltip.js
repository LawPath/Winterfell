import React from 'react';
import SimpleTooltip from 'react-simple-tooltip';

const tooltipContent = ({ content }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: content,
    }}
  ></span>
);
const Tooltip = ({ content, icon, onClick }) => {
  return (
    <SimpleTooltip
      content={tooltipContent({ content })}
      placement="bottom"
      color="#000"
      padding={10}
      fontSize="12px"
      border="#FFEABC"
      radius={3}
      background="#FFEABC"
    >
      <img onClick={onClick} src={icon} />
    </SimpleTooltip>
  );
};
export default Tooltip;
