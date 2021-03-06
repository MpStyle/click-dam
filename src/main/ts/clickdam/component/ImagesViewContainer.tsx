import { connect } from "react-redux";
import { Dispatch } from "redux";
import { changeImagesSizeBuilder } from "../action/ChangeImagesSize";
import { AppState } from "../entity/AppState";
import ImagesView, { ImagesViewProps } from "./ImagesView";

export const ImagesViewContainer = connect<ImagesViewProps, ImagesViewProps>(
    (state: AppState): ImagesViewProps => {
        return {
            images: Array.from(state.home.images.values()),
            loadedImageCount: Array.from(state.home.images.values()).length,
            totalImageCount: state.home.totalImageCount,
            imageSize: state.home.iconsSize
        } as ImagesViewProps;
    },
    (dispatch: Dispatch) => {
        return {
            onIconSizeClick: (size: number) => {
                dispatch(changeImagesSizeBuilder(size))
            }
        } as ImagesViewProps
    }
)(ImagesView);
