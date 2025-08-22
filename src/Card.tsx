import React, { useState } from 'react';
import styled, { useTheme, keyframes } from 'styled-components';

type CardProps = {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
};

// Animations from Uiverse.io
const pressAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.92);
  }
  to {
    transform: scale(1);
  }
`;

const bounceAnimation = keyframes`
  50% {
    transform: rotate(5deg) translate(20px, -50px);
  }
  to {
    transform: scale(0.9) rotate(10deg) translate(50px, -80px);
    opacity: 0;
  }
`;

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px 0 rgba(30, 59, 76, 0.08);
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 260px;
  min-height: 120px;
  margin: 0.5rem;
  position: relative;
`;

const Value = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textOnSurface};
  word-break: break-all;
  flex: 1;
  margin-right: 1rem;
`;

const CopyIconContainer = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px 0 rgba(30, 59, 76, 0.15);
  }

  &:active {
    animation: ${pressAnimation} 0.2s 1 linear;
  }

  &:active svg:last-child {
    animation: ${bounceAnimation} 0.2s 1 linear;
  }

  svg {
    width: 18px;
    height: auto;
  }

  svg:last-child {
    position: absolute;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.primary};
  }

  svg path:nth-child(2) {
    fill: ${({ theme }) => theme.colors.secondary};
  }

  svg path:last-child {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const Tooltip = styled.div<{ show: boolean }>`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transition: opacity 0.2s, visibility 0.2s;
  pointer-events: none;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Card: React.FC<CardProps> = ({ label, value, onCopy, copied }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <CardContainer>
      <Value>{value}</Value>
      <CopyIconContainer
        onClick={onCopy}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Tooltip show={showTooltip && !copied}>
          Kopieer naar klembord
        </Tooltip>
        <Tooltip show={copied}>
          Gekopieerd!
        </Tooltip>
        <svg
          width="19px"
          height="21px"
          viewBox="0 0 19 21"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <title>Group</title>
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g id="Artboard" transform="translate(-142.000000, -122.000000)">
              <g id="Group" transform="translate(142.000000, 122.000000)">
                <path
                  d="M3.4,4 L11.5,4 L11.5,4 L16,8.25 L16,17.6 C16,19.4777681 14.4777681,21 12.6,21 L3.4,21 C1.52223185,21 6.74049485e-16,19.4777681 0,17.6 L0,7.4 C2.14128934e-16,5.52223185 1.52223185,4 3.4,4 Z"
                  id="Rectangle-Copy"
                  fill="#C4FFE4"
                ></path>
                <path
                  d="M6.4,0 L12,0 L12,0 L19,6.5 L19,14.6 C19,16.4777681 17.4777681,18 15.6,18 L6.4,18 C4.52223185,18 3,16.4777681 3,14.6 L3,3.4 C3,1.52223185 4.52223185,7.89029623e-16 6.4,0 Z"
                  id="Rectangle"
                  fill="#85EBBC"
                ></path>
                <path
                  d="M12,0 L12,5.5 C12,6.05228475 12.4477153,6.5 13,6.5 L19,6.5 L19,6.5 L12,0 Z"
                  id="Path-2"
                  fill="#64B18D"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        <svg
          width="19px"
          height="21px"
          viewBox="0 0 19 21"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <title>Group</title>
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g id="Artboard" transform="translate(-142.000000, -122.000000)">
              <g id="Group" transform="translate(142.000000, 122.000000)">
                <path
                  d="M3.4,4 L11.5,4 L11.5,4 L16,8.25 L16,17.6 C16,19.4777681 14.4777681,21 12.6,21 L3.4,21 C1.52223185,21 6.74049485e-16,19.4777681 0,17.6 L0,7.4 C2.14128934e-16,5.52223185 1.52223185,4 3.4,4 Z"
                  id="Rectangle-Copy"
                  fill="#C4FFE4"
                ></path>
                <path
                  d="M6.4,0 L12,0 L12,0 L19,6.5 L19,14.6 C19,16.4777681 17.4777681,18 15.6,18 L6.4,18 C4.52223185,18 3,16.4777681 3,14.6 L3,3.4 C3,1.52223185 4.52223185,7.89029623e-16 6.4,0 Z"
                  id="Rectangle"
                  fill="#85EBBC"
                ></path>
                <path
                  d="M12,0 L12,5.5 C12,6.05228475 12.4477153,6.5 13,6.5 L19,6.5 L19,6.5 L12,0 Z"
                  id="Path-2"
                  fill="#64B18D"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </CopyIconContainer>
    </CardContainer>
  );
};

export default Card;
