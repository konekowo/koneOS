/* eslint-disable prettier/prettier */

export class FileSystem {
    public static async createFS() {
        console.warn("Deleting all files in FS and recreating FS in IndexedDB");
        // delete existing database (if there is one)
        const deleteRequest = indexedDB.deleteDatabase("koneOS_FileSystem");
        deleteRequest.onerror = () => {
            console.error("Failed to delete database:", deleteRequest.error);
        };
        deleteRequest.onsuccess = () => {
            console.log("Database deleted successfully!");
        };

        // create new database
        const openRequest = indexedDB.open("koneOS_FileSystem", 1);

        openRequest.onerror = function () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (openRequest.error.message != "The connection was closed.") {
                console.error("Error", openRequest.error);
            }
        };

        openRequest.onupgradeneeded = function () {
            // triggers if the client had no database
            // ...perform initialization...
            const db = openRequest.result;
            db.createObjectStore("koneOS_MainDrive");
            db.close();
        };

        openRequest.onsuccess = function () {
            const db = openRequest.result;
            // continue working with database using db object
            console.error("Database is still there?!?");
            db.close();
        };
    }

    public static async createFile(parentDirectory: string, fileName: string, content: any) {
        this.createRootDirIfThereIsNoRootDir();
        if (parentDirectory.endsWith("/")) {
            parentDirectory = parentDirectory.substring(0, parentDirectory.length - 1);
        }
        const openRequest = indexedDB.open("koneOS_FileSystem", 1);
        openRequest.onsuccess = function () {
            const db = openRequest.result;
            const transaction = db.transaction("koneOS_MainDrive", "readwrite");
            const store = transaction.objectStore("koneOS_MainDrive");

            let dirToCheck = parentDirectory;
            if (parentDirectory != "/") {
                dirToCheck += "/";
            }
            const isDirectory = store.get(dirToCheck);
            isDirectory.onsuccess = () => {
                if (isDirectory.result) {
                    if (isDirectory.result.Directory == false) {
                        console.error(parentDirectory + "/", "is not a directory!");
                    } else {
                        let shouldItUseSlash = "/";
                        if (parentDirectory == "/") {
                            shouldItUseSlash = "";
                        }
                        const request = store.add(
                            { Directory: false, content: content },
                            parentDirectory + shouldItUseSlash + fileName,
                        );
                        request.onsuccess = function () {
                            // (4)
                            console.log("File created!");
                        };

                        request.onerror = function () {
                            console.log("Error when creating file:", request.error);
                        };
                    }
                } else {
                    console.error(parentDirectory + "/", "does not exist!");
                }
            };
            db.close();
        };
        openRequest.onerror = function () {
            console.error("Error when opening indexedDB database:", openRequest.error);
        };
    }

    public static async createDir(parentDirectory: string, dirName: string) {
        this.createRootDirIfThereIsNoRootDir();
        if (parentDirectory != "/") {
            if (parentDirectory.endsWith("/")) {
                parentDirectory = parentDirectory.substring(0, parentDirectory.length - 1);
            }
        }

        const openRequest = indexedDB.open("koneOS_FileSystem", 1);
        openRequest.onsuccess = function () {
            const db = openRequest.result;
            const transaction = db.transaction("koneOS_MainDrive", "readwrite");
            const store = transaction.objectStore("koneOS_MainDrive");
            let dirToCheck = parentDirectory;
            if (parentDirectory != "/") {
                dirToCheck += "/";
            }
            const isDirectory = store.get(dirToCheck);
            isDirectory.onsuccess = () => {
                if (isDirectory.result) {
                    if (isDirectory.result.Directory == false) {
                        console.error(parentDirectory + "/", "is not a directory!");
                    } else {
                        let shouldItUseSlash = "/";
                        if (parentDirectory == "/") {
                            shouldItUseSlash = "";
                        }

                        const request = store.add(
                            { Directory: true },
                            parentDirectory + shouldItUseSlash + dirName + "/",
                        );
                        request.onsuccess = function () {
                            // (4)
                            console.log("Directory created!");
                        };

                        request.onerror = function () {
                            console.log("Error when creating directory:", request.error);
                        };
                    }
                } else {
                    console.error(parentDirectory + "/", "does not exist!");
                }
            };

            db.close();
        };
        openRequest.onerror = function () {
            console.error("Error when opening indexedDB database:", openRequest.error);
        };
    }

    private static createRootDirIfThereIsNoRootDir() {
        const openRequest = indexedDB.open("koneOS_FileSystem", 1);
        openRequest.onsuccess = function () {
            const db = openRequest.result;
            const transaction = db.transaction("koneOS_MainDrive", "readwrite");
            const store = transaction.objectStore("koneOS_MainDrive");
            const isDirectory = store.get("/");
            isDirectory.onsuccess = () => {
                if (!isDirectory.result) {
                    const request = store.add({ Directory: true }, "/");
                    request.onsuccess = function () {
                        // (4)
                        console.log("Directory created!");
                    };

                    request.onerror = function () {
                        console.log("Error when creating directory:", request.error);
                    };
                    db.close();
                }
            };
        };
    }

    public static async writeToFile(pathToFile: string, content: any) {
        this.createRootDirIfThereIsNoRootDir();
        if (pathToFile != "/") {
            if (pathToFile.endsWith("/")) {
                pathToFile = pathToFile.substring(0, pathToFile.length - 1);
            }
        }

        const openRequest = indexedDB.open("koneOS_FileSystem", 1);
        openRequest.onsuccess = function () {
            const db = openRequest.result;
            const transaction = db.transaction("koneOS_MainDrive", "readwrite");
            const store = transaction.objectStore("koneOS_MainDrive");
            console.log("Checking", pathToFile);
            const isFile = store.get(pathToFile);
            isFile.onsuccess = () => {
                if (isFile.result) {
                    if (isFile.result.Directory != false) {
                        console.error(pathToFile, "is not a file!");
                    } else {
                        const request = store.put({ Directory: false, content: content }, pathToFile);

                        request.onsuccess = function () {
                            // (4)
                            console.log("File edited!");
                        };

                        request.onerror = function () {
                            console.log("Error when editing file:", request.error);
                        };
                    }
                } else {
                    console.error(pathToFile, "does not exist!");
                }
            };

            db.close();
        };
        openRequest.onerror = function () {
            console.error("Error when opening indexedDB database:", openRequest.error);
        };
    }

    public static async listDir(directory: string): Promise<IDBRequest<any[]> | undefined> {
        this.createRootDirIfThereIsNoRootDir();
        if (directory != "/") {
            if (directory.endsWith("/")) {
                directory = directory.substring(0, directory.length - 1);
            }
        }

        const openRequest = indexedDB.open("koneOS_FileSystem", 1);
        openRequest.onsuccess = function () {
            const db = openRequest.result;
            const transaction = db.transaction("koneOS_MainDrive", "readwrite");
            const store = transaction.objectStore("koneOS_MainDrive");
            let dirToCheck = directory;
            if (directory != "/") {
                dirToCheck += "/";
            }
            const isDirectory = store.get(dirToCheck);
            isDirectory.onsuccess = () => {
                if (isDirectory.result) {
                    if (isDirectory.result.Directory == false) {
                        console.error(directory + "/", "is not a directory!");
                        return undefined;
                    } else {
                        let shouldItUseSlash = "/";
                        if (directory == "/") {
                            shouldItUseSlash = "";
                        }

                        const query = IDBKeyRange.bound(
                            directory,
                            directory + shouldItUseSlash + "plsworjkplsworkplwoek" + Date.now(),
                        );
                        const request = store.getAll(query);
                        request.onsuccess = function () {
                            // (4)
                            return query;
                        };

                        request.onerror = function () {
                            console.log("Error when listing directory:", request.error);
                            return undefined;
                        };
                    }
                } else {
                    console.error(directory + "/", "does not exist!");
                    return undefined;
                }
            };

            db.close();
        };
        openRequest.onerror = function () {
            console.error("Error when opening indexedDB database:", openRequest.error);
            return undefined;
        };
        return undefined;
    }

    public static async readFromFile(pathToFile: string): Promise<any | undefined> {
        this.createRootDirIfThereIsNoRootDir();
        if (pathToFile != "/") {
            if (pathToFile.endsWith("/")) {
                pathToFile = pathToFile.substring(0, pathToFile.length - 1);
            }
        }

        const openRequest = indexedDB.open("koneOS_FileSystem", 1);
        openRequest.onsuccess = function () {
            const db = openRequest.result;
            const transaction = db.transaction("koneOS_MainDrive", "readwrite");
            const store = transaction.objectStore("koneOS_MainDrive");
            console.log("Checking", pathToFile);
            const isFile = store.get(pathToFile);
            isFile.onsuccess = () => {
                if (isFile.result) {
                    if (isFile.result.Directory != false) {
                        console.error(pathToFile, "is not a file!");
                        return undefined;
                    } else {
                        const request = store.get(pathToFile);

                        request.onsuccess = function () {
                            // (4)
                            console.log("File read!");

                            return request.result.content;
                        };

                        request.onerror = function () {
                            console.log("Error when reading file:", request.error);
                            return undefined;
                        };
                    }
                } else {
                    console.error(pathToFile, "does not exist!");
                    return undefined;
                }
            };

            db.close();
        };
        openRequest.onerror = function () {
            console.error("Error when opening indexedDB database:", openRequest.error);
            return undefined;
        };
    }
}
