"use client";

import React, { useEffect, useRef } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { gsap } from "gsap";

const FONT_URL =
  "https://excollo.github.io/Outfit-Font-Strong/Outfit_ExtraBold_Regular.json";

const ThreeDE = ({ textSize }) => {
  const mountRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const WIDTH = mountRef.current.offsetWidth || 300;
    const HEIGHT = mountRef.current.offsetHeight || 600;

    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const fontLoader = new FontLoader();
    fontLoader.load(
      FONT_URL,
      (font) => {
        const textGeometry = new TextGeometry("e", {
          font,
          size: Number(textSize),
          height: 2,
          bevelEnabled: true,
          bevelThickness: 3,
          bevelSize: 0.05,
          bevelSegments: 5,
        });
        textGeometry.center();
        textGeometry.computeBoundingBox();
        const bbox = textGeometry.boundingBox;
        const size = new THREE.Vector3();
        bbox.getSize(size);

        const uvAttribute = textGeometry.getAttribute("position");
        const uvArray = new Float32Array(uvAttribute.count * 2);

        for (let i = 0; i < uvAttribute.count; i++) {
          const x = uvAttribute.getX(i);
          const y = uvAttribute.getY(i);

          uvArray[i * 2] = (x - bbox.min.x) / size.x;
          uvArray[i * 2 + 1] = (y - bbox.min.y) / size.y;
        }

        textGeometry.setAttribute("uv", new THREE.BufferAttribute(uvArray, 2));

        const shaderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            color1: { value: new THREE.Color(0x3283b8) },
            color2: { value: new THREE.Color(0x805bb2) },
            color3: { value: new THREE.Color(0xa97fea) },
            gradientSplit: { value: 1.1 },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            uniform vec3 color3;
            uniform float gradientSplit;

            varying vec2 vUv;

            void main() {
              vec3 gradientColor;
              if (vUv.x < gradientSplit) {
                float t = vUv.x / gradientSplit;
                gradientColor = mix(color1, color3, t);
              } else {
                float t = (vUv.x - gradientSplit) / (1.0 - gradientSplit);
                gradientColor = mix(color2, color3, t);
              }
              gl_FragColor = vec4(gradientColor, 1.0);
            }
          `,
        });

        const textMesh = new THREE.Mesh(textGeometry, shaderMaterial);
        textRef.current = textMesh;
        scene.add(textMesh);

        const animate = () => {
          requestAnimationFrame(animate);
          textMesh.rotation.y += 0.02;
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => console.error("Error loading font:", error)
    );

    const handleResize = () => {
      if (!mountRef.current) return;

      const newWidth = mountRef.current.offsetWidth;
      const newHeight = mountRef.current.offsetHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (renderer) {
        renderer.dispose();
      }

      if (scene) {
        while (scene.children.length > 0) {
          const child = scene.children[0];
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
          scene.remove(child);
        }
      }

      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }
    };
  }, [textSize]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        minWidth: "200px",
        minHeight: "200px",
        maxWidth: "100vh",
        maxHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default ThreeDE;
