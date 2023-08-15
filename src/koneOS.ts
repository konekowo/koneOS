import * as PIXI from "pixi.js";
import { LoadScreen } from "./loadScreen";
import { SetupScreen } from "./GuiScreens/SetupScreen";
import { FileSystem } from "./FileSystem";
import { LockScreen } from "./GuiScreens/LockScreen";

export class koneOS {
    public devMode = false;
    constructor(app: PIXI.Application) {
        console.log("%cStarting koneOS!", "color:rgb(0,255,0);");
        const loadScreen = new LoadScreen(app);
        // load stuff

        setTimeout(async () => {
            loadScreen.loadDone();
            const isSetupDone = window.localStorage.getItem("isSetupDone");
            if (isSetupDone == "true") {
                new LockScreen(app);
            } else {
                new SetupScreen(app);
            }
        }, 0);
    }
}
