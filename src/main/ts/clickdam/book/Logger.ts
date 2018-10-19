import { leftPadding } from "./StringUtils";

export class Logger {
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    private formatTemplate(message: any, type: string): string | string[] {
        const now = new Date
        const prefix = now.getFullYear() + "-"
            + leftPadding('0', now.getMonth().toString(), 2) + "-"
            + leftPadding('0', now.getDay().toString(), 2) + " "
            + leftPadding('0', now.getHours().toString(), 2) + ":"
            + leftPadding('0', now.getMinutes().toString(), 2) + ":"
            + leftPadding('0', now.getSeconds().toString(), 2) + ","
            + leftPadding('0', now.getMilliseconds().toString(), 3) + " "
            + type.toUpperCase() + " ~ [" + this.prefix + "]";
        if ((typeof message == 'string' || message instanceof String)) {
            return prefix + " " + message
        }
        else {
            return [prefix + ": ", message]
        }
    }

    private print(message: string | string[], type: string, printFunction?: (message?: any, ...optionalParams: any[]) => void) {
        let toPrint = this.formatTemplate(message, type)
        if (printFunction) {
            printFunction(toPrint)
        }
        else {
            console.log(toPrint)
        }
    }

    trace(message: any) {
        this.print(message, 'trace')
    }

    info(message: any) {
        this.print(message, 'info', console.info)
    }

    debug(message: any) {
        this.print(message, 'debug')
    }

    warn(message: any) {
        this.print(message, 'warn', console.warn)
    }

    error(message: any) {
        this.print(message, 'error', console.error)
    }
}