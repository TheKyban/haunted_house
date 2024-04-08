import * as THREE from "three";
import { gui, isDubugON } from "./debug";
import { GUI } from "dat.gui";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { loadingManager } from "./loadManager";

/**
 * TEXTURE LOADER
 */
const textureLoader = new THREE.TextureLoader(loadingManager);

/**
 * HOUSE
 */

const house = new THREE.Group();

/**
 * WALLS
 */

// TEXTURE
const BricksColorTexture = textureLoader.load("textures/bricks/color.jpg");
const BricksNormalTexture = textureLoader.load("textures/bricks/normal.jpg");
const BricksRoughnessTexture = textureLoader.load(
    "textures/bricks/roughness.jpg"
);
const BricksAmbientOcclusionTexture = textureLoader.load(
    "textures/bricks/ambientOcclusion.jpg"
);

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        color: "#ac8e82",
        normalMap: BricksNormalTexture,
        map: BricksColorTexture,
        roughnessMap: BricksRoughnessTexture,
        aoMap: BricksAmbientOcclusionTexture,
    })
);
walls.position.y = 1.25;
walls.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
house.add(walls);

/**
 * ROOF
 */
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({
        color: "#b35f45",
    })
);

roof.position.y = 3;
roof.rotation.y = Math.PI / 4;

house.add(roof);

/**
 * DOOR
 */

// TEXTURE
const Door_alpha_texture = textureLoader.load("textures/door/alpha.jpg");
const Door_ambientOcclusion_texture = textureLoader.load(
    "textures/door/ambientOcclusion.jpg"
);
const Door_color_texture = textureLoader.load("textures/door/color.jpg");
const Door_height_texture = textureLoader.load("textures/door/height.jpg");
const Door_metalness_texture = textureLoader.load(
    "textures/door/metalness.jpg"
);
const Door_normal_texture = textureLoader.load("textures/door/normal.jpg");
const Door_roughness_texture = textureLoader.load(
    "textures/door/roughness.jpg"
);

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1.3, 1.3, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: Door_alpha_texture,
        aoMap: Door_ambientOcclusion_texture,
        map: Door_color_texture,
        transparent: true,
        displacementMap: Door_height_texture,
        displacementScale: 0.1,
        normalMap: Door_normal_texture,
        metalnessMap: Door_metalness_texture,
        roughnessMap: Door_roughness_texture,
    })
);

door.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

door.position.y = 0.7;
door.position.z = 2.0001;

house.add(door);

/**
 * BUSHES
 */

// TEXTURE
const GrassColorTexture = textureLoader.load("textures/grass/color.jpg");
const GrassNormalTexture = textureLoader.load("textures/grass/normal.jpg");
const GrassRoughnessTexture = textureLoader.load(
    "textures/grass/roughness.jpg"
);
const GrassAmbientOcclusionTexture = textureLoader.load(
    "textures/grass/ambientOcclusion.jpg"
);

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
    color: "#89c854",
    normalMap: GrassNormalTexture,
    roughnessMap: GrassRoughnessTexture,
    aoMap: GrassAmbientOcclusionTexture,
    map: GrassColorTexture,
    transparent: true,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1, 0.2, 2.5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.5, 0.2, 2.3);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-1, 0.2, 2.5);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1.2, 0.1, 2.9);

bush1.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(bush1.geometry.attributes.uv.array, 2)
);
bush2.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(bush2.geometry.attributes.uv.array, 2)
);
bush3.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(bush3.geometry.attributes.uv.array, 2)
);
bush4.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(bush4.geometry.attributes.uv.array, 2)
);

house.add(bush1, bush2, bush3, bush4);

/**
 * DOOR LIGHT
 */

const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);

if (isDubugON) {
    (gui as GUI)
        .add(doorLight, "intensity")
        .min(0)
        .max(5)
        .step(0.001)
        .name("doorLight");
}

house.add(doorLight);

/**
 * SHADOWS
 */

// bushs
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

// walls
walls.castShadow = true;
// roofs
roof.castShadow = true;

// door light
doorLight.castShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

/**
 * TEXT
 */

const font = new FontLoader();
font.load("fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("Graveyard", {
        font: font,
        size: 0.2,
        height: 0.07,
    });
    textGeometry.center();

    const textMaterial = new THREE.MeshStandardMaterial({ color: "red" });

    const text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.z = 2;
    text.position.y = 2.1;
    house.add(text);
});

export default house;
