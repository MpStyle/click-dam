import { Action } from "redux";

export const DELETED_IMAGE_TYPE: string = "DeletedImage"

export interface DeletedImage extends Action {
    imageId: string
}

export const deletedImageBuilder = (imageId: string): DeletedImage => ({
    type: DELETED_IMAGE_TYPE,
    imageId: imageId
} as DeletedImage)