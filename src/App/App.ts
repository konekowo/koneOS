import {AppManager} from "./AppManager";

export class App {

    protected appIconPath = "";
    protected appName = "";

    public constructor() {
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