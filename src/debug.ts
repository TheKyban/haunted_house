import * as dat from "dat.gui";
import { GUI } from "dat.gui";
import { ambientLight, moonLight } from "./light";

/**
 * DEBUG
 */

export const isDubugON = window.location.pathname === "/debug";

export const gui = isDubugON && new dat.GUI();

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
