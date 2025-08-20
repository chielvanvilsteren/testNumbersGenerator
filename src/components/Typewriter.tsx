import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
}

const Typewriter: React.FC<TypewriterProps> = ({ text = '', speed = 40 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!text) {
      setDisplayed('');
      return;
    }
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
};

export default Typewriter;
