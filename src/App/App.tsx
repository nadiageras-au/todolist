import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';

import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodosTC,
    removeTodolistTC,
} from '../state/todolists-reducer';
import {
    addTaskTC,
    deleteTaskTC, updateTaskTC,
    //updateTaskStatusTC
} from '../state/tasks-reducer';
import {useAppDispatch, useAppSelector} from '../state/store';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from "@mui/icons-material";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {TaskStatuses, TaskType, TodolistType} from "../api/todolist-api";
// import {Todolist} from "../Todolist";
import {RequestStatusType} from "../state/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {TodosList} from '../components/TodosList/TodosList';
import {Login} from '../components/Login/Login';
import {Link, Route, Routes} from "react-router-dom";

//
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import {
//     createHashRouter,
//     RouterProvider,
// } from "react-router-dom";
//
// import Root, { rootLoader } from "./routes/root";
// import Team, { teamLoader } from "./routes/team";





export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function App() {

    // const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    // const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()
    console.log('app')

    useEffect(() => {
        console.log('app useEffect')
        dispatch(fetchTodosTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC({todolistId, title}))
    }, [])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, id, {status}))
    }, [])

    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, id, {title}))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);

    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id));
    }, [])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title));
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [])

    /** const router = createHashRouter([
    //     {
    //         path: "/",
    //         element: <TodosList removeTask={removeTask}
    //                             changeFilter={changeFilter}
    //                             addTask={addTask}
    //                             changeTaskStatus={changeStatus}
    //                             removeTodolist={removeTodolist}
    //                             changeTaskTitle={changeTaskTitle}
    //                             changeTodolistTitle={changeTodolistTitle}/>,
    //         loader: rootLoader,
    //     },
    //     {
    //         path: "/login",
    //         element: <Login />,
    //         loader: rootLoader,
    //
    //     },
    // ]);
        **/
    return (
        <div className="App">
            {/*<RouterProvider router={router} />*/}
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <nav>
                        <Link to="/">Todos</Link>
                        <Link to="login">Login</Link>
                    </nav>
                </Toolbar>

            </AppBar>
            {
                status === 'loading' && <LinearProgress color="secondary"/>
            }
            <Container fixed>

                <Grid container spacing={3}>
                    <Routes>
                        <Route path='/' element={<TodosList removeTask={removeTask}
                                                            changeFilter={changeFilter}
                                                            addTask={addTask}
                                                            changeTaskStatus={changeStatus}
                                                            removeTodolist={removeTodolist}
                                                            changeTaskTitle={changeTaskTitle}
                                                            changeTodolistTitle={changeTodolistTitle}
                                                            addTodolist={addTodolist}/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>

                </Grid>
            </Container>
        </div>
    );
}


