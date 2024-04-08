import * as THREE from "three";

/**
 * CANVAS
 */
const canvas = document.querySelector("canvas")!;

/**
 * RENDERER
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

export default renderer;
