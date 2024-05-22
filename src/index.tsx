import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {store} from './state/store';
import {Provider} from 'react-redux';
import {App} from "./App/App";
import {createHashRouter, Navigate, RouterProvider} from 'react-router-dom';
import {Login} from './components/Login/Login';
import {TodosList} from "./components/TodosList/TodosList";
import {ErrorPage} from "./components/ErrorPage/ErrorPage";

const container = document.getElementById('root') as HTMLElement
const router = createHashRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Navigate to="404"/>,
        children: [
            {
                index: true,
                element: <Navigate to="/todolists"/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/todolists",
                element: <TodosList/>,
            }
        ],
    },
    {
        path: "404",
        element: <ErrorPage/>
    },
]);
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
