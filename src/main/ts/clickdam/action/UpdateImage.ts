import { Action } from "redux";
import { Image } from "../entity/Image";

export const UPDATE_IMAGE_TYPE: string = "UpdateImage"

export interface UpdateImage extends Action {
    image: Image
}

export const updateImageBuilder = (image: Image): UpdateImage => ({
    type: UPDATE_IMAGE_TYPE,
    image: image
} as UpdateImage)