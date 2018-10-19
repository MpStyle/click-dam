import * as React from "react";
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Renderer } from "./book/Renderer";
import { RouterContainer } from "./component/Router";
import { IPCRenderer } from "./ipc/IPCRenderer";

const appStore = Renderer.appStore

IPCRenderer.init(appStore.dispatch)

const container: Element = document.getElementById('root');
ReactDOM.render(<Provider store={appStore}><RouterContainer /></Provider>, container);