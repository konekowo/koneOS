/* eslint-disable prettier/prettier */

import { FileSystem } from "../../FileSystem";

export class InstallFileSystem {
    public constructor(SetupWindow: HTMLElement, continueButton: HTMLElement) {



        // create screen container
        const screenContainer:HTMLElement = document.createElement("div");
        screenContainer.style.width = "100%";
        screenContainer.style.height = "100%";
        screenContainer.style.position = "absolute";
        screenContainer.style.left = "100%";
        screenContainer.style.top = "0px";
        screenContainer.style.transition = "left 0.8s"
        screenContainer.style.paddingLeft = "40px";
        continueButton.innerText = "Install";
        continueButton.style.transform = "translate(-152%, -140%)"
        SetupWindow.appendChild(screenContainer);
        screenContainer.appendChild(continueButton);

        const title:HTMLElement = document.createElement("h1");
        title.style.position = "relative";
        title.style.top = "10px";
        //title.style.left = "40px";
        title.innerText = "Install File System";
        title.style.fontFamily = "Arial"
        screenContainer.appendChild(title);

        const subTitle:HTMLElement = document.createElement("h3");
        subTitle.style.position = "relative";
        subTitle.innerHTML = "To continue, we will need to install necessary files for koneOS into your browser's <a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API'>IndexedDB</a>";
        subTitle.style.fontFamily = "Arial"
        screenContainer.appendChild(subTitle);
        setTimeout(() => {
            screenContainer.style.left = "0px";
        }, 500);

        continueButton.addEventListener("click", () => {
           continueButton.style.display = "none";
           FileSystem.createFS();

           FileSystem.createDir('/', 'koneOS');
           FileSystem.createDir('/koneOS/', 'user');
           FileSystem.createDir('/koneOS/user/', 'home');
           FileSystem.createDir('/koneOS/user/home/', 'Desktop');
           //FileSystem.createFile('/koneOS/user/home/Desktop/', 'test.txt');
        });
    }
}
