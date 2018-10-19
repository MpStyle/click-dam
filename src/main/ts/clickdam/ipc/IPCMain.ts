import { ipcMain, Event } from "electron";
import { Logger } from "../book/Logger";
import { PathsImporter } from "../book/PathsImporter";
import { FindedImagesResponse } from "../entity/FindedImagesResponse";
import { Image } from "../entity/Image";
import { ImagesFilter } from "../entity/ImagesFilter";
import { ImagePersistence } from "../persistence/ImagePersistence";
import { ChannelNames } from "./ChannelNames";

const logger = new Logger("IPCMain")

export class IPCMain {
    static init = (imagePersistence: ImagePersistence) => {
        ipcMain
            .on(ChannelNames.SHOW_OPEN_DIALOG, (event: Event, args: any) => {
                new PathsImporter(imagePersistence).importPaths(event, args)
            });

        ipcMain.on(ChannelNames.FIND_IMAGES, (event: Event, filter: ImagesFilter) => {
            Promise.all([
                imagePersistence.find(filter),
                imagePersistence.count()
            ]).then((values: any[]) => {
                event.sender.send(ChannelNames.FINDED_IMAGES, {
                    images: values[0],
                    count: values[1]
                } as FindedImagesResponse)
            }).catch((err: Error) => {
                logger.error(err)
            })
        })

        ipcMain.on(ChannelNames.UPDATE_IMAGE, (event: Event, image: Image) => {
            imagePersistence.update(image)
        })
    }
}
