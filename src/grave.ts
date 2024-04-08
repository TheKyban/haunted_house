import * as THREE from "three";
const graves = new THREE.Group();

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
    color: "#b2b6b1",
});

for (let i = 0; i < 50; i++) {
    // const angle = (Math.random() * (Math.PI * 3)) / 2 + Math.PI / 3;
    const angle = Math.random() * (Math.PI * 2);
    const radius = 3.3 + Math.random() * 5.5;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, 0.3, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.rotation.x = (Math.random() - 0.5) * 0.4;

    grave.castShadow = true;
    grave.receiveShadow = true;
    graves.add(grave);
}

export default graves;
