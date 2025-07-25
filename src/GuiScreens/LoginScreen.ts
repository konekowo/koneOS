import * as PIXI from "pixi.js";
import { ease } from "pixi-ease";
import sha256 from "crypto-js/sha256";
import {DesktopScreen} from "./DesktopScreen";
import {FileSystem} from "../FileSystem";
export class LoginScreen {

    private static app:PIXI.Application;
    constructor(app: PIXI.Application, bgSprite: PIXI.Sprite) {
        LoginScreen.app = app;
        //pfp and animations
        const userPFPGraphicBG = new PIXI.Graphics();
        userPFPGraphicBG.x = window.innerWidth / 2;
        userPFPGraphicBG.y = window.innerHeight / 2 - 100;
        userPFPGraphicBG.alpha = 0;
        userPFPGraphicBG.lineStyle(0);
        userPFPGraphicBG.beginFill(new PIXI.Color("rgb(210,210,210)"), 1);
        userPFPGraphicBG.drawCircle(0, 0, 75);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        userPFPGraphicBG.scale = new PIXI.ObservablePoint(null, null, 0, 0);
        app.stage.addChild(userPFPGraphicBG);


        ease.add(
            userPFPGraphicBG,
            { scale: 1, x: window.innerWidth / 2, y: window.innerHeight / 2 - 100, alpha: 1 },
            { reverse: false, duration: 400, ease: "easeInOutQuad" },
        );

        const userPFPGraphicMask = new PIXI.Graphics();
        userPFPGraphicMask.x = window.innerWidth / 2;
        userPFPGraphicMask.y = window.innerHeight / 2;
        userPFPGraphicMask.alpha = 0;
        userPFPGraphicMask.lineStyle(0);
        userPFPGraphicMask.beginFill(new PIXI.Color("white"), 1);
        userPFPGraphicMask.drawCircle(0, 0, 75);
        app.stage.addChild(userPFPGraphicMask);

        const userPFPGraphic = new PIXI.Graphics();
        userPFPGraphic.x = window.innerWidth / 2;
        userPFPGraphic.y = window.innerHeight / 2;
        userPFPGraphic.alpha = 0;
        userPFPGraphic.lineStyle(0);
        userPFPGraphic.beginFill(new PIXI.Color("gray"), 1);
        userPFPGraphic.drawCircle(0, -20, 30);
        userPFPGraphic.drawCircle(0, 95, 75);
        userPFPGraphic.mask = userPFPGraphicMask;

        FileSystem.readFromFile("/koneOS/system/assets/default_wallpaper.jpg").then((result)=>{
            const blobURL = URL.createObjectURL(result);

            const xhrBgRequest = new XMLHttpRequest();
            xhrBgRequest.open("GET", blobURL, false);
            xhrBgRequest.send();
            const bgImgUrl = blobURL;

            const bgSprite2 = PIXI.Sprite.from(bgImgUrl);

            const image = new Image();
            image.src = bgImgUrl;
            image.onload = function () {
                const ogWidth = image.width;
                const ogHeight = image.height;
                //bgSprite2.height = window.innerWidth;

                let scaleFactor0 = 1;
                if (window.innerWidth > window.innerHeight) {
                    scaleFactor0 = window.innerWidth / ogWidth + 0.1;
                } else {
                    scaleFactor0 = window.innerHeight / ogHeight + 0.1;
                }
                //console.log(scaleFactor0);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                bgSprite2.scale = new PIXI.ObservablePoint(null, null, scaleFactor0, scaleFactor0);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                bgSprite2.anchor = new PIXI.ObservablePoint(null, null, 0.5, 0.5);
                bgSprite2.x = window.innerWidth / 2;
                bgSprite2.y = window.innerHeight / 2;

                let scaleFactor1 = 1;
                if (window.innerWidth > window.innerHeight) {
                    scaleFactor1 = window.innerWidth / ogWidth + 0.1;
                } else {
                    scaleFactor1 = window.innerHeight / ogHeight + 0.1;
                }

                window.addEventListener("resize", () => {
                    if (window.innerWidth > window.innerHeight) {
                        scaleFactor1 = window.innerWidth / ogWidth + 0.1;
                    } else {
                        scaleFactor1 = window.innerHeight / ogHeight + 0.1;
                    }
                    ease.add(
                        bgSprite2,
                        {x: window.innerWidth / 2, y: window.innerHeight / 2, scale: scaleFactor1},
                        {reverse: false, duration: 400, ease: "easeInOutQuad"},
                    );
                });

                bgSprite2.alpha = 0;
                bgSprite2.roundPixels = true;
                bgSprite2.mask = userPFPGraphicMask;
                app.stage.addChild(bgSprite2);


                app.stage.addChild(userPFPGraphic);
                ease.add(
                    [userPFPGraphicMask, userPFPGraphic],
                    {x: window.innerWidth / 2, y: window.innerHeight / 2 - 100, alpha: 1},
                    {reverse: false, duration: 800, ease: "easeOutQuad"},
                );

                //user name
                const style = new PIXI.TextStyle({
                    fontFamily: "Arial",
                    fontSize: 35,
                    fontWeight: "bold",
                    fill: "#ffffff",
                    //dropShadow: true,
                    //dropShadowBlur: 10,
                    padding: 15,
                });
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const username: PIXI.Text = new PIXI.Text(window.localStorage.getItem("username"), style);
                username.x = window.innerWidth / 2 - username.width / 2;
                username.y = window.innerHeight / 2;
                username.alpha = 0;
                app.stage.addChild(username);

                // password box
                const password = new PIXI.Graphics();
                password.beginFill(new PIXI.Color("rgb(130,130,130)"));
                password.drawRoundedRect(0, 0, 250, 35, 10);
                password.x = window.innerWidth / 2 - 250 / 2;
                password.y = window.innerHeight / 2 + 75;
                password.eventMode = "static";
                bgSprite.eventMode = "static";
                let isPasswordBoxFocused = false;
                let isFadeInAnimationDone = false;
                let isCheckingPassword = false;

                password.onmouseenter = function () {
                    if (isFadeInAnimationDone && !isCheckingPassword)
                        ease.add(password, {alpha: 0.3}, {reverse: false, duration: 200, ease: "easeOutQuad"});
                };
                password.onmouseleave = function () {
                    if (isFadeInAnimationDone && !isCheckingPassword)
                        ease.add(password, {alpha: 0.2}, {reverse: false, duration: 200, ease: "easeOutQuad"});
                };
                password.onmousedown = function () {
                    if (isFadeInAnimationDone && !isCheckingPassword)
                        ease.add(password, {alpha: 0.1}, {reverse: false, duration: 200, ease: "easeOutQuad"});
                };
                password.onmouseup = function () {
                    if (isFadeInAnimationDone && !isCheckingPassword)
                        ease.add(password, {alpha: 0.3}, {reverse: false, duration: 200, ease: "easeOutQuad"});
                };

                password.alpha = 0;
                const style2 = new PIXI.TextStyle({
                    fontFamily: "Arial",
                    fontSize: 20,
                    fontWeight: "lighter",
                    fill: "rgba(150,150,150)",
                    padding: 15,
                });
                const style3 = new PIXI.TextStyle({
                    fontFamily: "Arial",
                    fontSize: 20,
                    fontWeight: "lighter",
                    fill: "white",
                    padding: 15,
                });
                const passwordPlaceHolder = new PIXI.Text("Password", style2);
                passwordPlaceHolder.x = window.innerWidth / 2 - passwordPlaceHolder.width - 25;
                passwordPlaceHolder.y = window.innerHeight / 2 + 80;
                passwordPlaceHolder.alpha = 0;

                const passwordTextRender = new PIXI.Text("", style3);
                passwordTextRender.x = window.innerWidth / 2 - passwordPlaceHolder.width - 25;
                passwordTextRender.y = window.innerHeight / 2 + 80;
                passwordTextRender.alpha = 1;

                const passwordCursor = new PIXI.Graphics();
                passwordCursor.beginFill(new PIXI.Color("white"));
                passwordCursor.drawRoundedRect(0, 0, 2.5, 20, 10);
                passwordCursor.x = window.innerWidth / 2 - 250 / 2 + 10;
                passwordCursor.y = window.innerHeight / 2 + 82.5;
                passwordCursor.alpha = 1;
                passwordCursor.visible = false;

                // this will be used for checking the password,
                let passwordText = "";
                let passwordTextForRender = "";

                password.onclick = function () {
                    if (isFadeInAnimationDone && !isCheckingPassword) {
                        isPasswordBoxFocused = true;
                        passwordCursor.visible = true;
                        ease.add(passwordPlaceHolder, {alpha: 0}, {reverse: false, duration: 200, ease: "easeInOutQuad"});
                        window.addEventListener("keypress", handleKeyPress);
                        window.addEventListener("keydown", handleKeyPressDown);
                    }
                };
                bgSprite.onclick = function () {
                    unFocusTextBox();
                };

                function unFocusTextBox() {
                    if (isFadeInAnimationDone) {
                        isPasswordBoxFocused = false;
                        passwordCursor.visible = false;
                        if (passwordText.length == 0) {
                            ease.add(
                                passwordPlaceHolder,
                                {alpha: 0.2},
                                {reverse: false, duration: 200, ease: "easeInOutQuad"},
                            );
                        }
                        window.removeEventListener("keypress", handleKeyPress);
                        window.removeEventListener("keydown", handleKeyPressDown);
                    }
                }

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                function handleKeyPress(e) {
                    const regex = /[A-Za-z0-9 `~!@#$%^&*()\-=_+\[{}\]\\|;:'",<.>/?]/gm;
                    if (regex.test(e.key) && passwordText.length <= 31 && e.key != 13) {
                        passwordText += e.key;
                        passwordTextForRender += "•";
                    }

                    passwordTextRender.text = passwordTextForRender;
                    movePasswordCursor();
                }

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                function handleKeyPressDown(e) {
                    if (e.keyCode == 8) {
                        passwordText = passwordText.substring(0, passwordText.length - 1);
                        passwordTextForRender = passwordTextForRender.substring(0, passwordTextForRender.length - 1);
                    }
                    if (e.keyCode == 13) {
                        checkPassword();
                    }

                    passwordTextRender.text = passwordTextForRender;
                    movePasswordCursor();
                }

                function checkPassword() {
                    unFocusTextBox();
                    isCheckingPassword = true;
                    ease.add(passwordTextRender, {alpha: 0}, {reverse: false, duration: 200, ease: "easeInOutQuad"});
                    ease.add(password, {alpha: 0}, {reverse: false, duration: 200, ease: "easeInOutQuad"});
                    setTimeout(() => {
                        if (sha256(passwordText).toString() == window.localStorage.getItem("password")) {
                            ease.add(userPFPGraphic, {y:window.innerHeight/2-200,alpha: 0}, {duration: 200, ease: "easeInOutQuad"});
                            ease.add([userPFPGraphicBG, userPFPGraphicMask], {y:window.innerHeight/2}, {duration: 800, ease: "easeInOutQuad"});
                            ease.add(username, {alpha:0}, {duration:200, ease:"easeInOutQuad"});
                            setTimeout(() => {
                                ease.add(bgSprite2, {alpha: 1}, {duration: 300, ease: "easeInOutQuad"});
                                ease.add(userPFPGraphicBG, {alpha:0}, {duration:300, ease:"easeInOutQuad"})
                                setTimeout(()=>{
                                    if (window.innerWidth > window.innerHeight){
                                        ease.add(userPFPGraphicMask, {width:window.innerWidth*2, height: window.innerWidth*2}, {duration: 800, ease: "easeInOutQuad"});
                                    }
                                    else {
                                        ease.add(userPFPGraphicMask, {width:window.innerHeight*2, height: window.innerHeight*2}, {duration: 800, ease: "easeInOutQuad"});
                                    }

                                    setTimeout(()=>{
                                        LoginScreen.loginUser(bgSprite2, ogWidth, ogHeight);
                                        window.removeEventListener("resize", handleResize);
                                    },900);
                                },400);
                            }, 900);



                        } else {
                            ease.add(
                                passwordTextRender,
                                {alpha: 1},
                                {reverse: false, duration: 200, ease: "easeInOutQuad"},
                            );
                            ease.add(password, {alpha: 0.2}, {reverse: false, duration: 200, ease: "easeInOutQuad"});
                            isCheckingPassword = false;
                        }
                    }, 200);
                }

                function movePasswordCursor() {
                    ease.removeEase(passwordCursor);
                    ease.add(
                        passwordCursor,
                        {x: passwordText.length > 0 ? window.innerWidth / 2 - 250 / 2 + 10 + passwordTextRender.width + 2 : window.innerWidth / 2 - 250 / 2 + 10},
                        {reverse: false, duration: 50, ease: "easeInOutQuad"},
                    );
                    setTimeout(() => {
                        passwordCursor.alpha = 1;
                        ease.add(passwordCursor, {alpha: 0}, {
                            repeat: true,
                            reverse: true,
                            duration: 800,
                            ease: "easeInOutQuad"
                        });
                    }, 100)

                }

                ease.add(passwordCursor, {alpha: 0}, {repeat: true, reverse: true, duration: 800, ease: "easeInOutQuad"});
                app.stage.addChild(password);
                app.stage.addChild(passwordPlaceHolder);
                app.stage.addChild(passwordCursor);
                app.stage.addChild(passwordTextRender);
                setTimeout(() => {
                    ease.add(username, {alpha: 1}, {reverse: false, duration: 800, ease: "easeInOutQuad"});
                    setTimeout(() => {
                        ease.add(
                            [password, passwordPlaceHolder],
                            {alpha: 0.2},
                            {reverse: false, duration: 400, ease: "easeInOutQuad"},
                        );
                        isFadeInAnimationDone = true;
                    }, 400);
                }, 800);

                window.addEventListener("resize", handleResize);
                function handleResize() {
                    ease.add(
                        password,
                        {x: window.innerWidth / 2 - 250 / 2, y: window.innerHeight / 2 + 75},
                        {reverse: false, duration: 400, ease: "easeInOutQuad"},
                    );
                    ease.add(
                        username,
                        {x: window.innerWidth / 2 - username.width / 2, y: window.innerHeight / 2},
                        {reverse: false, duration: 400, ease: "easeInOutQuad"},
                    );
                    ease.add(
                        passwordPlaceHolder,
                        {x: window.innerWidth / 2 - passwordPlaceHolder.width - 25, y: window.innerHeight / 2 + 80},
                        {reverse: false, duration: 400, ease: "easeInOutQuad"},
                    );
                    ease.add(
                        userPFPGraphicBG,
                        {x: window.innerWidth / 2, y: window.innerHeight / 2 - 100},
                        {reverse: false, duration: 400, ease: "easeInOutQuad"},
                    );
                    ease.add(
                        [userPFPGraphicMask, userPFPGraphic],
                        {x: window.innerWidth / 2, y: window.innerHeight / 2 - 100},
                        {reverse: false, duration: 400, ease: "easeInOutQuad"},
                    );
                    ease.add(passwordCursor, {
                        x: window.innerWidth / 2 - 250 / 2 + 10 + passwordTextRender.width + 2,
                        y: window.innerHeight / 2 + 82.5
                    }, {duration: 400, ease: "easeInOutQuad"});
                    ease.add(passwordTextRender, {
                        x: window.innerWidth / 2 - passwordPlaceHolder.width - 25,
                        y: window.innerHeight / 2 + 80
                    }, {duration: 400, ease: "easeInOutQuad"});


                }
            }
        });
    }

    private static loginUser(bgSprite:PIXI.Sprite, bgOgWidth: number, bgOgHeight: number){
        ease.removeAll();
        LoginScreen.app.stage.removeChildren();
        bgSprite.mask = null;
        new DesktopScreen(bgOgWidth, bgOgHeight, bgSprite, LoginScreen.app);
    }
}
