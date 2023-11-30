import {Command} from "../../Command";
import {Terminal} from "../../Terminal";
import {FileSystem} from "../../../../FileSystem";
export class CommandCD extends Command{
    public constructor() {
        super();
        this.command = "cd";
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public onRun(programEndCallback: Function, args:string, terminal:Terminal){
        const dirToChangeTo = args.split(" ")[0];
        terminal.SetWorkingDirectory(dirToChangeTo);
    }
}

new CommandCD();