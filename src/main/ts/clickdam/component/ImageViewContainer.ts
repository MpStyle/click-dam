import { connect } from "react-redux";
import { Dispatch } from "redux";
import { editImageBuilder } from "../action/EditImage";
import { AppState } from "../entity/AppState";
import { Image } from "../entity/Image";
import ImageView, { ImageViewProps } from "./ImageView";

export const ImageViewContainer = connect<ImageViewProps, ImageViewProps, ImageViewContainerProps>(
    (state: AppState, props: ImageViewContainerProps): ImageViewProps => {
        return {
            image: props.image,
            imageSize: state.home.iconsSize
        } as ImageViewProps;
    },
    (dispatch: Dispatch, props: ImageViewContainerProps): ImageViewProps => {
        return {
            onEditClick: imageEditRequest(dispatch, props.image),
        } as ImageViewProps;
    }
)(ImageView);

export interface ImageViewContainerProps {
    image: Image
}

const imageEditRequest = (dispatch: Dispatch, image: Image) => {
    return (e: React.MouseEvent<Element>): void => {
        dispatch(editImageBuilder(image));
    }
}