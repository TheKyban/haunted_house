import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Resize_Manager from "./resize";
import renderer from "./renderer";
import graves from "./grave";
import house from "./house";
import { GUI } from "dat.gui";
import { gui, isDubugON } from "./debug";

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

/**
 * FLOOR
 */

/**
 * TEXTURE LOADER
 */
const textureLoader = new THREE.TextureLoader();

// TEXTURE
const GrassColorTexture = textureLoader.load("textures/grass/color.jpg");
const GrassNormalTexture = textureLoader.load("textures/grass/normal.jpg");
const GrassRoughnessTexture = textureLoader.load(
    "textures/grass/roughness.jpg"
);
const GrassAmbientOcclusionTexture = textureLoader.load(
    "textures/grass/ambientOcclusion.jpg"
);
GrassColorTexture.repeat.set(8, 8);
GrassAmbientOcclusionTexture.repeat.set(8, 8);
GrassNormalTexture.repeat.set(8, 8);
GrassRoughnessTexture.repeat.set(8, 8);

GrassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
GrassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;

GrassColorTexture.wrapS = THREE.RepeatWrapping;
GrassColorTexture.wrapT = THREE.RepeatWrapping;

GrassNormalTexture.wrapS = THREE.RepeatWrapping;
GrassNormalTexture.wrapT = THREE.RepeatWrapping;

GrassRoughnessTexture.wrapS = THREE.RepeatWrapping;
GrassRoughnessTexture.wrapT = THREE.RepeatWrapping;

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        color: "#a9c388",
        normalMap: GrassNormalTexture,
        roughnessMap: GrassRoughnessTexture,
        aoMap: GrassAmbientOcclusionTexture,
        map: GrassColorTexture,
        transparent: true,
    })
);
floor.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * HOUSE
 */
scene.add(house);

/**
 * GRAVE
 */
scene.add(graves);

/**
 * FOG
 */

const fog = new THREE.Fog("#262837", 2, 6);
scene.fog = fog;

/**
 * LIGHTS
 */

// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);
scene.add(moonLight);

if (isDubugON) {
    (gui as GUI)
        .add(ambientLight, "intensity")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("ambientLight");
    (gui as GUI)
        .add(moonLight, "intensity")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("directionalLight");
    (gui as GUI)
        .add(moonLight.position, "x")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("directionalLight x");
    (gui as GUI)
        .add(moonLight.position, "y")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("directionalLight y");
    (gui as GUI)
        .add(moonLight.position, "z")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("directionalLight z");
}

/**
 * Animate
 */
// const clock = new THREE.Clock();

const animation = () => {
    // const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call animation again on the next frame
    window.requestAnimationFrame(animation);
};

animation();
