import { dialog, nativeImage, Event, FileFilter } from "electron";
import * as fs from 'fs';
import * as path from "path";
import { Image } from "../entity/Image";
import { ImageStatus } from "../entity/ImageStatus";
import { SupportedMimeTypes } from "../entity/SupportedMimeTypes";
import { ChannelNames } from "../ipc/ChannelNames";
import { ImagePersistence } from "../persistence/ImagePersistence";
import { Logger } from "./Logger";
import { Main } from "./Main";
import { UUID } from "./UUID";

export class PathsImporter {
    private keys = Object.keys(SupportedMimeTypes).filter(k => typeof SupportedMimeTypes[k as any] === "string");
    private values = this.keys.map(k => SupportedMimeTypes[k as any]);
    private logger = new Logger("PathsImporter")
    private imagePersistence: ImagePersistence

    constructor(imagePersistence: ImagePersistence) {
        this.imagePersistence = imagePersistence
    }

    importPaths = (event: Event, _arg: any) => {
        const me = this;
        const paths = dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory', 'multiSelections'],
            filters: [{
                extensions: ['png', 'jpg', 'jpeg']
            } as FileFilter]
        })

        if (!paths || paths.length == 0) {
            return event.sender.send(ChannelNames.END_IMPORTING_IMAGES, 0)
        }

        // Notifies to renderer process that the importing is started
        event.sender.send(ChannelNames.START_IMPORTING_IMAGES)

        // Importing
        return Promise.all(
            paths.map((path: string) => {
                if (fs.lstatSync(path).isDirectory()) {
                    return me.importFolder(path, false)
                }
                else {
                    return me.importFile(path)
                }
            })
        ).then((importedFileCount: number[]) => {
            let importedFile = importedFileCount.reduce((a: number, b: number) => (a + b))

            // Notifies to renderer process that the importing is ended and the number of imported images
            event.sender.send(ChannelNames.END_IMPORTING_IMAGES, importedFile)
            me.logger.info("importedFiles: " + importedFile)
        }).catch((err: Error) => {
            me.logger.error(err)
        })
    }

    private importFolder = (folderPath: string, recursivelly: boolean): Promise<number> => {
        const me = this
        return new Promise<number>((resolve, reject) => {
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    reject(err)
                }

                let importedFiles: Promise<number>[] = []
                files.forEach(file => {
                    const filePath = path.join(folderPath, file)

                    if (fs.lstatSync(filePath).isDirectory() && recursivelly) {
                        importedFiles.push(me.importFolder(filePath, recursivelly))
                    }
                    else {
                        importedFiles.push(me.importFile(filePath))
                    }
                });

                resolve(
                    Promise.all(importedFiles)
                        .then((importedFileCount: number[]) => {
                            return importedFileCount.reduce((a: number, b: number) => (a + b))
                        })
                        .catch((err: Error) => {
                            me.logger.error(err)
                            return 0
                        })
                )
            })
        })
    }

    private importFile = (filePath: string): Promise<number> => {
        const me = this
        return new Promise<number>((resolve, _reject) => {
            const extension = /[^.]+$/.exec(filePath)

            if (me.values.indexOf("image/" + extension) == -1) {
                return resolve(0);
            }

            const id = UUID.create()
            const newFileName = id + "." + extension
            const newFileCompletePath = Main.imageFolder() + path.sep + newFileName
            const newFilePath = Main.imageFolder()

            // copy file
            fs.createReadStream(filePath).pipe(fs.createWriteStream(newFileCompletePath));

            const imageSize = nativeImage.createFromPath(filePath).getSize()

            // save to db
            me.imagePersistence.insert({
                description: '',
                id: id,
                name: newFileName,
                originalFileName: path.basename(filePath),
                path: newFilePath,
                keywords: [],
                geoLocation: '',
                width: imageSize.width,
                height: imageSize.height,
                status: ImageStatus.NONE
            } as Image)
                .then((image: Image) => {
                    Main.thumbSizes().map((size: number) => {
                        let thumbFolder = Main.imageFolder() + path.sep + size
                        if (!fs.existsSync(thumbFolder)) {
                            fs.mkdirSync(thumbFolder)
                        }
                        let img = nativeImage.createFromPath(filePath)

                        if (imageSize.width > size) {
                            img = img.resize({ width: size })
                        }

                        if (imageSize.height > size) {
                            img = img.resize({ height: size })
                        }

                        const buffer = img.toJPEG(100)

                        const thumbFileName = id + "." + extension
                        const thumbCompletePath = thumbFolder + path.sep + thumbFileName
                        fs.writeFileSync(thumbCompletePath, buffer)

                        return resolve(1)
                    })
                })
                .catch((err) => {
                    me.logger.error(err)
                    return resolve(0)
                });
        })
    }
}
