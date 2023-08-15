import { InstallFileSystem } from "./InstalFileSystem";
import * as Showdown from "showdown";

export class EULA {
    public constructor(SetupWindow: HTMLElement, continueButton: HTMLElement) {
        const screenContainer: HTMLElement = document.createElement("div");
        screenContainer.style.width = "100%";
        screenContainer.style.height = "100%";
        screenContainer.style.position = "absolute";
        screenContainer.style.left = "100%";
        screenContainer.style.top = "0px";
        screenContainer.style.transition = "left 0.8s";
        screenContainer.style.paddingLeft = "40px";
        continueButton.innerText = "Accept";
        continueButton.style.transform = "translate(-152%, -140%)";
        SetupWindow.appendChild(screenContainer);

        const title: HTMLElement = document.createElement("h1");
        title.style.position = "relative";
        title.style.top = "10px";
        //title.style.left = "40px";
        title.innerText = "End-User Licence Agreement (EULA)";
        title.style.fontFamily = "Arial";
        screenContainer.appendChild(title);

        const subTitle: HTMLElement = document.createElement("h3");
        subTitle.style.position = "relative";
        subTitle.innerHTML = "To continue, you will need to accept out End-User Licence Agreement (EULA)";
        subTitle.style.fontFamily = "Arial";
        screenContainer.appendChild(subTitle);
        setTimeout(() => {
            screenContainer.style.left = "0px";
        }, 500);

        const eulaContainer: HTMLElement = document.createElement("div");
        eulaContainer.style.width = "75%";
        eulaContainer.style.height = "65%";
        eulaContainer.style.position = "relative";
        eulaContainer.style.left = "0px";
        eulaContainer.style.transition = "left 0.8s";
        eulaContainer.style.paddingTop = "3px";
        eulaContainer.style.paddingLeft = "20px";
        eulaContainer.style.backgroundColor = "rgb(241, 241, 241)";
        eulaContainer.style.boxShadow = "inset 0px 0px 15px gray";
        eulaContainer.style.borderRadius = "5px";
        eulaContainer.style.overflowWrap = "normal";
        eulaContainer.style.overflowY = "scroll";
        eulaContainer.style.color = "gray";
        eulaContainer.style.fontFamily = "arial";

        screenContainer.appendChild(eulaContainer);
        const showdownConverter = new Showdown.Converter();

        const mdFile =
            "" +
            "## End User License Agreement (EULA) for koneOS:\n" +
            "\n" +
            '##### PLEASE READ THIS END USER LICENSE AGREEMENT ("EULA") CAREFULLY BEFORE USING KONEOS. BY USING THE WEB APP, YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS OF THIS EULA. IF YOU DO NOT AGREE TO THE TERMS OF THIS EULA, DO NOT USE THE WEB APP.\n' +
            "\n" +
            "1. License Grant:\n" +
            '    * Subject to the terms of this EULA, "kone" ("Owner and Developer of koneOS") hereby grants you a limited, non-exclusive, non-transferable, and revocable license to use koneOS solely for personal, non-commercial purposes.\n' +
            "\n" +
            "2. Responsibility at Work/School:\n" +
            '    * You acknowledge and agree that your use of koneOS at work or school is solely at your own risk. You are responsible for ensuring that the use of koneOS complies with the policies and regulations of your workplace or educational institution. "kone" shall not be held responsible for any consequences arising from your use of koneOS in violation of such policies or regulations.\n' +
            "\n" +
            "3. Personal Files Storage:\n" +
            "    * koneOS stores your personal files within your browser's local storage and does not transmit them to any external server. However, you are responsible for regularly backing up your files as koneOS cannot guarantee the safety of your data in case of browser issues or updates.\n" +
            "\n" +
            "4. No Keystroke Logging or Password Theft:\n" +
            '    * koneOS, as provided by "kone" and not modified by any other party, does not log keystrokes or attempt to steal passwords. "kone" is committed to maintaining the privacy and security of your data while using the Web App.\n' +
            "\n" +
            "5. Open Source Nature and Security Risks:\n" +
            '    * koneOS is an open-source web app, and its code is accessible to the public. While "kone" ensures the integrity and safety of the original version of koneOS, any modifications made to koneOS by other individuals or entities are beyond "kone\'s" control. Consequently, if the web app is hosted on another domain or modified by anyone other than "kone," there may be potential security risks or malicious intent. By using koneOS, you understand and agree that "kone" shall not be held liable for any harm, damage, or losses resulting from such modifications or external hosting.\n' +
            "\n" +
            "6. Termination:\n" +
            '    * This EULA is effective until terminated by you or "kone." Your rights under this license will terminate automatically without notice from "kone" if you fail to comply with any term of this EULA. Upon termination, you must cease all use of koneOS and destroy all copies of the Web App in your possession.\n' +
            "\n" +
            "7. Disclaimer of Warranty:\n" +
            '    * THE WEB APP IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, "KONE" DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. "KONE" DOES NOT WARRANT THAT THE WEB APP WILL BE UNINTERRUPTED OR ERROR-FREE OR THAT DEFECTS IN THE WEB APP WILL BE CORRECTED. YOU ASSUME THE ENTIRE RISK AS TO THE RESULTS AND PERFORMANCE OF THE WEB APP.\n' +
            "\n" +
            "8. Limitation of Liability:\n" +
            '    * TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL "KONE" BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE WEB APP, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL "KONE\'S" TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT YOU PAID (IF ANY) FOR ACCESSING THE WEB APP.\n' +
            "\n" +
            "9. Governing Law and Jurisdiction:\n" +
            "    * This EULA shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any dispute arising out of or in connection with this EULA shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].\n" +
            "\n" +
            "##### By using koneOS, you acknowledge that you have read and understood this EULA and agree to be bound by its terms and conditions. If you do not agree with any part of this EULA, you must not use the koneOS Web App.";

        const mdhtml = showdownConverter.makeHtml(mdFile);
        eulaContainer.innerHTML = mdhtml;

        screenContainer.innerHTML +=
            "" +
            '<input type="checkbox" id="eulaAgreeCheck" style=\'margin-top: 10px\'>' +
            "<label for=\"eulaAgreeCheck\" style='font-family: Arial;'>By checking this box, you agree that you have read the End-User Agreement above and that you understand it.</label>";

        screenContainer.appendChild(continueButton);
        continueButton.addEventListener("click", handleButtonEvent);
        const warning = document.createElement("p");
        warning.style.color = "red";
        warning.style.fontFamily = "arial";
        warning.id = "checkBoxWarning";
        warning.innerText = "You must check this checkbox first!";
        function handleButtonEvent() {
            const eulaAgreeCheckBox = document.getElementById("eulaAgreeCheck");
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (eulaAgreeCheckBox.checked == true) {
                continueButton.removeEventListener("click", handleButtonEvent);
                screenContainer.style.left = "-100%";
                setTimeout(() => {
                    // cleanup
                    SetupWindow.removeChild(screenContainer);
                    // next screen
                    new InstallFileSystem(SetupWindow, continueButton);
                }, 800);
            } else {
                if (document.querySelector("#checkBoxWarning") === null) {
                    screenContainer.appendChild(warning);
                }
            }
        }
    }
}
