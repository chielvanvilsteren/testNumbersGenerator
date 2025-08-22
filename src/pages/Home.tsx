import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { engine, createTimeline, utils } from 'animejs';
// @ts-ignore
import * as THREE from 'three';
import styled, { useTheme } from 'styled-components';

const PageBg = styled.div`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 48px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 1px;
  margin: 0;
  text-shadow: 0 4px 24px rgba(30,59,76,0.12);
`;

const HeroSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 22px;
  font-weight: 400;
  max-width: 700px;
  margin: 16px auto 0 auto;
  text-shadow: 0 2px 12px rgba(30,59,76,0.10);
  font-family: 'JetBrains Mono', monospace;
`;

const BlinkingCursor = styled.span`
  display: inline-block;
  width: 1ch;
  margin-left: 0.2ch;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 400;
  animation: blink 1s steps(1) infinite;
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

// UI Button CSS styles
const UIButtonStyles = `
  /* From Uiverse.io by Galahhad */ 
  .ui-btn {
    --btn-default-bg: rgb(41, 41, 41);
    --btn-padding: 15px 20px;
    --btn-hover-bg: rgb(51, 51, 51);
    --btn-transition: .3s;
    --btn-letter-spacing: .1rem;
    --btn-animation-duration: 1.2s;
    --btn-shadow-color: rgba(0, 0, 0, 0.137);
    --btn-shadow: 0 2px 10px 0 var(--btn-shadow-color);
    --hover-btn-color: #FAC921;
    --default-btn-color: #fff;
    --font-size: 16px;
    --font-weight: 600;
    --font-family: Menlo,Roboto Mono,monospace;
  }

  .ui-btn {
    box-sizing: border-box;
    padding: var(--btn-padding);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--default-btn-color);
    font: var(--font-weight) var(--font-size) var(--font-family);
    background: var(--btn-default-bg);
    border: none;
    cursor: pointer;
    transition: var(--btn-transition);
    overflow: hidden;
    box-shadow: var(--btn-shadow);
  }

  .ui-btn span {
    letter-spacing: var(--btn-letter-spacing);
    transition: var(--btn-transition);
    box-sizing: border-box;
    position: relative;
    background: inherit;
  }

  .ui-btn:hover, .ui-btn:focus {
    background: var(--btn-hover-bg);
  }

  .ui-btn:hover span, .ui-btn:focus span {
    color: var(--hover-btn-color);
  }

  .char {
    display: inline-block;
    position: relative;
    transition: all 0.1s ease;
  }

  .char.animating {
    color: var(--hover-btn-color);
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    // Add the CSS styles to the document
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = UIButtonStyles;
    document.head.appendChild(styleSheet);

    // Cleanup styles when component unmounts
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    // Clean up previous canvas if any
    heroRef.current.innerHTML = '';
    // Set up container
    const $container = heroRef.current;
    $container.style.position = 'relative';
    $container.style.overflow = 'hidden';
    $container.style.width = '100%';
    $container.style.height = '100%';
    // Use the theme's surface color (bruinige kleur) for the cubes
    const color = new THREE.Color(theme.colors.surface);
    const { width, height } = $container.getBoundingClientRect();
    // Three.js setup
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    $container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 20);
    camera.position.z = 5;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // Make sure each cube gets its own material instance with the correct color
    function createAnimatedCube() {
      const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
      const cube = new THREE.Mesh(geometry, material);
      const x = utils.random(-10, 10, 2);
      const y = utils.random(-5, 5, 2);
      const z = [-10, 7];
      const r = () => utils.random(-Math.PI * 2, Math.PI * 2, 3);
      const duration = 4000;
      createTimeline({
        delay: utils.random(0, duration),
        defaults: { loop: true, duration, ease: 'inSine', },
      })
      .add(cube.position, { x, y, z }, 0)
      .add(cube.rotation, { x: r, y: r, z: r }, 0)
      .init();
      scene.add(cube);
    }
    for (let i = 0; i < 40; i++) {
      createAnimatedCube();
    }
    function render() {
      engine.update();
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(render);
    // Cleanup
    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
      $container.innerHTML = '';
    };
  }, [theme.colors.surface]);

  // Function to wrap text in span elements for character animation
  const wrapTextInChars = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char" data-original={char}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // Function to animate characters
  const animateChars = (buttonElement: HTMLButtonElement) => {
    const chars = buttonElement.querySelectorAll('.char') as NodeListOf<HTMLSpanElement>;
    const symbols = ['#', '@', '№', '{', '}', '?', '!', '^', '~', '%', '|', '&', '*', '$', '>', '4', '2'];

    chars.forEach((char, index) => {
      const originalChar = char.getAttribute('data-original') || char.textContent || '';
      char.classList.add('animating');

      let animationStep = 0;
      const maxSteps = 8 + Math.random() * 4; // Varieer de animatieduur per karakter

      const interval = setInterval(() => {
        if (animationStep < maxSteps) {
          // Toon random symbool
          char.textContent = symbols[Math.floor(Math.random() * symbols.length)];
          animationStep++;
        } else {
          // Terug naar originele karakter
          char.textContent = originalChar === ' ' ? '\u00A0' : originalChar;
          char.classList.remove('animating');
          clearInterval(interval);
        }
      }, 80 + index * 20); // Stagger de animatie per karakter
    });
  };

  return (
    <PageBg>
      {/* Hero Section with animated cubes and text in front */}
      <section style={{ position: 'relative', width: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', height: '60vh', minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0 }}>
        <div ref={heroRef} style={{ position: 'absolute', width: '100vw', height: '100%', left: 0, top: 0, zIndex: 1 }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          textAlign: 'center',
          pointerEvents: 'none',
          width: '100vw',
        }}>
          <HeroTitle>
            Test Numbers Generator
            <BlinkingCursor>|</BlinkingCursor>
          </HeroTitle>
          <HeroSubtitle>Genereer eenvoudig unieke testnummers voor jouw testautomatisering.</HeroSubtitle>
        </div>
      </section>
      {/* Knoppen onder de hero, gecentreerd naast elkaar */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, marginTop: 48 }}>
        <button
          className="ui-btn"
          onClick={() => navigate('/generators')}
          onMouseEnter={(e) => {
            animateChars(e.currentTarget as HTMLButtonElement);
          }}
        >
          <span>
            {wrapTextInChars("Start Genereren")}
          </span>
        </button>
        <button
          className="ui-btn"
          onClick={() => navigate('/npm')}
          onMouseEnter={(e) => {
            animateChars(e.currentTarget as HTMLButtonElement);
          }}
        >
          <span>
            {wrapTextInChars("Bekijk NPM info")}
          </span>
        </button>
      </div>
    </PageBg>
  );
};

export default Home;
