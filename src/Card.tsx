import React from 'react';
import styled, { useTheme } from 'styled-components';

type CardProps = {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
};

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px 0 rgba(30, 59, 76, 0.08); /* fallback shadow in lijn met primary kleur */
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 260px;
  min-height: 120px;
  margin: 0.5rem;
`;

const Value = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textOnSurface};
  margin-bottom: 1.2rem;
  word-break: break-all;
`;

const CopyBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  border-radius: 0.75rem;
  padding: 0.7rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  outline: none;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Card: React.FC<CardProps> = ({ label, value, onCopy, copied }) => {
  useTheme(); // ensures theme is available
  return (
    <CardContainer>
      <Value>{value}</Value>
      <CopyBtn onClick={onCopy}>
        {copied ? 'Copied!' : `Kopieer ${label} naar klembord`}
      </CopyBtn>
    </CardContainer>
  );
};

export default Card;
