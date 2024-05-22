import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from "@mui/icons-material";
import {TaskType, TodolistType} from "../api/todolist-api";
import {RequestStatusType} from "../state/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {Link, Outlet} from "react-router-dom";
import {useAppSelector} from "../state/store";
import { TodosList } from '../components/TodosList/TodosList';
import { Login } from '../components/Login/Login';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function App() {

    return (
        <div className="App">
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
                        <Link to="/todolists">Todos Page</Link>
                        <Link to="/login">Login Page</Link>
                    </nav>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Outlet />
                {/*<TodosList/>*/}
                {/*<Login/>*/}
            </Container>

        </div>
    );
}


