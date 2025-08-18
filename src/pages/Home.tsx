import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { engine, createTimeline, utils } from 'animejs';
// @ts-ignore
import * as THREE from 'three';

const accent = '#2563eb';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

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
    const color = '#2563eb';
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
    const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
    function createAnimatedCube() {
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
  }, []);

  return (
    <div style={{ background: '#F8F8F8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
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
          <h1 style={{
            color: '#1e293b', // Donkerblauwe kleur
            fontSize: 48,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: 1,
            margin: 0,
            textShadow: '0 4px 24px rgba(0,0,0,0.12)',
            pointerEvents: 'auto',
          }}>
            Test Numbers Generator
          </h1>
          <p style={{
            color: '#1e293b',
            fontSize: 22,
            fontWeight: 400,
            maxWidth: 700,
            margin: '16px auto 0 auto',
            textShadow: '0 2px 12px rgba(0,0,0,0.10)',
            fontFamily: 'JetBrains Mono, monospace',
            pointerEvents: 'auto',
          }}>
            Genereer eenvoudig unieke testnummers voor jouw testautomatisering.
          </p>
        </div>
      </section>
      {/* Knoppen onder de hero, gecentreerd naast elkaar */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, marginTop: 48 }}>
        <button
          style={{
            background: `linear-gradient(90deg, ${accent} 0%, #4f8cff 100%)`,
            color: '#fff',
            border: 'none',
            borderRadius: 32,
            padding: '18px 48px',
            fontSize: 22,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 24px 0 rgba(37,99,235,0.12)',
            transition: 'transform 0.18s, box-shadow 0.18s',
          }}
          onClick={() => navigate('/generators')}
          onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px 0 rgba(37,99,235,0.18)'; }}
          onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px 0 rgba(37,99,235,0.12)'; }}
        >
          Genereer testnummers via de website
        </button>
        <button
          style={{
            background: '#fff',
            color: accent,
            border: `2px solid ${accent}`,
            borderRadius: 32,
            padding: '16px 44px',
            fontSize: 20,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 12px 0 rgba(37,99,235,0.08)',
            transition: 'background 0.18s, color 0.18s',
          }}
          onClick={() => navigate('/npm')}
          onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = accent; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
          onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = accent; }}
        >
          Implementeer in testautomatisering
        </button>
      </div>
    </div>
  );
};

export default Home;
