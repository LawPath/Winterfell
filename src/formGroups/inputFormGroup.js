import React from 'react';
import Tooltip from '../custom/tooltip';

const IconInput = ({ children, active, onClick, tooltipContent }) => {
  return (
    <div className="input-group">
      {children}
      {active ? (
        <div class="input-group-append">
          <span class="input-group-text">
            <Tooltip onClick={onClick} content={tooltipContent}>
              <span className="prefill-icon"></span>
            </Tooltip>
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default IconInput;
