import { connect } from "react-redux";
import { Dispatch } from "redux";
import { nextPageImagesBuilder } from "../action/NextPageImages";
import { AppState } from "../entity/AppState";
import { Home, HomeProps } from "./Home";

export const HomeContainer = connect(
    (state: AppState): HomeProps => {
        return {
            isLastPage: state.isLastPage,
            currentPage: state.currentImagesPage
        } as HomeProps;
    },
    (dispatch: Dispatch): HomeProps => {
        return {
            onScrolling: (isLastPage: boolean) => {
                if (!isLastPage) {
                    dispatch(nextPageImagesBuilder())
                }
            }
        } as HomeProps
    }
)(Home);