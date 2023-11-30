import {AppManager} from "./AppManager";
import * as PIXI from "pixi.js";
export class App {

    protected appIconPath = "";
    protected appName = "";
    public PID: number | undefined;

    public constructor() {
        AppManager.registerApp(this);

    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onStart(){
        this.PID = AppManager.getPID();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onClose() {}

    public getAppIconPath() {
        return this.appIconPath;
    }




}