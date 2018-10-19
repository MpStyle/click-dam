import { Action } from "redux";
import { FindedImagesResponse } from "../entity/FindedImagesResponse";
import { Image } from "../entity/Image";

export const FINDED_IMAGES_TYPE: string = "FindedImages"

export interface FindedImages extends Action {
    type: string
    images: Image[]
    count: number
}

export const findedImagesBuilder = (findedImages: FindedImagesResponse): FindedImages => ({
    type: FINDED_IMAGES_TYPE,
    images: findedImages.images,
    count: findedImages.count
} as FindedImages)