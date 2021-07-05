import React from 'react';
import styled from 'styled-components';

const Background = styled.div.attrs({ 'data-id': 'progress-bar-background' })`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ hasCollaboration }) => (hasCollaboration ? '#00c08b' : '#0075bf')};
  color: #f6f7f9;
`;

const Foreground = styled.div.attrs({ 'data-id': 'progress-bar-foreground' })`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #f6f7f9;
  color: #000;
  clip-path: inset(0 0 0 ${({ progress }) => progress}%);
  transition: clip-path 1s ease-in-out;
`;

const ProgressBarWrapper = styled.div.attrs({ 'data-id': 'progress-bar' })`
  position: relative;
  display: flex;
  height: 30px;
  font-size: 13px;
  line-height: 30px;
  overflow: hidden;
  font-weight: bold;
`;

const ProgressBar = ({ progress, text, hasCollaboration }) => {
  return (
    <ProgressBarWrapper>
      <Background hasCollaboration={hasCollaboration}>{text}</Background>
      <Foreground progress={progress}>{text}</Foreground>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
