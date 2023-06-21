import { Application, Loader, Texture, AnimatedSprite } from "pixi.js";
import "./style.css";
import { koneOS } from "./koneOS";

declare const VERSION: string;

const appWidth = window.innerWidth;
const appHeight = window.innerHeight;

const app = new Application({
    backgroundColor: 0x00000,
    width: appWidth,
    height: appHeight,
});

window.onload = async (): Promise<void> => {

    document.body.appendChild(app.view);

    resizeCanvas();

    const koneos = new koneOS(app);

    app.stage.interactive = true;
};

function resizeCanvas(): void {

    const resize = () => {
        console.log("Resizing video output");
        app.renderer.resize(window.innerWidth, window.innerHeight);
    };

    resize();

    window.addEventListener("resize", () => {
        resize();
    });
}

