import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
//import * as serviceWorker from './serviceWorker';
import AppWithRedux from "./AppWithRedux";
import {store} from "./state/store";
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<Provider store={store}>
                <AppWithRedux/>
            </Provider>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//serviceWorker.unregister();