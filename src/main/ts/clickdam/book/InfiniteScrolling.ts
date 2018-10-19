/**
 * Class to manage the infinite scrolling feature: inspired by https://github.com/CassetteRocks/react-infinite-scroller
 */

let option: InfiniteScrollingOption;

/**
 * @param infiniteScrollingOption
 * @returns {()=>void} Call it to unattach the listener.
 */
const attach = (infiniteScrollingOption: InfiniteScrollingOption): InfiniteScrollingAction => {
    option = infiniteScrollingOption;
    init();
    return {
        unattach: () => {
            window.removeEventListener('scroll', scrollListener, option.useCapture);
            window.removeEventListener('resize', scrollListener, option.useCapture);
        },
        scrollListener: scrollListener
    } as InfiniteScrollingAction;
};

const init = (): void => {
    option = Object.assign({}, {
        offset: 50,
        callback: function () {
        },
        useWindow: true,
        isReverse: false,
        useCapture: true
    } as InfiniteScrollingOption,
        option);

    let scrollEl: any = window;

    scrollEl.addEventListener('scroll', scrollListener, option.useCapture);
    scrollEl.addEventListener('resize', scrollListener, option.useCapture);
}

const scrollListener = () => {
    let offset: number = option.element.scrollHeight - option.element.scrollTop - option.element.clientHeight;

    if (offset < option.offset) {
        option.callback();
    }
}

/**
 * Properties: <br />
 * <ul>
 * <li>element:        string,        default 'div',  Name of the element that the component should render as.</li>
 * <li>isReverse:    boolean,    default false,  Whether new items should be loaded when user scrolls to the top of the scrollable area.</li>
 * <li>callback:    function,                   A callback when more items are requested by the user.</li>
 * <li>offset:      number,        default 50,     The distance in pixels before the end of the items that will trigger a call to loadMore.</li>
 * <li>useCapture:  boolean,    default false,  Proxy to the useCapture option of the added event listeners.</li>
 * <li>useWindow:   boolean,    default true,   Add scroll listeners to the window, or else, the component's parentNode.</li>
 * </ul>
 */
export interface InfiniteScrollingOption {
    element?: HTMLElement;
    offset?: number;
    callback?: () => void;
    useCapture?: boolean;
}

export interface InfiniteScrollingAction {
    unattach: () => void;
    scrollListener: () => void;
}

export const infiniteScrolling = attach;