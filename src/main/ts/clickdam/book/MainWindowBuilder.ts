import { BrowserWindow, Menu } from "electron";
import * as path from "path";
import { PreferenceValueType, UserPreferencePersistence } from "../persistence/UserPreferencePersistence";
import { App } from "./App";
import { Main } from "./Main";

export class MainWindowBuilder {
    static build(
        width: PreferenceValueType,
        height: PreferenceValueType,
        isMaximized: PreferenceValueType,
        x: PreferenceValueType,
        y: PreferenceValueType,
        userPreferencePersistence: UserPreferencePersistence
    ): BrowserWindow {
        let mainWindow = new BrowserWindow({
            height: height as number || Main.defaultWindowHeight(),
            width: width as number || Main.defaultHeightWidth(),
            x: x as number || undefined,
            y: y as number || undefined,
            title: App.appName(),
        });

        mainWindow.loadFile(path.join(process.cwd(), "dist/index.html"));

        mainWindow.webContents.openDevTools();

        if (isMaximized) {
            mainWindow.maximize()
        }

        mainWindow.on("resize", () => {
            userPreferencePersistence.put(UserPreferencePersistence.WINDOW_HEIGHT, mainWindow.getSize()[1])
            userPreferencePersistence.put(UserPreferencePersistence.WINDOW_WIDTH, mainWindow.getSize()[0])
        });

        mainWindow.on("maximize", () => {
            userPreferencePersistence.put(UserPreferencePersistence.WINDOW_MAXIMIZED, mainWindow.isMaximized())
        });

        mainWindow.on("unmaximize", () => {
            userPreferencePersistence.put(UserPreferencePersistence.WINDOW_MAXIMIZED, mainWindow.isMaximized())
        });

        mainWindow.on("move", () => {
            userPreferencePersistence.put(UserPreferencePersistence.WINDOW_OFFSET_X, mainWindow.getPosition()[0])
            userPreferencePersistence.put(UserPreferencePersistence.WINDOW_OFFSET_Y, mainWindow.getPosition()[1])
        });

        mainWindow.on("moved", () => {
            userPreferencePersistence.put(UserPreferencePersistence.WINDOW_OFFSET_X, mainWindow.getPosition()[0])
            userPreferencePersistence.put(UserPreferencePersistence.WINDOW_OFFSET_Y, mainWindow.getPosition()[1])
        });

        Menu.setApplicationMenu(Menu.buildFromTemplate([
            {
                label: 'File',
                submenu: [
                    {
                        role: 'close'
                    },
                    {
                        role: 'quit'
                    },
                ]
            }
        ]));

        return mainWindow;
    }
}