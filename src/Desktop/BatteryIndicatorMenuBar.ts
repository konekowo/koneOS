import * as PIXI from "pixi.js";
export class BatteryIndicatorMenuBar {
    private batteryIndicator:PIXI.Graphics;
    public constructor() {
        this.batteryIndicator = new PIXI.Graphics();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigator.getBattery().then((data) => {
            console.log(data);
            this.draw(data.level, data.charging);
            data.onchargingchange = () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                navigator.getBattery().then((data) => {
                    this.draw(data.level, data.charging);
                })
            }
            data.onlevelchange = () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                navigator.getBattery().then((data) => {
                    this.draw(data.level, data.charging);
                })
            }
        })

    }

    public draw(batteryPercentage:number, isCharging:boolean){
        console.log("isCharging:",isCharging);
        console.log("percent:",batteryPercentage);
        this.batteryIndicator.clear();
        this.batteryIndicator.lineStyle(2, "white", 1);
        this.batteryIndicator.drawRoundedRect(0,0,27, 12, 2);
        this.batteryIndicator.drawRoundedRect(27, 12/4, 2, 12/2, 2);
        this.batteryIndicator.lineStyle(0);
        this.batteryIndicator.beginFill("white");
        this.batteryIndicator.drawRect(1,1,(27-2)*batteryPercentage, 12-2);
    }
    public getGraphic(){
        return this.batteryIndicator;
    }
}