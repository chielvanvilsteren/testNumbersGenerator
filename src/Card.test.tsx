import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Card from './Card';
import { theme } from './theme';

describe('Card', () => {
  const defaultProps = {
    label: 'adres',
    value: 'Teststraat 1',
    onCopy: jest.fn(),
    copied: false,
  };

  it('renders value and copy button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Card {...defaultProps} />
      </ThemeProvider>
    );
    expect(screen.getByText('Teststraat 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /kopieer adres/i })).toBeInTheDocument();
  });

  it('shows "Copied!" when copied is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Card {...defaultProps} copied={true} />
      </ThemeProvider>
    );
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('calls onCopy when button is clicked', () => {
    const onCopy = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Card {...defaultProps} onCopy={onCopy} />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onCopy).toHaveBeenCalled();
  });
});
