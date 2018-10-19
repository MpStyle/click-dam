import { app } from "electron";
import * as fs from "fs";
import { App } from "./book/App";
import { Logger } from "./book/Logger";
import { Main } from "./book/Main";
import { MainWindowBuilder } from "./book/MainWindowBuilder";
import { IPCMain } from "./ipc/IPCMain";
import { ImagePersistence } from "./persistence/ImagePersistence";
import { PreferenceValueType, UserPreferencePersistence } from "./persistence/UserPreferencePersistence";

const logger = new Logger("main")
const catchGetPreference = (err: Error): undefined => { logger.debug(err); return undefined }
let mainWindow: Electron.BrowserWindow;

function createWindow() {
    // Creates app folders
    [Main.userAppConfigurationFolder(), Main.dbFolder(), Main.imageFolder()].forEach((path: string) => {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    })

    // Open the database
    Promise.all([
        ImagePersistence.open(),
        UserPreferencePersistence.open()
    ]).then((persistence: any[]) => {
        const userPreferencePersistence = persistence[1] as UserPreferencePersistence
        const imagePersistence = persistence[0] as ImagePersistence

        // Initializes the IPC listener
        IPCMain.init(imagePersistence);

        // Read some configurations
        Promise.all([
            userPreferencePersistence.get(UserPreferencePersistence.WINDOW_WIDTH).catch(catchGetPreference),
            userPreferencePersistence.get(UserPreferencePersistence.WINDOW_HEIGHT).catch(catchGetPreference),
            userPreferencePersistence.get(UserPreferencePersistence.WINDOW_MAXIMIZED).catch(catchGetPreference),
            userPreferencePersistence.get(UserPreferencePersistence.WINDOW_OFFSET_X).catch(catchGetPreference),
            userPreferencePersistence.get(UserPreferencePersistence.WINDOW_OFFSET_Y).catch(catchGetPreference),
        ]).then((preference: (PreferenceValueType | undefined)[]) => {
            mainWindow = MainWindowBuilder.build(
                preference[0],
                preference[1],
                preference[2],
                preference[3],
                preference[4],
                userPreferencePersistence
            )

            mainWindow.on("closed", () => {
                mainWindow = null;
            });
        }).catch((err) => {
            logger.error("Error while reading user preferences.")
            logger.error(err)
        })
    }).catch((err) => {
        logger.error("Error while open databases.")
        logger.error(err)
    })
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.setName(App.appName())

process.on("uncaughtException", function (e) { console.log(e); });