import { ipcRenderer, Event } from "electron";
import { Dispatch } from "redux";
import { deletedImageBuilder } from "../action/DeletedImage";
import { endImportingImagesBuilder } from "../action/EndImportingImages";
import { findedImagesBuilder } from "../action/FindedImages";
import { startImportingImagesBuilder } from "../action/StartImportingImages";
import { Logger } from "../book/Logger";
import { FindedImagesResponse } from "../entity/FindedImagesResponse";
import { Image } from "../entity/Image";
import { ImagesFilter } from "../entity/ImagesFilter";
import { ChannelNames } from "./ChannelNames";

const logger = new Logger("IPCRenderer")

export class IPCRenderer {
    static init = (dispatch: Dispatch) => {
        ipcRenderer.on(ChannelNames.FINDED_IMAGES, (event: Event, findedImages: FindedImagesResponse) => {
            dispatch(findedImagesBuilder(findedImages))
        }).on(ChannelNames.END_IMPORTING_IMAGES, (event: Event, arg: number) => {
            dispatch(endImportingImagesBuilder(arg))
        }).on(ChannelNames.START_IMPORTING_IMAGES, (event: Event, arg: any) => {
            dispatch(startImportingImagesBuilder())
        }).on(ChannelNames.DELETED_IMAGE, (event: Event, imageId: string) => {
            dispatch(deletedImageBuilder(imageId))
        })
    }

    static sendUpdateImage(image: Image) {
        ipcRenderer.send(ChannelNames.UPDATE_IMAGE, image)
    }

    static sendFindImages(filter: ImagesFilter) {
        ipcRenderer.send(ChannelNames.FIND_IMAGES, filter)
    }

    static sendDeleteImage(image: Image) {
        ipcRenderer.send(ChannelNames.DELETE_IMAGE, image)
    }
}