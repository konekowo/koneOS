/* eslint-disable prettier/prettier */
import * as PIXI from "pixi.js";
import { Color } from "../Color";
import { Welcome } from "./SetupWindowScreens/Welcome";

export class SetupScreen {
    private app: PIXI.Application;

    public constructor(app: PIXI.Application) {
        console.log("Starting Setup");
        this.app = app;
        let backgroundColor: Color = new Color(0, 0, 0, 255);
        app.renderer.backgroundColor = backgroundColor.getRGB();
        let backgroundWhiteAlpha = 0;
        const backgroundColorAnim = setInterval(() => {
            if (backgroundWhiteAlpha > 220) {
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
        const SetupWindow: HTMLElement = document.createElement("div");
        SetupWindow.style.backgroundColor = "white";
        SetupWindow.style.transition = "0.8s top, left, bottom, right, width, height, background-color ease-in-out";
        SetupWindow.style.width = "75vw";
        SetupWindow.style.height = "85vh";
        SetupWindow.style.position = "absolute";
        SetupWindow.style.top = "150vh";
        SetupWindow.style.left = "50vw";
        SetupWindow.style.transform = "translate(-50%, -50%)";
        SetupWindow.style.borderRadius = "0.5rem";
        document.body.appendChild(SetupWindow);
        const welcomeScreen = new Welcome(SetupWindow);

        setTimeout(() => {
            SetupWindow.style.top = "50vh";
        }, 200);
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
