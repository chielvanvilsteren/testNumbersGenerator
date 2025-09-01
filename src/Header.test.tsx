import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />);
    expect(screen.getByAltText(/ready logo/i)).toBeInTheDocument();
  });

  it('renders the favicon', () => {
    render(<Header />);
    expect(screen.getByAltText(/favicon/i)).toBeInTheDocument();
  });

  it('renders all avatars', () => {
    render(<Header />);
    const avatars = screen.getAllByAltText('avatar');
    expect(avatars.length).toBeGreaterThanOrEqual(5);
  });
});

