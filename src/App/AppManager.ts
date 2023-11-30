import {App} from "./App";

export class AppManager{
    public static apps:Array<App> = new Array<App>();
    private static PIDNum = 0;
    public static registerApp(app:App) {
        this.apps.push(app);
    }
    public static getPID() {
        this.PIDNum++;
        return this.PIDNum;
    }
}