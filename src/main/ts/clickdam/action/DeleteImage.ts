import { Action } from "redux";
import { Image } from "../entity/Image";

export const DELETE_IMAGE_TYPE: string = "DeleteImage"

export interface DeleteImage extends Action {
    image: Image
}

export const deleteImageBuilder = (image: Image): DeleteImage => ({
    type: DELETE_IMAGE_TYPE,
    image: image
} as DeleteImage)