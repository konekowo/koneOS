export class Terminal {
    private workingDirectory = "/home/user/";

    public SetWorkingDirectory(workingDirectory:string) {
        this.workingDirectory = workingDirectory;
    }

    public GetWorkingDirectory():string {
        return this.workingDirectory;
    }
}