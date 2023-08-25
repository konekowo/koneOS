import * as PIXI from "pixi.js";
import {ease} from "pixi-ease";

export class MenuBar {
    private menuBarBg:PIXI.Graphics;
    public constructor(app:PIXI.Application) {
        this.menuBarBg = new PIXI.Graphics();
        this.menuBarBg.beginFill(new PIXI.Color("rgba(37,37,37,0.97)"))
        this.menuBarBg.drawRoundedRect(0,0,1, 35, 12);
        app.stage.addChild(this.menuBarBg);
        this.menuBarBg.width = window.innerWidth;
        this.menuBarBg.x = 0;
        this.menuBarBg.y = -35;

        ease.add(this.menuBarBg, {y:-1}, {duration: 400, ease: "easeInOutQuad"});
        const onResize = () => {
            ease.add(this.menuBarBg, {
                x:0,
                y:-1,
                width: window.innerWidth
            }, {duration: 400, ease: "easeInOutQuad"});
        }
        window.addEventListener("resize", onResize);

    }
}