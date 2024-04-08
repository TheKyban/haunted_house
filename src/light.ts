import * as THREE from "three";

// Ambient light
export const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.001);

// Directional light
export const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);

/**
 * SHADHOWS
 */
moonLight.castShadow = true;
