import { ImageStatus } from "./ImageStatus";

export interface Image {
    id: string
    name: string
    originalFileName: string
    path: string
    description: string
    keywords: string[]
    geoLocation: string
    width: number
    height: number
    status: ImageStatus
    scheduledPublishingDate: number
    publishDate: number
}