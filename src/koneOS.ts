/* eslint-disable prettier/prettier */

import * as PIXI from "pixi.js";
import { LoadScreen } from "./loadScreen";
import { SetupScreen } from "./GuiScreens/SetupScreen";
export class koneOS {
    public devMode = false;
    constructor(app: PIXI.Application) {
        console.log("%cStarting koneOS!", "color:rgb(0,255,0);");
        const loadScreen = new LoadScreen(app);
        // load stuff

        setTimeout(() => {
            loadScreen.loadDone();

            new SetupScreen(app);
        }, 1);
    }
}
