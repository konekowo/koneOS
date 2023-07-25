/* eslint-disable prettier/prettier */

import { FileSystem } from "../../FileSystem";

export class InstallFileSystem {
    public constructor(SetupWindow: HTMLElement, continueButton: HTMLElement) {
        // create screen container
        const screenContainer: HTMLElement = document.createElement("div");
        screenContainer.style.width = "100%";
        screenContainer.style.height = "100%";
        screenContainer.style.position = "absolute";
        screenContainer.style.left = "100%";
        screenContainer.style.top = "0px";
        screenContainer.style.transition = "left 0.8s";
        screenContainer.style.paddingLeft = "40px";
        continueButton.innerText = "Install";
        continueButton.style.transform = "translate(-152%, -140%)";
        SetupWindow.appendChild(screenContainer);
        screenContainer.appendChild(continueButton);

        const title: HTMLElement = document.createElement("h1");
        title.style.position = "relative";
        title.style.top = "10px";
        //title.style.left = "40px";
        title.innerText = "Install File System";
        title.style.fontFamily = "Arial";
        screenContainer.appendChild(title);

        const subTitle: HTMLElement = document.createElement("h3");
        subTitle.style.position = "relative";
        subTitle.innerHTML =
            "To continue, we will need to install necessary files for koneOS into your browser's <a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API'>IndexedDB</a>";
        subTitle.style.fontFamily = "Arial";
        screenContainer.appendChild(subTitle);
        setTimeout(() => {
            screenContainer.style.left = "0px";
        }, 500);

        continueButton.addEventListener("click", handleButtonEvent);

        async function handleButtonEvent() {
            continueButton.removeEventListener("click", handleButtonEvent);
            continueButton.style.display = "none";
            await FileSystem.createFS();

            await FileSystem.createDir("/", "koneOS");
            await FileSystem.createDir("/koneOS/", "user");
            await FileSystem.createDir("/koneOS/", "system");
            await FileSystem.createDir("/koneOS/system/", "assets");
            await FileSystem.createDir("/koneOS/user/", "home");
            await FileSystem.createDir("/koneOS/user/home/", "Desktop");
            await FileSystem.createDir("/koneOS/user/home/", "Documents");
            await FileSystem.createDir("/koneOS/user/home/", "Downloads");
            await window.localStorage.setItem("isSetupDone", "true");
        }
    }
}
