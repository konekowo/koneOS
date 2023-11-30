import { FileSystem } from "../../FileSystem";
import { SetupUsers } from "./SetupUsers";

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
            screenContainer.removeChild(continueButton);
            screenContainer.innerHTML +=
                "" +
                "<div id='fakeConsole' " +
                'style=\'font-family: "JetBrains Mono Medium";' +
                "color: rgb(200, 200, 200);" +
                "background-color: rgb(41,38,49);" +
                "border-radius: 5px;" +
                "width: 75%;" +
                "height: 60%;" +
                "position: relative;" +
                "padding: 5px;" +
                "padding-left: 25px;" +
                "overflow-wrap: normal;" +
                "overflow-y: scroll;'></div>";
            const fakeConsole = await document.getElementById("fakeConsole");
            await FileSystem.createFS();
            fakeConsole.innerHTML +=
                "<p class='fakeConsole Text'>Created koneOS File System! (And deleted the previous File System if there was one)</p>";
            await FileSystem.createDir("/", "koneOS");
            fakeConsole.innerHTML += "<p class='fakeConsole Text'>Created /koneOS/ directory</p>";
            await FileSystem.createDir("/koneOS/", "user");
            fakeConsole.innerHTML += "<p class='fakeConsole Text'>Created /koneOS/user/ directory</p>";
            await FileSystem.createDir("/koneOS/", "system");
            fakeConsole.innerHTML += "<p class='fakeConsole Text'>Created /koneOS/system/ directory</p>";
            await FileSystem.createDir("/koneOS/system/", "assets");
            await FileSystem.createDir("/koneOS/system/assets/", "fonts");
            fakeConsole.innerHTML += "<p class='fakeConsole Text'>Created /koneOS/system/assets directory</p>";
            await FileSystem.createDir("/koneOS/user/", "home");
            fakeConsole.innerHTML += "<p class='fakeConsole Text'>Created /koneOS/user/home/ directory</p>";
            await FileSystem.createDir("/koneOS/user/home/", "Desktop");
            fakeConsole.innerHTML += "<p class='fakeConsole Text'>Created /koneOS/user/home/Desktop/ directory</p>";
            await FileSystem.createDir("/koneOS/user/home/", "Documents");
            fakeConsole.innerHTML += "<p class='fakeConsole Text'>Created /koneOS/user/home/Documents/ directory</p>";
            await FileSystem.createDir("/koneOS/user/home/", "Downloads");
            fakeConsole.innerHTML += "<p class='fakeConsole Text'>Created /koneOS/user/home/Downloads/ directory</p>";
            await FileSystem.createDir("/koneOS/system/", "apps");
            await FileSystem.createDir("/koneOS/system/apps/", "FileExplorer");
            await FileSystem.createDir("/koneOS/system/apps/FileExplorer", "resources");
            fakeConsole.innerHTML += "<p class='fakeConsole Text'>Created /koneOS/system/apps/ directory</p>";
            fakeConsole.innerHTML += "<p class='fakeConsole Text'>Done!</p>";


            InstallFileSystem.downloadAndInstallFile("./assets/testAppIcon.png", "/koneOS/system/assets/", "testAppIcon.png");
            InstallFileSystem.downloadAndInstallFile("./assets/default_background.jpg", "/koneOS/system/assets/", "default_wallpaper.jpg");
            InstallFileSystem.downloadAndInstallFile("./assets/AppResources/FileExplorer/fileExplore.html", "/koneOS/system/apps/FileExplorer/resources/", "fileExplore.html");


            //await window.localStorage.setItem("isSetupDone", "true");
            screenContainer.appendChild(continueButton);
            continueButton.innerText = "Continue";
            continueButton.addEventListener("click", handleButtonEvent2);
            function handleButtonEvent2() {
                continueButton.removeEventListener("click", handleButtonEvent2);
                screenContainer.style.left = "-100%";
                setTimeout(() => {
                    // cleanup
                    SetupWindow.removeChild(screenContainer);
                    // next screen
                    new SetupUsers(SetupWindow, continueButton);
                }, 800);
            }
            /*
            // test
            await FileSystem.listDir("/koneOS/").then((results)=>{
                console.log(results);
            });

 */
        }
    }

    private static downloadAndInstallFile(path:string, fsPath:string, fileName:string){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
        xhr.responseType = "blob";
        xhr.send();

        xhr.onload = async () => {
            await FileSystem.createFile(fsPath, fileName, xhr.response);
        }
    }
}
