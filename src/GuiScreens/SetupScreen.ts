/* eslint-disable prettier/prettier */
import * as PIXI from "pixi.js";
import { Color } from "../Color";
import { Welcome } from "./SetupWindowScreens/Welcome";
import { Ease, ease } from "pixi-ease";
export class SetupScreen {
    private app: PIXI.Application;

    public constructor(app: PIXI.Application) {
        console.log("Starting Setup");
        this.app = app;
        const bgSprite = new PIXI.Graphics();
        bgSprite.beginFill(new PIXI.Color("rgba(220,220,220,1)"));
        bgSprite.drawRect(0, 0, window.innerWidth, window.innerHeight);
        window.addEventListener("resize", () => {
            bgSprite.drawRect(0, 0, window.innerWidth, window.innerHeight);
        });
        bgSprite.alpha = 0;
        app.stage.addChild(bgSprite);
        ease.add(bgSprite, { alpha: 1 }, { reverse: false, duration: 800, ease: "easeInOutQuad" });
        setTimeout(() => {
            this.SetupWindow();
        }, 1000);
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
        SetupWindow.style.overflow = "hidden";
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
