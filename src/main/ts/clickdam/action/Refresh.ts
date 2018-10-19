import { Action } from "redux";

export const EMPTY_IMAGES_VIEW_TYPE: string = "EmptyImagesView"

export interface EmptyImagesView extends Action {
}

export const emptyImagesViewBuilder = (): EmptyImagesView => ({
    type: EMPTY_IMAGES_VIEW_TYPE
} as EmptyImagesView)