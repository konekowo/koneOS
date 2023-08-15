import { Application } from "pixi.js";
import "./style.css";
import { koneOS } from "./koneOS";

const appWidth = window.innerWidth;
const appHeight = window.innerHeight;

const app = new Application({
    backgroundColor: 0x00000,
    width: appWidth,
    height: appHeight,
    //resolution: window.devicePixelRatio,
    antialias: true,
});

window.onload = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.body.appendChild(app.view);

    resizeCanvas();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    new koneOS(app);

    //app.stage.eventMode = 'static';
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
