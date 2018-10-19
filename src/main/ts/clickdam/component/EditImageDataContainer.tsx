import { connect } from "react-redux";
import { Dispatch } from "redux";
import { backToHomeBuilder } from "../action/BackToHome";
import { updateImageBuilder } from "../action/UpdateImage";
import { AppState } from "../entity/AppState";
import { Image } from "../entity/Image";
import { EditImageData, EditImageDataProps } from "./EditImageData";

export const EditImageDataContainer = connect(
    (state: AppState): EditImageDataProps => {
        return {
            image: state.imageToEdit
        } as EditImageDataProps;
    },
    (dispatch: Dispatch): EditImageDataProps => {
        return {
            onBackToHomeClick: () => {
                dispatch(backToHomeBuilder())
            },
            onSaveClick: (image: Image) => {
                dispatch(updateImageBuilder(image))
            }
        } as EditImageDataProps;
    }
)(EditImageData);