import "./style.css";
import * as THREE from "three";
import renderer from "./renderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Resize_Manager from "./resize";

/**
 * SCENE
 */

const scene = new THREE.Scene();

/**
 * CAMERA
 */

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.y = 5;
camera.position.z = 5;

/**
 * RESIZE
 */

Resize_Manager(camera, renderer);

/**
 * CONTROLS
 */

const orbitControl = new OrbitControls(camera, renderer.domElement);
orbitControl.enableDamping = true;

/**
 * FLOOR
 */

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshStandardMaterial({ color: "white", side: THREE.DoubleSide })
);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);

/**
 * LIGHT
 */

const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

/**
 * ANIMATION CONTROL
 */
function animate() {
    orbitControl.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
