import {CommandManager} from "./CommandManager";
import {Terminal} from "./Terminal";

export class Command{
    protected command!: string;
    public constructor() {
        CommandManager.RegisterCommand(this);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-empty-function
    public onRun(programEndCallback: Function, args:string, terminal:Terminal){

    }


}