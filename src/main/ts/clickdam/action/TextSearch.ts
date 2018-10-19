import { Action } from "redux";

export const TEXT_SEARCH_TYPE: string = "TextSearch"

export interface TextSearch extends Action {
    text: string
}

export const textSearchBuilder = (text: string): TextSearch => ({
    type: TEXT_SEARCH_TYPE,
    text: text
} as TextSearch)