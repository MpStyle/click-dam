import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../entity/AppState";
import { Pages } from "../entity/Pages";
import { EditImageDataContainer } from "./EditImageDataContainer";
import { HomeContainer } from "./HomeContainer";

const Router: React.StatelessComponent<RouterProps> = (props: RouterProps) => {
    return <div>
        {props.page == Pages.HOME && <HomeContainer />}
        {props.page == Pages.EDIT && <EditImageDataContainer />}
    </div>
}

interface RouterProps {
    page: Pages
}

export const RouterContainer = connect(
    (state: AppState): RouterProps => {
        return {
            page: state.page
        } as RouterProps;
    }
)(Router);