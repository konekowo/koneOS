import {Command} from "./Command";

export class CommandManager{
    private static commands: Array<Command> = new Array<Command>();
    public static GetCommandList(): Array<Command>{
        return this.commands;
    }
    public static RegisterCommand(command:Command):void {
        this.commands.push(command);
    }

}
