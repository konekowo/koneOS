/* eslint-disable prettier/prettier */
import * as PIXI from "pixi.js";

export class LoadScreen {
    private loadAnimInterval: string | number | NodeJS.Timer | undefined;
    private app: PIXI.Application;

    constructor(app: PIXI.Application) {
        this.draw(app);
        this.app = app;
    }

    public loadDone() {
        clearInterval(this.loadAnimInterval);
        this.app.stage.removeChildren();
    }

    private draw(app: PIXI.Application) {
        const style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 50,
            fontWeight: "bold",
            fill: "#ffffff",
        });

        const style2 = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 25,
            fontWeight: "bold",
            fill: "#ffffff",
        });

        const title: PIXI.Text = new PIXI.Text("koneOS", style);
        title.x = window.innerWidth / 2 - title.width / 2;
        title.y = window.innerHeight / 2 - title.height / 2 + 50;

        const loadingText: PIXI.Text = new PIXI.Text("Loading", style2);
        loadingText.x = window.innerWidth / 2 - loadingText.width / 2;
        loadingText.y = window.innerHeight / 2 - loadingText.height / 2 + 50 + loadingText.height + 30;

        let ellipses = "";

        const loadingAnim = setInterval(() => {
            ellipses += ".";
            if (ellipses.length > 3) {
                ellipses = "";
            }
            loadingText.text = "Loading" + ellipses;
            loadingText.x = window.innerWidth / 2 - loadingText.width / 2;
            loadingText.y = window.innerHeight / 2 - loadingText.height / 2 + 50 + loadingText.height + 30;
        }, 500);

        window.addEventListener("resize", () => {
            title.x = window.innerWidth / 2 - title.width / 2;
            title.y = window.innerHeight / 2 - title.height / 2 + 50;
            loadingText.x = window.innerWidth / 2 - loadingText.width / 2;
            loadingText.y = window.innerHeight / 2 - loadingText.height / 2 + 50 + loadingText.height + 30;
        });

        app.stage.addChild(title);
        app.stage.addChild(loadingText);

        // to stop loading interval when loading is done
        this.loadAnimInterval = loadingAnim;
    }
}
