import * as PIXI from "pixi.js";
import {ease} from "pixi-ease";
import {AppManager} from "../App/AppManager";
import {App} from "../App/App";
import {FileSystem} from "../FileSystem";

export class TaskBar {
    public taskBarBg:PIXI.Graphics;
    public taskBarContainer:PIXI.Container;
    
    public constructor(app:PIXI.Application) {
        this.taskBarBg = new PIXI.Graphics();
        this.taskBarBg.beginFill(new PIXI.Color("rgba(37,37,37,0.97)"));
        this.taskBarBg.lineStyle(1, new PIXI.Color("rgba(159,159,159,0.97)"));
        this.taskBarBg.drawRoundedRect(-2,-2, (AppManager.apps.length*65)+15, 88, 12);
        this.taskBarBg.x = 0;
        this.taskBarBg.y = 0;
        this.taskBarContainer = new PIXI.Container();
        this.taskBarContainer.x = (window.innerWidth/2) - (this.taskBarBg.width/2);
        this.taskBarContainer.y =  window.innerHeight;
        this.taskBarContainer.addChild(this.taskBarBg);
        app.stage.addChild(this.taskBarContainer);

        ease.add(this.taskBarContainer, {y:window.innerHeight-this.taskBarBg.height+12}, {duration: 400, ease: "easeInOutQuad"});
        const onResize = () => {
            ease.add(this.taskBarContainer, {
                x:(window.innerWidth/2) - (this.taskBarBg.width/2),
                y:window.innerHeight-this.taskBarBg.height+12
            }, {duration: 400, ease: "easeInOutQuad"});
        }
        window.addEventListener("resize", onResize);

        for (let i= 0; i < AppManager.apps.length; i++){
            FileSystem.readFromFile(AppManager.apps[i].getAppIconPath()).then((result) => {
                const appSprite = PIXI.Sprite.from(URL.createObjectURL(result));

                appSprite.width = 65;
                appSprite.height = 65;
                appSprite.x = 5;
                if (i>1){
                    appSprite.x = ((5+appSprite.width)*i)-appSprite.width;
                }
                appSprite.y = 6;
                appSprite.eventMode = "static";
                appSprite.onclick = () => {
                    AppManager.apps[i].onStart();
                }

                this.taskBarContainer.addChild(appSprite);
            });
        }
    }
}