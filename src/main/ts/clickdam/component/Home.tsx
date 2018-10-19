import * as React from "react";
import { infiniteScrolling, InfiniteScrollingAction, InfiniteScrollingOption } from "../book/InfiniteScrolling";
import { HomeHeaderContainer } from "./HomeHeaderContainer";
import { ImagesViewContainer } from "./ImagesViewContainer";

export class Home extends React.Component<HomeProps, {}> {
    private infiniteScrollingAction: InfiniteScrollingAction;

    constructor(props: HomeProps) {
        super(props);

        let me = this;

        me.infiniteScrollingAction = infiniteScrolling({
            element: document.querySelector("body"),
            offset: 560,
            callback: me.props.onScrolling.bind(me, me.props.isLastPage, me.props.currentPage),
            useWindow: false,
            useCapture: true,
        } as InfiniteScrollingOption);
    }

    render() {
        return <div>
            <div id="header">
                <HomeHeaderContainer />
            </div>
            <div id="body" className="home-body" style={{marginTop: '65px'}}>
                <ImagesViewContainer />
            </div>
        </div>
    }

    componentDidMount() {
        this.infiniteScrollingAction.scrollListener()
    }

    componentDidUpdate(prevProps: Readonly<HomeProps>) {
        if (this.props.currentPage != prevProps.currentPage) {
            this.infiniteScrollingAction.scrollListener()
        }
    }

    componentWillUnmount() {
        this.infiniteScrollingAction.unattach()
    }
}

export interface HomeProps {
    currentPage: number
    isLastPage: boolean
    onScrolling: (isLastPage: boolean) => void
}