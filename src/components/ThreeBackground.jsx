import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 150;
const MOUSE_REPEL_RADIUS = 120;
const MOUSE_REPEL_STRENGTH = 0.04;

const ThreeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const width = mount.clientWidth;
        const height = mount.clientHeight;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 300;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // Particles
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = [];
        const colors = new Float32Array(PARTICLE_COUNT * 3);

        const blueColor = new THREE.Color(0x3b82f6);   // blue-500
        const purpleColor = new THREE.Color(0xa855f7); // purple-500
        const cyanColor = new THREE.Color(0x06b6d4);   // cyan-500

        const palette = [blueColor, purpleColor, cyanColor];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * width * 1.2;
            const y = (Math.random() - 0.5) * height * 1.2;
            const z = (Math.random() - 0.5) * 100;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            velocities.push({
                x: (Math.random() - 0.5) * 0.4,
                y: (Math.random() - 0.5) * 0.4,
            });

            const col = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMat = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        });

        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Lines geometry (updated each frame)
        const maxLines = PARTICLE_COUNT * PARTICLE_COUNT;
        const linePositions = new Float32Array(maxLines * 6);
        const lineColors = new Float32Array(maxLines * 6);
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        const lineMat = new THREE.LineSegments(
            lineGeo,
            new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 0.25,
            })
        );
        scene.add(lineMat);

        // Mouse tracking
        const mouse = { x: 9999, y: 9999 };
        const handleMouseMove = (e) => {
            const rect = mount.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left - width / 2);
            mouse.y = -(e.clientY - rect.top - height / 2);
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Resize
        const handleResize = () => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // Animation
        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            const pos = particleGeo.attributes.position.array;

            // Update positions
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                let px = pos[i * 3];
                let py = pos[i * 3 + 1];

                // Mouse repulsion
                const dx = px - mouse.x;
                const dy = py - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
                    const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS;
                    velocities[i].x += (dx / dist) * force * MOUSE_REPEL_STRENGTH;
                    velocities[i].y += (dy / dist) * force * MOUSE_REPEL_STRENGTH;
                }

                // Apply velocity with damping
                velocities[i].x *= 0.98;
                velocities[i].y *= 0.98;

                px += velocities[i].x;
                py += velocities[i].y;

                // Wrap around edges
                const halfW = width * 0.65;
                const halfH = height * 0.65;
                if (px > halfW) px = -halfW;
                if (px < -halfW) px = halfW;
                if (py > halfH) py = -halfH;
                if (py < -halfH) py = halfH;

                pos[i * 3] = px;
                pos[i * 3 + 1] = py;
            }
            particleGeo.attributes.position.needsUpdate = true;

            // Update connection lines
            let lineIdx = 0;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                    const ax = pos[i * 3], ay = pos[i * 3 + 1], az = pos[i * 3 + 2];
                    const bx = pos[j * 3], by = pos[j * 3 + 1], bz = pos[j * 3 + 2];

                    const dx = ax - bx;
                    const dy = ay - by;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    if (d < CONNECTION_DISTANCE) {
                        const alpha = 1 - d / CONNECTION_DISTANCE;

                        linePositions[lineIdx * 6] = ax;
                        linePositions[lineIdx * 6 + 1] = ay;
                        linePositions[lineIdx * 6 + 2] = az;
                        linePositions[lineIdx * 6 + 3] = bx;
                        linePositions[lineIdx * 6 + 4] = by;
                        linePositions[lineIdx * 6 + 5] = bz;

                        // Color fade with alpha
                        const cr = colors[i * 3] * alpha;
                        const cg = colors[i * 3 + 1] * alpha;
                        const cb = colors[i * 3 + 2] * alpha;
                        lineColors[lineIdx * 6] = cr;
                        lineColors[lineIdx * 6 + 1] = cg;
                        lineColors[lineIdx * 6 + 2] = cb;
                        lineColors[lineIdx * 6 + 3] = cr;
                        lineColors[lineIdx * 6 + 4] = cg;
                        lineColors[lineIdx * 6 + 5] = cb;

                        lineIdx++;
                    }
                }
            }

            lineGeo.setDrawRange(0, lineIdx * 2);
            lineGeo.attributes.position.needsUpdate = true;
            lineGeo.attributes.color.needsUpdate = true;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 w-full h-full z-0"
            style={{ pointerEvents: 'none' }}
        />
    );
};

export default ThreeBackground;
