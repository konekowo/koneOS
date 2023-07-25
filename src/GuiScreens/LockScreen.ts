/* eslint-disable prettier/prettier */
import * as PIXI from "pixi.js";
import { Ease, ease } from "pixi-ease";

export class LockScreen {
    public constructor(app: PIXI.Application) {
        console.log("Showing Lock Screen!");
        // download bing picture of the day json stuff
        const xhrBgRequest = new XMLHttpRequest();
        xhrBgRequest.open("GET", "https://bing.biturl.top/", false);
        xhrBgRequest.send();
        const bgImgUrl = JSON.parse(xhrBgRequest.response).url;
        // make sprite with url of bing picture of the day
        const bgSprite = PIXI.Sprite.from(bgImgUrl);

        const image = new Image();
        image.src = bgImgUrl;
        image.onload = function () {
            const ogWidth = image.width;
            const ogHeight = image.height;
            //bgSprite.height = window.innerWidth;

            let scaleFactor0 = 1;
            if (window.innerWidth > window.innerHeight) {
                scaleFactor0 = window.innerWidth / ogWidth - 0.5;
            } else {
                scaleFactor0 = window.innerHeight / ogHeight - 0.5;
            }
            console.log(scaleFactor0);
            bgSprite.scale = new PIXI.ObservablePoint(null, null, scaleFactor0, scaleFactor0);
            bgSprite.anchor = new PIXI.ObservablePoint(null, null, 0.5, 0.5);
            bgSprite.x = window.innerWidth / 2;
            bgSprite.y = window.innerHeight / 2;

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
                    bgSprite,
                    { x: window.innerWidth / 2, y: window.innerHeight / 2, scale: scaleFactor1 },
                    { reverse: false, duration: 400, ease: "easeInOutQuad" },
                );
            });

            bgSprite.alpha = 0;
            bgSprite.roundPixels = true;
            app.stage.addChild(bgSprite);

            ease.add(
                bgSprite,
                { x: window.innerWidth / 2, y: window.innerHeight / 2, alpha: 1, scale: scaleFactor1, skew: 0 },
                { reverse: false, duration: 800, ease: "easeInOutQuad" },
            );
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
            let calendar = new Date();
            let hours = calendar.getHours();
            let isAM = true;
            let minutes: number | string = calendar.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (hours > 12) {
                hours = hours - 12;
                isAM = false;
            }
            const AMorPM = isAM ? " AM" : " PM";
            const time: PIXI.Text = new PIXI.Text(hours + ":" + minutes + AMorPM, style);
            time.x = window.innerWidth / 2 - time.width / 2;
            time.y = 150;
            time.alpha = 0;
            setInterval(() => {
                calendar = new Date();
                let hours = calendar.getHours();
                let isAM = true;
                let minutes: number | string = calendar.getMinutes();
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (hours > 12) {
                    hours = hours - 12;
                    isAM = false;
                }
                const AMorPM = isAM ? " AM" : " PM";
                (time.text = hours + ":" + minutes + AMorPM), style;
            }, 1000);
            let weekday: string | number = calendar.getDay();
            if (weekday == 0) {
                weekday = "Sunday";
            } else if (weekday == 1) {
                weekday = "Monday";
            } else if (weekday == 2) {
                weekday = "Tuesday";
            } else if (weekday == 3) {
                weekday = "Wednesday";
            } else if (weekday == 4) {
                weekday = "Thursday";
            } else if (weekday == 5) {
                weekday = "Friday";
            } else {
                weekday = "Saturday";
            }
            let month: number | string = calendar.getMonth();
            if (month == 0) {
                month = "January";
            } else if (month == 1) {
                month = "February";
            } else if (month == 2) {
                month = "March";
            } else if (month == 3) {
                month = "April";
            } else if (month == 4) {
                month = "May";
            } else if (month == 5) {
                month = "June";
            } else if (month == 6) {
                month = "July";
            } else if (month == 7) {
                month = "August";
            } else if (month == 8) {
                month = "September";
            } else if (month == 9) {
                month = "October";
            } else if (month == 10) {
                month = "November";
            } else {
                month = "December";
            }

            const date: PIXI.Text = new PIXI.Text(weekday + ", " + month + " " + calendar.getDate(), style2);
            date.x = window.innerWidth / 2 - date.width / 2;
            date.y = 150 + date.height + 30;
            date.alpha = 0;
            app.stage.addChild(time, date);
            window.addEventListener("resize", () => {
                ease.add(
                    time,
                    { x: window.innerWidth / 2 - time.width / 2, y: 150 },
                    { reverse: false, duration: 400, ease: "easeInOutQuad" },
                );
                ease.add(
                    date,
                    { x: window.innerWidth / 2 - date.width / 2, y: 150 + date.height + 30 },
                    { reverse: false, duration: 400, ease: "easeInOutQuad" },
                );
            });
            window.addEventListener("click", () => {
                ease.add([time, date], { alpha: 0 }, { reverse: false, duration: 200, ease: "easeInOutQuad" });
                ease.add(bgSprite, { alpha: 0.3 }, { reverse: false, duration: 400, ease: "easeInOutQuad" });
            });
            setTimeout(() => {
                ease.add([time, date], { alpha: 1 }, { reverse: false, duration: 400, ease: "easeInOutQuad" });
            }, 1000);
        };
    }
}
