import * as THREE from "three";
export default function Resize_Manager(
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
) {
    window.addEventListener("resize", () => {
        /**
         * UPDATE CAMERA
         */
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        /**
         * UPDATE RENDERER
         */
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}
