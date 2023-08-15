import sha256 from "crypto-js/sha256";
export class SetupUsers {
    public constructor(SetupWindow: HTMLElement, continueButton: HTMLElement) {
        const screenContainer: HTMLElement = document.createElement("div");
        screenContainer.style.width = "100%";
        screenContainer.style.height = "100%";
        screenContainer.style.position = "absolute";
        screenContainer.style.left = "100%";
        screenContainer.style.top = "0px";
        screenContainer.style.transition = "left 0.8s";
        //screenContainer.style.paddingLeft = "40px";
        continueButton.innerText = "Continue";
        continueButton.style.transform = "translate(-115%, -140%)";
        SetupWindow.appendChild(screenContainer);

        const title: HTMLElement = document.createElement("h1");
        title.style.position = "relative";
        title.style.top = "10px";
        title.style.marginLeft = "40px";
        //title.style.left = "40px";
        title.innerText = "User";
        title.style.fontFamily = "Arial";
        screenContainer.appendChild(title);

        const subTitle: HTMLElement = document.createElement("h3");
        subTitle.style.position = "relative";
        subTitle.innerHTML = "Configure User Settings";
        subTitle.style.marginLeft = "40px";
        subTitle.style.fontFamily = "Arial";
        screenContainer.appendChild(subTitle);
        setTimeout(() => {
            screenContainer.style.left = "0px";
        }, 500);
        screenContainer.innerHTML +=
            "" +
            "<div id='pfp' style='overflow: hidden; position: relative; width: 100px; height: 100px; border-radius: 100px; background-color: #cfcfcf; left: 50%; top:10%; transform: translate(-50%)'>" +
            "   <div id='head' style='background-color: gray; position: absolute; top: 20%; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; border-radius: 40px;'></div>" +
            "   <div id='body' style=\"\n" +
            "    position: absolute;\n" +
            "    top: 65%;\n" +
            "    left: 50%;\n" +
            "    width: 100px;\n" +
            "    height: 100px;\n" +
            "    border-radius: 100px;\n" +
            "    background-color: gray;\n" +
            "    transform: translate(-50%);\n" +
            '"></div>' +
            "</div>" +
            "<input type='text' id='userName' placeholder='User Name' style='background-color: #d2d2d2; height: 30px; position: relative; left: 50%; transform: translate(-50%, 100px); border-radius: 5px; border: none; padding: 3px;'>" +
            "<br>" +
            "<input type='password' id='password' maxlength='31' placeholder='Password' style='background-color: #d2d2d2; height: 30px; position: relative; left: 50%; transform: translate(-50%, 120px); border-radius: 5px; border: none; padding: 3px;'>";

        screenContainer.appendChild(continueButton);

        continueButton.addEventListener("click", handleButtonEvent);
        function handleButtonEvent() {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (document.getElementById("userName").value != "" && document.getElementById("password").value != "") {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const username = document.getElementById("userName").value;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const password = sha256(document.getElementById("password").value).toString();

                continueButton.removeEventListener("click", handleButtonEvent);
                screenContainer.style.left = "-100%";
                window.localStorage.setItem("isSetupDone", "true");
                window.localStorage.setItem("username", username);
                window.localStorage.setItem("password", password);

                setTimeout(() => {
                    // cleanup
                    SetupWindow.removeChild(screenContainer);
                    window.location.href = window.location.href;
                }, 800);
            }
        }
    }
}
