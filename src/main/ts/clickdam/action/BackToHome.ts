import { Action } from "redux";

export const BACK_TO_HOME_TYPE: string = "BackToHome"

export interface BackToHome extends Action {
}

export const backToHomeBuilder = (): BackToHome => ({
    type: BACK_TO_HOME_TYPE
} as BackToHome)