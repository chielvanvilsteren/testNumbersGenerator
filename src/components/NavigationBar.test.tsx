import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  it('renders navigation links', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <NavigationBar />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
