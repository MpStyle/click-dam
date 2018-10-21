import { createStore, Store } from "redux";
import { AppState } from "../entity/AppState";
import { Image } from "../entity/Image";
import { Pages } from "../entity/Pages";
import { appReducer } from "../reducer/AppReducer";

export class Renderer {
    public static readonly initialState: AppState = {
        home: {
            iconsSize: 200,
            images: new Map<string, Image>(),
            page: -1,
            isLastPage: false,
            textSearch: '',
            importedImageCount: 0,
            importing: false,
            totalImageCount: 0
        },
        edit: {
            imageToEdit: null,
        },
        page: Pages.HOME,
    } as AppState

    static readonly appStore: Store<AppState> = createStore(
        appReducer,
        Renderer.initialState
    );
}