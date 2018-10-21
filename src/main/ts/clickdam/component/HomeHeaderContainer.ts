import { ipcRenderer } from "electron";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { nextPageImagesBuilder } from "../action/NextPageImages";
import { emptyImagesViewBuilder } from "../action/Refresh";
import { textSearchBuilder } from "../action/TextSearch";
import { AppState } from "../entity/AppState";
import { ChannelNames } from "../ipc/ChannelNames";
import HomeHeader, { HomeHeaderProps } from "./HomeHeader";

export const HomeHeaderContainer = connect<HomeHeaderProps, HomeHeaderProps>(
    (state: AppState): HomeHeaderProps => {
        return {
            showFolderOpenButton: !state.home.importing,
            showLoader: state.home.importing,
            showRefreshButton: !state.home.importing,
            importedImageCount: state.home.importedImageCount
        } as HomeHeaderProps;
    },
    (dispatch: Dispatch): HomeHeaderProps => {
        return {
            onRefreshClick: () => {
                dispatch(emptyImagesViewBuilder());
                dispatch(nextPageImagesBuilder());
            },
            onFolderOpenClick: (): void => {
                ipcRenderer.send(ChannelNames.SHOW_OPEN_DIALOG)
            },
            onSearchChange: (e: React.KeyboardEvent<HTMLInputElement>) => {
                dispatch(textSearchBuilder(e.currentTarget.value))
            }
        } as HomeHeaderProps;
    }
)(HomeHeader);
