import * as PIXI from "pixi.js";
import {ease} from "pixi-ease";
import {TaskBar} from "../Desktop/TaskBar";
import {MenuBar} from "../Desktop/MenuBar";
import {TestApp} from "../App/impl/TestApp/TestApp";
import {FileExplorer} from "../App/impl/FileExplorer/FileExplorer";
export class DesktopScreen{
    public constructor(bgImgWidth:number, bgImgHeight:number, bgSprite: PIXI.Sprite, app:PIXI.Application) {
        console.log("Cleaned Screens and loops! (which probably, hopefully cleaned out some of the memory)")
        app.stage.addChild(bgSprite);
        const testApp = new FileExplorer(app);
        const taskBar = new TaskBar(app);
        const menuBar = new MenuBar(app);
    }
}