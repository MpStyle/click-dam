import { connect } from "react-redux";
import { AppState } from "../entity/AppState";
import ImagesView, { ImagesViewProps } from "./ImagesView";

export const ImagesViewContainer = connect<ImagesViewProps, ImagesViewProps>(
    (state: AppState): ImagesViewProps => {
        return {
            images: Array.from(state.images.values()),
            loadedImageCount: Array.from(state.images.values()).length,
            totalImageCount: state.totalImageCount,
        } as ImagesViewProps;
    }
)(ImagesView);
