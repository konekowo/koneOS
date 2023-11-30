import * as PIXI from "pixi.js";
import {ease} from "pixi-ease";
import {BatteryIndicatorMenuBar} from "./BatteryIndicatorMenuBar";

export class MenuBar {
    private menuBarBg:PIXI.Graphics;
    private menuContainer:PIXI.Container;
    private batteryIndicator:PIXI.Graphics;

    public constructor(app:PIXI.Application) {
        this.menuContainer = new PIXI.Container();

        this.menuBarBg = new PIXI.Graphics();
        this.menuBarBg.beginFill(new PIXI.Color("rgba(37,37,37,0.97)"))
        this.menuBarBg.drawRoundedRect(0,0,1, 35, 12);
        this.menuContainer.addChild(this.menuBarBg);
        app.stage.addChild(this.menuContainer);
        this.menuBarBg.width = window.innerWidth;
        this.menuContainer.x = 0;
        this.menuContainer.y = -35;

        this.batteryIndicator = new BatteryIndicatorMenuBar().getGraphic();
        this.batteryIndicator.x = window.innerWidth - 37;
        this.batteryIndicator.y = (this.menuBarBg.height/2) - (this.batteryIndicator.height/2)
        this.menuContainer.addChild(this.batteryIndicator);


        ease.add(this.menuContainer, {y:-1}, {duration: 400, ease: "easeInOutQuad"});
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