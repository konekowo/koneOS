import {App} from "../../App";
import {AppManager} from "../../AppManager";
import {Window, WindowOptions} from '../../../WindowAPI/Window';
import * as PIXI from "pixi.js";
import {koneOS} from "../../../koneOS";

export class TestApp extends App {
    private app: PIXI.Application | undefined;
    public constructor() {
        super();
        this.appIconPath = "/koneOS/system/assets/testAppIcon.png";
    }

    public onStart() {
        console.log("Test App Started");
        this.app = koneOS.pixiApp;
        const testWindow = new Window(this.app, window.innerWidth / 2, window.innerHeight / 2, 1000, 600, "Test App", this.appIconPath, {
            closeButton: true,
            maximizeButton: true,
            minimizeButton: true
        });
        testWindow.contentDiv.innerHTML = "<iframe width='100%' height='100%' src='../../../../assets/AppResources/FileExplorer/fileExplore.html' allowfullscreen style='position: absolute; top: 0%; left: 0%; border: none;'></iframe>"
    }
}
//new TestApp();