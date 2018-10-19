import { Action } from "redux";

export const START_IMPORTING_IMAGES_TYPE: string = "StartImportingImages"

export interface StartImportingImages extends Action {
}

export const startImportingImagesBuilder = (): StartImportingImages => ({
    type: START_IMPORTING_IMAGES_TYPE
} as StartImportingImages)