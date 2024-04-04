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

renderer.setSize(window.innerWidth, window.innerHeight);

export default renderer;
