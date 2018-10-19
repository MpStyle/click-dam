import { Action } from "redux";

export const END_IMPORTING_IMAGES_TYPE: string = "EndImportingImages"

export interface EndImportingImages extends Action {
    importedImageCount: number
}

export const endImportingImagesBuilder = (importedImageCount: number): EndImportingImages => ({
    type: END_IMPORTING_IMAGES_TYPE,
    importedImageCount: importedImageCount
} as EndImportingImages)