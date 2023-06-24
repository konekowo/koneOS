/* eslint-disable prettier/prettier */
import * as PIXI from "pixi.js";
import { Color } from "../Color";

export class SetupScreen {
    private app: PIXI.Application;

    public constructor(app: PIXI.Application) {
        console.log("Starting Setup");
        this.app = app;
        let backgroundColor: Color = new Color(0, 0, 0, 255);
        app.renderer.backgroundColor = backgroundColor.getRGB();
        let backgroundWhiteAlpha = 0;
        const backgroundColorAnim = setInterval(() => {
            if (backgroundWhiteAlpha > 235) {
                clearInterval(backgroundColorAnim);
                setTimeout(() => {
                    this.SetupWindow();
                }, 500);
            } else {
                backgroundWhiteAlpha += 2;
                backgroundColor = new Color(backgroundWhiteAlpha, backgroundWhiteAlpha, backgroundWhiteAlpha, 255);
                app.renderer.backgroundColor = backgroundColor.getRGB();
            }
        }, 1);
    }
    private SetupWindow() {
        const SetupWindow: Element = document.createElement("div");
    }
    /*
    private SetupWindow(){
        const windowBackground = new PIXI.Graphics;
        
        windowBackground.beginFill(0xBEBEBE);
        windowBackground.drawRoundedRect(-1, -1, 1002, 602, 15);
        windowBackground.endFill();
        windowBackground.beginFill(new Color(255, 255, 255, 255).getRGB());
        windowBackground.drawRoundedRect(0, 0, 1000, 600, 15);
        windowBackground.endFill();
        
        windowBackground.x = window.innerWidth / 2 - windowBackground.width / 2;
        windowBackground.y = window.innerHeight;

        this.app.stage.addChild(windowBackground);

        let animDone = false;

        window.addEventListener("resize", () => {
            if (animDone){
                windowBackground.x = window.innerWidth / 2 - windowBackground.width / 2;
                windowBackground.y = window.innerHeight / 2 - windowBackground.height / 2;
            }
        });
        let yVal = window.innerHeight;
        const factor = 4;
        const animWindow = setInterval(() => {
            if (yVal < (window.innerHeight /2 - windowBackground.height / 2)){
                animDone = true;
                clearInterval(animWindow);
            }
            else {
                
                
                
                yVal-= factor;
                windowBackground.y = yVal;
            }
        },1);
        
    }
    */
}
