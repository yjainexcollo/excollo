import React,{useRef} from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Model = () => {
  const { scene } = useGLTF("/models/eLogo.glb");
  const modelRef = useRef(); 

  const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(0xfff) },
      color2: { value: new THREE.Color(0xfff) },
    },
    vertexShader: `
      varying vec3 vPosition;

void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

    `,
    fragmentShader: `
      uniform vec3 color1;
uniform vec3 color2;
varying vec3 vPosition; // Get actual world position

void main() {
    // Define a threshold where the 'e' exists
    float threshold = 0.05; // Adjust based on model details

    // Check if inside 'e' (you might need to fine-tune this based on position)
    if (abs(vPosition.x) < threshold && abs(vPosition.y) < threshold) {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Make 'e' black or unchanged
    } else {
        // Apply gradient only to the outer leaf part
        float t = (vPosition.y + 1.0) / 2.0;
        vec3 gradientColor = mix(color2, color1, t);
        gl_FragColor = vec4(gradientColor, 1.0);
    }
}
    `,
  });

  scene.traverse((child) => {
    if (child.isMesh) {
      const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      child.material = gradientMaterial;
      
      const edges = new THREE.EdgesGeometry(child.geometry);
      const edgeLines = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x000, linewidth: 10 })
      );

      child.add(edgeLines);
      child.add(edgeLines);
    }
  });



  return (
    <Canvas
      camera={{ position: [0, 30, 5], fov: 100 }}
      style={{ width: "100%", height: "100vh" }}
    >
      <OrbitControls />
      <group ref={modelRef} scale={[0.3, 0.3, 0.3]}>
        <primitive object={scene} />
      </group>
    </Canvas>
  );
};

// Preload GLTF model
useGLTF.preload("/models/eLogo.glb");

export default Model;
