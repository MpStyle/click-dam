import { Image } from "./Image";
import { Pages } from "./Pages";

export interface AppState {
    home: {
        iconsSize: 200 | 300 | 400
        images: Map<string, Image>
        textSearch: string
        isLastPage: boolean
        importing: boolean,
        importedImageCount: number
        totalImageCount: number
        page: number
    },
    edit: {
        imageToEdit: Image
    }
    page: Pages,
}