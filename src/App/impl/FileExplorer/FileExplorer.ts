import {App} from "../../App";
import * as PIXI from "pixi.js";
import {koneOS} from "../../../koneOS";
import { Window } from "../../../WindowAPI/Window";
import { FileSystem } from "../../../FileSystem";

export class FileExplorer extends App{
    private app: PIXI.Application | undefined;
    public constructor() {
        super();
        this.appIconPath = "/koneOS/system/assets/testAppIcon.png";
    }

    public onStart() {
        console.log("Test App Started");
        this.app = koneOS.pixiApp;
        const appWindow = new Window(this.app, window.innerWidth / 2, window.innerHeight / 2, 1000, 600, "File Explorer", this.appIconPath, {
            closeButton: true,
            maximizeButton: true,
            minimizeButton: true
        });
        if (!koneOS.devMode) {
            FileSystem.readFromFile("/koneOS/system/apps/FileExplorer/resources/fileExplore.html").then((blob) => {
                appWindow.contentDiv.innerHTML = `<iframe width='100%' height='100%' src=${URL.createObjectURL(blob)} style='position: absolute; top: 0%; left: 0%; border: none;'></iframe>`
            });
        }
        else {
            appWindow.contentDiv.innerHTML = `<iframe width='100%' height='100%' src='./assets/AppResources/FileExplorer/fileExplore.html' style='position: absolute; top: 0%; left: 0%; border: none;'></iframe>`
        }

    }
}