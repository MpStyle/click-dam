import { createStore, Store } from "redux";
import { AppState } from "../entity/AppState";
import { Image } from "../entity/Image";
import { Pages } from "../entity/Pages";
import { appReducer } from "../reducer/AppReducer";

export class Renderer {
    public static readonly initialState: AppState = {
        images: new Map<string, Image>(),
        currentImagesPage: -1,
        isLastPage: false,
        page: Pages.HOME,
        imageToEdit: null,
        search: '',
        importedImageCount: 0,
        importing: false,
        totalImageCount: 0
    } as AppState

    static readonly appStore: Store<AppState> = createStore(
        appReducer,
        Renderer.initialState
    );
}