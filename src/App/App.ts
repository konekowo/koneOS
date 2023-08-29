import {AppManager} from "./AppManager";
import * as PIXI from "pixi.js";
export class App {

    protected appIconPath = "";
    protected appName = "";
    protected app;

    public constructor(app:PIXI.Application) {
        this.app = app;
        AppManager.apps.push(this);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onStart(){}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onClose() {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/ban-ts-comment
    public onkeyup(event: any) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onkeydown(event: any) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onkeypress(event: any) {}

    public getAppIconPath() {
        return this.appIconPath;
    }




}