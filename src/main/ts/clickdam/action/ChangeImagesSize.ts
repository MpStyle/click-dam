import { Action } from "redux";

export const CHANGE_IMAGES_SIZE_TYPE: string = "ChangeImagesSize"

export interface ChangeImagesSize extends Action {
    size: 200 | 300 | 400
}

export const changeImagesSizeBuilder = (size: number): ChangeImagesSize => ({
    type: CHANGE_IMAGES_SIZE_TYPE,
    size: size
} as ChangeImagesSize)