import * as THREE from "three";

/**
 * TEXTURE LOADER
 */
const textureLoader = new THREE.TextureLoader();

/**
 * FLOOR
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

export const floor = new THREE.Mesh(
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

/**
 * SHADHOWS
 */

floor.receiveShadow = true;
