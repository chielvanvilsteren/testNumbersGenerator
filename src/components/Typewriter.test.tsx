import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import Typewriter from './Typewriter';

describe('Typewriter', () => {
  it('renders typewriter text', () => {
    jest.useFakeTimers();
    render(<Typewriter text="Hello" />);
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
    jest.useRealTimers();
  });
});
