/* eslint-disable prettier/prettier */
import { InstallFileSystem } from "./InstalFileSystem";

export class Welcome {
    public constructor(SetupWindow: HTMLElement) {
        //Continue Button ----------------------------------------------------------------
        const continueButton: HTMLElement = document.createElement("button");
        continueButton.innerText = "Continue";
        continueButton.style.fontSize = "1.2rem";
        continueButton.style.color = "white";
        continueButton.style.backgroundColor = "rgb(104,171,243)";
        continueButton.style.border = "none";
        continueButton.style.borderRadius = "0.4rem";
        continueButton.style.width = "7rem";
        continueButton.style.height = "2.5rem";
        continueButton.style.position = "absolute";
        continueButton.style.left = "100%";
        continueButton.style.top = "100%";
        continueButton.style.transform = "translate(-120%, -140%)";
        continueButton.style.transition = "all 0.2s";
        // hover and click animations
        continueButton.addEventListener("mouseenter", () => {
            continueButton.style.backgroundColor = "rgb(124,191,255)";
        });
        continueButton.addEventListener("mouseleave", () => {
            continueButton.style.backgroundColor = "rgb(104,171,243)";
        });
        continueButton.addEventListener("mousedown", () => {
            continueButton.style.backgroundColor = "rgb(84,151,223)";
        });
        continueButton.addEventListener("mouseup", () => {
            continueButton.style.backgroundColor = "rgb(124,191,255)";
        });
        // ----------------------------------------------------------------------------------
        const screenContainer: HTMLElement = document.createElement("div");
        screenContainer.style.width = "100%";
        screenContainer.style.height = "100%";
        screenContainer.style.position = "absolute";
        screenContainer.style.left = "100%";
        screenContainer.style.top = "0px";
        screenContainer.style.transition = "left 0.8s";

        SetupWindow.appendChild(screenContainer);
        screenContainer.appendChild(continueButton);

        const title: HTMLElement = document.createElement("h1");
        title.style.position = "relative";
        title.style.top = "10px";
        title.style.left = "40px";
        title.innerText = "Welcome to koneOS!";
        title.style.fontFamily = "Arial";
        screenContainer.appendChild(title);
        setTimeout(() => {
            screenContainer.style.left = "0px";
        }, 1000);

        continueButton.addEventListener("click", handleButtonEvent);

        function handleButtonEvent() {
            continueButton.removeEventListener("click", handleButtonEvent);
            screenContainer.style.left = "-100%";
            setTimeout(() => {
                // cleanup
                SetupWindow.removeChild(screenContainer);
                // next screen
                new InstallFileSystem(SetupWindow, continueButton);
            }, 800);
        }
    }
}
