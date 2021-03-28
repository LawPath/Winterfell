import React from 'react';
import styled from 'styled-components';

const builderIconUrl = 'https://assets.lawpath.com/images/svg/editor/builder.svg';

export const Icon = styled.div.attrs({ data: 'input-icon' })`
  display: block;
  width: 20px;
  height: 20px;
  background: url(${({ icon }) => icon || builderIconUrl}) 0 0/100% 100% no-repeat;
  background-position: center;
  cursor: ${({ showingPointer }) => (showingPointer ? 'pointer' : 'initial')};
`;
