import * as PIXI from "pixi.js";
import { LoadScreen } from "./loadScreen";

export class koneOS {

    public devMode: boolean = false;

    constructor(app: PIXI.Application) {

        console.log("%cStarting koneOS!", "color:rgb(0,255,0);");
        let loadScreen = new LoadScreen(app);
        // load stuff
        loadScreen.loadDone();



    }


}