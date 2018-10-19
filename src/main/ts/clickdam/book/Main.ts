import * as os from "os"
import * as path from "path"
import { App } from "./App";

export class Main {
    /**
     * Returns the configuration folder of the app for the current user
     * OS X - '/Users/user/Library/Preferences'
     * Windows 8 - 'C:\Users\User\AppData\Roaming'
     * Windows XP - 'C:\Documents and Settings\User\Application Data'
     * Linux - '/var/local'
     */
    static userAppConfigurationFolder = (): string => {
        switch (process.platform) {
            case 'darwin': return os.homedir() + '/Library/Preferences' + "/" + App.appName()
            case 'linux': return os.homedir() + "/." + App.appName().toLowerCase()
            case 'win32': return process.env.APPDATA + "/" + App.appName()
            default: return "./" + App.appName()
        }
    }

    static dbFolder = () => (Main.userAppConfigurationFolder() + path.sep + "databases")

    static imageFolder = () => (Main.userAppConfigurationFolder() + path.sep + "images")

    static pageSize = (): number => (25)

    static thumbSizes = (): number[] => ([100, 200, 300, 400, 500])

    static defaultWindowHeight = (): number => (600)
    static defaultHeightWidth = (): number => (800)
}