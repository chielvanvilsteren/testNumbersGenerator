import React, { useEffect, useRef } from 'react';
// @ts-ignore
import { engine, createTimeline, utils } from 'animejs';
// @ts-ignore
import * as THREE from 'three';
import { useTheme } from 'styled-components';

interface AnimatedBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  cubeCount?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className,
  style,
  cubeCount = 40
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up previous canvas if any
    containerRef.current.innerHTML = '';

    // Set up container
    const $container = containerRef.current;
    $container.style.position = 'absolute';
    $container.style.top = '0';
    $container.style.left = '0';
    $container.style.width = '100%';
    $container.style.height = '100%';
    $container.style.overflow = 'hidden';
    $container.style.zIndex = '1'; // Ensure background stays behind other elements

    // Use the theme's surface color for the cubes
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

    // Create animated cubes
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
        defaults: { loop: true, duration, ease: 'inSine' },
      })
      .add(cube.position, { x, y, z }, 0)
      .add(cube.rotation, { x: r, y: r, z: r }, 0)
      .init();

      scene.add(cube);
    }

    for (let i = 0; i < cubeCount; i++) {
      createAnimatedCube();
    }

    function render() {
      engine.update();
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(render);

    // Handle resize
    const handleResize = () => {
      const { width, height } = $container.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.setAnimationLoop(null);
      renderer.dispose();
      if ($container) {
        $container.innerHTML = '';
      }
    };
  }, [theme.colors.surface, cubeCount]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        zIndex: 1,
        pointerEvents: 'none', // Prevent interference with login form
        ...style
      }}
    />
  );
};

export default AnimatedBackground;
