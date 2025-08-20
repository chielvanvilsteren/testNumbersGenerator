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

const MainButton = styled.button`
  background: ${({ theme }) => `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 32px;
  padding: 18px 48px;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 24px 0 rgba(30,59,76,0.12);
  font-family: 'JetBrains Mono', monospace;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.surface};
  }
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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

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
        <MainButton
          onClick={() => navigate('/generators')}
        >
          Start Genereren
        </MainButton>
        <MainButton
          onClick={() => navigate('/npm')}
        >
          Bekijk NPM info
        </MainButton>
      </div>
    </PageBg>
  );
};

export default Home;
