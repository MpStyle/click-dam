import { Action } from "redux";
import { BACK_TO_HOME_TYPE } from "../action/BackToHome";
import { ChangeImagesSize, CHANGE_IMAGES_SIZE_TYPE } from "../action/ChangeImagesSize";
import { EditImage, EDIT_IMAGE_TYPE } from "../action/EditImage";
import { EndImportingImages, END_IMPORTING_IMAGES_TYPE } from "../action/EndImportingImages";
import { FindedImages, FINDED_IMAGES_TYPE } from "../action/FindedImages";
import { NEXT_PAGE_IMAGES_TYPE } from "../action/NextPageImages";
import { EMPTY_IMAGES_VIEW_TYPE } from "../action/Refresh";
import { START_IMPORTING_IMAGES_TYPE } from "../action/StartImportingImages";
import { TextSearch, TEXT_SEARCH_TYPE } from "../action/TextSearch";
import { UpdateImage, UPDATE_IMAGE_TYPE } from "../action/UpdateImage";
import { Renderer } from "../book/Renderer";
import { AppState } from "../entity/AppState";
import { Image } from "../entity/Image";
import { ImagesFilter } from "../entity/ImagesFilter";
import { Pages } from "../entity/Pages";
import { IPCRenderer } from "../ipc/IPCRenderer";

// const logger = new Logger("AppReducer")

export const appReducer = (state: AppState = Renderer.initialState, action: Action): AppState => {
    const newState = fetchNewState(state, action)
    return newState
}

const fetchNewState = (state: AppState = Renderer.initialState, action: Action): AppState => {
    switch (action.type) {
        case CHANGE_IMAGES_SIZE_TYPE:
            let changeImagesSize = action as ChangeImagesSize

            return {
                ...state,
                home: {
                    ...state.home,
                    iconsSize: changeImagesSize.size
                }
            } as AppState
        case TEXT_SEARCH_TYPE:
            let textSearchAction = action as TextSearch

            IPCRenderer.sendFindImages({
                page: 0,
                text: textSearchAction.text
            } as ImagesFilter)

            return {
                ...state,
                currentImagesPage: -1,
                images: new Map<string, Image>(),
                search: textSearchAction.text
            } as AppState
        case UPDATE_IMAGE_TYPE:
            let images01: Map<string, Image> = new Map(state.images);
            let updateImageAction = action as UpdateImage

            images01.set(updateImageAction.image.id, updateImageAction.image)

            IPCRenderer.sendUpdateImage(updateImageAction.image)

            return {
                ...state,
                images: images01,
            }
        case EMPTY_IMAGES_VIEW_TYPE:
            return {
                ...state,
                images: new Map<string, Image>(),
                isLastPage: false,
                currentImagesPage: -1,
                importedImageCount: 0
            }
        case START_IMPORTING_IMAGES_TYPE:
            return {
                ...state,
                importing: true
            }
        case END_IMPORTING_IMAGES_TYPE:
            let endImportingImagesAction = action as EndImportingImages

            return {
                ...state,
                importing: false,
                importedImageCount: endImportingImagesAction.importedImageCount
            }
        case NEXT_PAGE_IMAGES_TYPE:
            if (!state.isLastPage) {
                const nextImagesPage = state.currentImagesPage + 1

                IPCRenderer.sendFindImages({
                    page: nextImagesPage,
                    text: state.search
                } as ImagesFilter)

                return {
                    ...state,
                    currentImagesPage: nextImagesPage,
                    isLastPage: true
                }
            }

            return state
        case FINDED_IMAGES_TYPE:
            let images02: Map<string, Image> = new Map(state.images);
            let findedImagesAction = action as FindedImages

            findedImagesAction.images.forEach((image: Image) => {
                images02.set(image.id, image)
            });

            return {
                ...state,
                images: images02,
                isLastPage: findedImagesAction.images.length == 0,
                totalImageCount: findedImagesAction.count
            } as AppState
        case EDIT_IMAGE_TYPE:
            let editImageAction = action as EditImage
            return {
                ...state,
                imageToEdit: editImageAction.image,
                page: Pages.EDIT
            }
        case BACK_TO_HOME_TYPE:
            return {
                ...state,
                page: Pages.HOME
            }
    }

    return state;
}