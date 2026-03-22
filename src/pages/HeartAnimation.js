import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import './HeartAnimation.css';

function HeartAnimation() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // CONTROLS
    const controlsWebGL = new OrbitControls(camera, renderer.domElement);
    controlsWebGL.autoRotate = true;
    controlsWebGL.autoRotateSpeed = 2;

    // CREATE SVG PATH AND EXTRACT VERTICES
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 600 552');
    svg.setAttribute('width', '600');
    svg.setAttribute('height', '552');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M300,107.77C284.68,55.67,239.76,0,162.31,0,64.83,0,0,82.08,0,171.71c0,.48,0,.95,0,1.43-.52,19.5,0,217.94,299.87,379.69v0l0,0,.05,0,0,0,0,0v0C600,391.08,600.48,192.64,600,173.14c0-.48,0-1,0-1.43,0-89.63-64.83-171.71-162.31-171.71C360.24,0,315.32,55.67,300,107.77Z');
    
    svg.appendChild(path);
    svg.style.position = 'absolute';
    svg.style.display = 'block';
    svg.style.width = '0';
    svg.style.height = '0';
    svg.style.visibility = 'hidden';
    document.body.appendChild(svg);

    // Wait for SVG to be rendered before accessing path methods
    const vertices = [];
    
    try {
      const length = path.getTotalLength();
      for (let i = 0; i < length; i += 0.2) {
        const point = path.getPointAt(i / length);
        vertices.push(
          new THREE.Vector3(point.x - 300, point.y - 276, 0)
        );
      }
    } catch (e) {
      console.warn('SVG path calculation failed, using fallback vertices');
      // Fallback: generate heart shape programmatically
      for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
        const x = 16 * Math.pow(Math.sin(angle), 3);
        const y = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle);
        vertices.push(new THREE.Vector3(x * 10, y * 10, 0));
      }
    }

    // Create a group to hold particles for rotation
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    // PARTICLES
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(vertices);

    const material = new THREE.PointsMaterial({
      color: 0xff69b4,
      size: 3,
      sizeAttenuation: true
    });

    const particlesData = [];
    vertices.forEach((vertex) => {
      // Create more depth with stronger Z-axis offset
      const offsetX = (Math.random() - 0.5) * 200;
      const offsetY = (Math.random() - 0.5) * 200;
      const offsetZ = (Math.random() - 0.5) * 300; // Stronger Z depth

      particlesData.push({
        originalPos: vertex.clone(),
        randomPos: new THREE.Vector3(
          vertex.x + offsetX,
          vertex.y + offsetY,
          vertex.z + offsetZ
        )
      });
    });
    
    // Add extra particles at different depths for 3D effect
    vertices.forEach((vertex) => {
      const offsetX = (Math.random() - 0.5) * 250;
      const offsetY = (Math.random() - 0.5) * 250;
      const offsetZ = (Math.random() - 0.5) * 400;

      particlesData.push({
        originalPos: vertex.clone(),
        randomPos: new THREE.Vector3(
          vertex.x + offsetX,
          vertex.y + offsetY,
          vertex.z + offsetZ
        )
      });
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(
      new Float32Array(vertices.flatMap(v => [v.x, v.y, v.z])),
      3
    ));

    const particles = new THREE.Points(geometry, material);
    particleGroup.add(particles);

    const positionAttribute = geometry.getAttribute('position');

    // Add heart STAY for 2 seconds, then dissolve
    particlesData.forEach((data, index) => {
      tl.to(positionAttribute.array, {
        [index * 3]: data.randomPos.x,
        [index * 3 + 1]: data.randomPos.y,
        [index * 3 + 2]: data.randomPos.z,
        duration: 1.5
      }, 2); // Start after 2 seconds
    });

    function animateParticles() {
      // Rotate the heart continuously - only horizontal (Y-axis)
      particleGroup.rotation.y += 0.005;

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // HANDLE RESIZE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      if (svg.parentNode) {
        svg.parentNode.removeChild(svg);
      }
    };
  }, []);

  return (
    <div className="heart-animation" ref={containerRef}>
      <button className="back-link" onClick={() => navigate('/')}>
        ← Go Back
      </button>
      <a href="https://kahoot.it/challenge/08887651?challenge-id=d2db5aa2-7026-44d7-ad07-ed2c4610ee58_1774208263192" target="_blank" rel="noopener noreferrer" className="secret-gift-link">
        Secret gift 🎁
      </a>
    </div>
  );
}

export default HeartAnimation;
