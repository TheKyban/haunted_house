import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Resize_Manager from "./resize";
import renderer from "./renderer";
import graves from "./grave";
import house from "./house";
import { ghost1, ghost2, ghost3 } from "./ghost";
import { ambientLight, moonLight } from "./light";
import { floor } from "./floor";

/**
 * CANVAS
 */
const canvas = document.querySelector("canvas")!;

/**
 * SCENE
 */
const scene = new THREE.Scene();

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(0, 2, 5);
scene.add(camera);

/**
 * CONTROL
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * RESIZE MANAGER
 */

Resize_Manager(camera, renderer);

scene.add(floor);

/**
 * HOUSE
 */
scene.add(house);

/**
 * GHOST
 */

scene.add(ghost1, ghost2, ghost3);

/**
 * GRAVE
 */
scene.add(graves);

/**
 * FOG
 */

const fog = new THREE.Fog("#262837", 2, 7);
scene.fog = fog;

/**
 * LIGHTS
 */

scene.add(ambientLight);
scene.add(moonLight);

/**
 * Animate
 */
const clock = new THREE.Clock();

const animation = () => {
    const elapsedTime = clock.getElapsedTime();

    // update ghosts
    const ghostAngle = elapsedTime;

    ghost1.position.x = Math.sin(ghostAngle) * 4;
    ghost1.position.z = Math.cos(ghostAngle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    ghost2.position.x = -Math.sin(ghostAngle) * 5.3;
    ghost2.position.z = Math.cos(ghostAngle) * 5.3;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 3);

    ghost3.position.x = Math.sin(ghostAngle) * 6;
    ghost3.position.z = -Math.cos(ghostAngle) * 6;
    ghost3.position.y = -Math.sin(elapsedTime * 2) + Math.sin(elapsedTime * 2);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call animation again on the next frame
    window.requestAnimationFrame(animation);
};

animation();

/**
 * LOADING
 */

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        (
            document.querySelector("#loaderContainer") as HTMLDivElement
        ).style.display = "none";
    }, 2500);
});
