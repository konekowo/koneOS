import {App} from "../App";
import {AppManager} from "../AppManager";


export class TestApp extends App {
    public constructor() {
        super();
        this.appIconPath = "/koneOS/system/assets/testAppIcon.png";
    }

    public onStart() {
        console.log("Test App Started");
    }
}