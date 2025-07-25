import * as PIXI from "pixi.js";
import {ease} from "pixi-ease";
import {FileSystem} from "../FileSystem";



export interface WindowOptions{
    closeButton:boolean;
    minimizeButton:boolean;
    maximizeButton:boolean;
}

/*
======================================
          koneOS Window API

Note: all windows' origins are in the center, not in the top right of the window.
```typescript
const s = new koneOS();
```
======================================
*/
export class Window{
    private x;
    private y;
    private width;
    private height;
    private graphics;
    private windowTitle;
    private iconPath;
    private windowOptions;
    private windowTop;
    private iconSprite: PIXI.Sprite | undefined;
    private titlePixiObj;
    private closeButton;
    private minimiseButton;
    private maximiseButton;
    private windowContainer;
    private windowMask;
    protected isWindowActive;
    public contentDiv;

    private static Windows:Array<Window> = new Array<Window>();

    public constructor(app:PIXI.Application, x:number, y:number, width:number, height:number, windowTitle:string, iconPath:string, windowOptions:WindowOptions) {

        this.graphics = new PIXI.Graphics();
        this.windowContainer = new PIXI.Container();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.windowTop = new PIXI.Graphics();
        this.windowTop.x = 0;
        this.windowTop.y = 0;


        this.graphics.x = 0;
        this.graphics.y = 0;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.windowContainer.scale = new PIXI.ObservablePoint(null, null, 0.7, 0.7);
        this.windowContainer.alpha = 0;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        ease.add(this.windowContainer, {scale: 1, alpha: 1}, {duration: 200, ease:"easeInOutQuad"})
        this.windowTitle = windowTitle;
        this.iconPath = iconPath;
        this.windowOptions = windowOptions;


        this.windowMask = new PIXI.Graphics();
        this.windowMask.visible = false;
        this.windowContainer.addChild(this.windowMask);


        this.windowContainer.addChild(this.graphics);

        this.windowTop.zIndex = this.graphics.zIndex + 1
        this.windowTop.eventMode = "static";
        app.stage.eventMode = "static";

        this.windowTop.onmousedown = () => {
            window.onmousemove = (e) => {
                this.setPosition((e.clientX + (this.width/2)) - this.width/2, (e.clientY + (this.height/2)) - 15);
            }
            this.contentDiv.onmousemove = (e) => {
                this.setPosition((e.clientX + (this.width/2)) - this.width/2, (e.clientY + (this.height/2)) - 15);
            }
            this.contentDiv.onmouseup = () => {
                window.onmousemove = null;
                window.onmouseup = null;
                this.contentDiv.onmousemove = null;
                this.contentDiv.onmouseup = null;
            }
            window.onmouseup = () => {
                window.onmousemove = null;
                window.onmouseup = null;
                this.contentDiv.onmousemove = null;
                this.contentDiv.onmouseup = null;
            }
        }
        this.windowContainer.eventMode = "static";
        this.windowContainer.onmousedown = () => {
            this.bringWindowToFront(app);
        }


        const style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 15,
            fontWeight: "normal",
            fill: "#ffffff",
            padding: 15,
        });

        this.titlePixiObj = new PIXI.Text(this.windowTitle, style);
        this.titlePixiObj.x = -this.width/2 + 35;
        this.titlePixiObj.y = -this.height/2 + 7;

        this.windowContainer.addChild(this.titlePixiObj);
        this.windowContainer.addChild(this.windowTop);

        FileSystem.readFromFile(this.iconPath).then((result)=>{
            this.iconSprite = PIXI.Sprite.from(URL.createObjectURL(result))
            this.iconSprite.x = -this.width/2 + 10;
            this.iconSprite.y = -this.height/2 + 7;
            this.iconSprite.width = 18;
            this.iconSprite.height = 18;
            this.windowContainer.addChild(this.iconSprite);
        })



        this.closeButton = new PIXI.Graphics();
        this.windowContainer.addChild(this.closeButton);

        this.closeButton.eventMode = "static";
        this.closeButton.onclick = () => {
            this.close();
        }

        this.minimiseButton = new PIXI.Graphics();
        this.windowContainer.addChild(this.minimiseButton);
        this.maximiseButton = new PIXI.Graphics();
        this.windowContainer.addChild(this.maximiseButton);

        app.stage.addChild(this.windowContainer);

        this.isWindowActive = true;
        this.windowContainer.x = this.x;
        this.windowContainer.y = this.y;

        this.contentDiv = document.createElement("div");
        this.contentDiv.style.position = "absolute";
        //this.contentDiv.style.backgroundColor = "white";
        this.contentDiv.style.borderRadius = "0px 0px 8px 8px";
        this.contentDiv.style.transform = "scale(0.7)";
        this.contentDiv.style.opacity = "0%";
        this.contentDiv.style.transition = "transform 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s";
        this.contentDiv.style.overflow = "hidden";
        this.drawWindow();
        setTimeout(()=>{
            this.contentDiv.style.transform = "scale(1)";
            this.contentDiv.style.opacity = "100%";
        },1);
        document.body.appendChild(this.contentDiv);
        Window.Windows.push(this);
    }

    public bringWindowToFront(app:PIXI.Application){
        this.windowContainer.removeFromParent();
        app.stage.addChild(this.windowContainer);
        for (let i = 0; i < Window.Windows.length; i++){
            if (Window.Windows[i] !== this){
                Window.Windows[i].setWindowToNotActive();
            }
            else {
                Window.Windows[i].isWindowActive = true;
                this.contentDiv.style.display = "block";
            }
        }
    }

    public setWindowToNotActive(){
        this.isWindowActive = false;
        this.contentDiv.style.display = "none";



    }

    private drawWindow(){
        this.graphics.beginFill(new PIXI.Color("rgba(37,37,37,1)"));
        this.graphics.lineStyle(1, new PIXI.Color("rgba(159,159,159,1)"));
        this.graphics.drawRoundedRect(-this.width/2,-this.height/2, this.width, this.height, 8);
        this.graphics.beginFill(new PIXI.Color("rgba(159,159,159,1)"));
        this.graphics.drawRect(-this.width/2, -this.height/2+30, this.width, 1);
        this.windowTop.beginFill(new PIXI.Color('rgba(255,255,255,0.00001)'));
        this.windowTop.drawRect(-this.width/2, -this.height/2, this.width, 30);
        this.windowMask.beginFill(new PIXI.Color("rgba(37,37,37,1)"));
        this.windowMask.drawRoundedRect(-this.width/2,-this.height/2, this.width, this.height, 8);
        this.closeButton.beginFill(new PIXI.Color("rgb(215,79,79)"));
        this.closeButton.drawCircle(this.width/2 -15, -this.height/2 + 15, 7);
        this.maximiseButton.beginFill(new PIXI.Color("rgb(102,210,123)"));
        this.maximiseButton.drawCircle(this.width/2 -35, -this.height/2 + 15, 7);
        this.minimiseButton.beginFill(new PIXI.Color("rgb(225,223,125)"));
        this.minimiseButton.drawCircle(this.width/2 -55, -this.height/2 + 15, 7);
        this.setContentDivPositionAndSize();
    }

    private setContentDivPositionAndSize(){
        this.contentDiv.style.top = (this.y - (this.height/2)) + 31 + "px";
        this.contentDiv.style.left = (this.x - (this.width/2)) + "px";
        this.contentDiv.style.width = this.width -1 + "px";
        this.contentDiv.style.height = this.height - 32 + "px";
    }
    public setWidthAndHeight(width:number, height:number){
        this.graphics.clear();
        this.windowTop.clear();
        this.minimiseButton.clear();
        this.maximiseButton.clear();
        this.closeButton.clear();
        this.windowMask.clear();
        this.width = width;
        this.height = height;
        this.drawWindow();
    }

    public getWidthAndHeight(){
        return {width: this.width, height: this.height};
    }

    public setPosition(x:number, y:number){
        this.x = x;
        this.y = y;
        if (this.y + this.height/2 > window.innerHeight - 90){
            this.y = window.innerHeight - 90 - (this.height/2);
        }
        this.windowContainer.x = this.x;
        this.windowContainer.y = this.y;
        this.setContentDivPositionAndSize();
    }

    public getPosition(){
        return {x: this.x, y: this.y};
    }

    public setWindowOptions(windowOptions:WindowOptions){
        this.windowOptions = windowOptions;
    }

    public getWindowOptions(){
        return this.windowOptions;
    }

    public setWindowTitle(windowTitle:string){
        this.windowTitle = windowTitle;
    }

    public getWindowTitle(){
        return this.windowTitle;
    }

    public getIconPath(){
        return this.iconPath;
    }

    public setIconPath(iconPath:string){
        this.iconPath = iconPath;
    }

    public close(){
        ease.add(this.windowContainer, {alpha:0, scale: 0.7}, {duration: 200, ease:"easeInOutQuad"});
        this.contentDiv.style.transform = "scale(0.7)";
        this.contentDiv.style.opacity = "0%";
        setTimeout(()=> {
            this.destroy();
        },200);
    }


    public destroy(){
        this.windowContainer.removeFromParent();
        this.graphics.clear();
        this.windowTop.clear();
        this.minimiseButton.clear();
        this.maximiseButton.clear();
        this.closeButton.clear();
        this.windowMask.clear();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.graphics = null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.windowTop = null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.minimiseButton = null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.maximiseButton = null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.closeButton = null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.windowMask = null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.graphics = null;
        this.contentDiv.remove();
    }

    public getIsWindowActive(){
        return this.isWindowActive;
    }


}