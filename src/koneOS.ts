import * as PIXI from "pixi.js";
import { LoadScreen } from "./loadScreen";
import { SetupScreen } from "./GuiScreens/SetupScreen";
import { FileSystem } from "./FileSystem";
import { LockScreen } from "./GuiScreens/LockScreen";

export class koneOS {
    public static devMode = true;
    public static pixiApp:PIXI.Application;
    constructor(app: PIXI.Application) {
        console.log("%cStarting koneOS!", "color:rgb(0,255,0);");
        koneOS.pixiApp = app;
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
        }, 1);
    }
}
