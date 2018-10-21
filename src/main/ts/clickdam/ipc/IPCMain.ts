import { ipcMain, Event } from "electron";
import * as fs from 'fs';
import * as path from "path";
import { Logger } from "../book/Logger";
import { Main } from "../book/Main";
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

        ipcMain.on(ChannelNames.DELETE_IMAGE, (event: Event, image: Image) => {
            Main.thumbSizes().forEach((element: number) => {
                const imageUrl = image.path + path.sep + element + path.sep + image.name;
                fs.unlinkSync(imageUrl)
            });
            imagePersistence.delete(image.id).then((result: boolean) => {
                if (result) {
                    event.sender.send(ChannelNames.DELETED_IMAGE, image.id)
                }
            })
        })

        ipcMain.on(ChannelNames.UPDATE_IMAGE, (event: Event, image: Image) => {
            imagePersistence.update(image)
        })
    }
}
