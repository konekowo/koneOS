/* eslint-disable prettier/prettier */
export class Welcome {
    public constructor(SetupWindow: HTMLElement) {
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
        SetupWindow.appendChild(continueButton);
    }
}
