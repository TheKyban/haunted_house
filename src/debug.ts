import * as dat from "dat.gui";

/**
 * DEBUG
 */

export const isDubugON = window.location.pathname === "/debug";

export const gui = isDubugON && new dat.GUI();
