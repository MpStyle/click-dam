import { Action } from "redux";
import { Image } from "../entity/Image";

export const EDIT_IMAGE_TYPE: string = "EditImage"

export interface EditImage extends Action {
    image: Image
}

export const editImageBuilder = (image: Image): EditImage => ({
    type: EDIT_IMAGE_TYPE,
    image: image
} as EditImage)