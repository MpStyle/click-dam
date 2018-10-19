import { Image } from "./Image";
import { Pages } from "./Pages";

export interface AppState {
    images: Map<string, Image>
    search: string
    currentImagesPage: number
    isLastPage: boolean
    imageToEdit: Image
    page: Pages,
    importing: boolean,
    importedImageCount: number
    totalImageCount: number
}