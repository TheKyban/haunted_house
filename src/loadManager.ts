import * as THREE from "three";

export const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => {
    setTimeout(() => {
        (
            document.querySelector("#loaderContainer") as HTMLDivElement
        ).style.display = "none";
    }, 2500);
};
