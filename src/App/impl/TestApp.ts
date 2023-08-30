import {App} from "../App";
import {AppManager} from "../AppManager";
import {Window, WindowOptions} from '../../WindowAPI/Window';
import * as PIXI from "pixi.js";

export class TestApp extends App {
    public constructor(app:PIXI.Application) {
        super(app);
        this.appIconPath = "/koneOS/system/assets/testAppIcon.png";
    }

    public onStart() {
        console.log("Test App Started");
        const testWindow = new Window(this.app, window.innerWidth/2, window.innerHeight/2, 1000, 600, "Test App", this.appIconPath, {closeButton:true, maximizeButton:true, minimizeButton:true});
    }
}