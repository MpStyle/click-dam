import { Action } from "redux";
import { Image } from "../entity/Image";

export const NEXT_PAGE_IMAGES_TYPE: string = "NextPageImages"

export interface NextPageImages extends Action {
    type: string
    images: Image[]
}

export const nextPageImagesBuilder = (): NextPageImages => ({
    type: NEXT_PAGE_IMAGES_TYPE
} as NextPageImages)