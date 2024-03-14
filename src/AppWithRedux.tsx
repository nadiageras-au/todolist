import React, {Reducer, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    let todolists= useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const dispatch =useDispatch()

    const addTodolist = (title: string) => {
        const action =AddTodolistAC(title)
        dispatch(action)
    }

    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>

                    <AddItemForm addItemTitle={addTodolist}/>
                </Grid>

                <Grid container spacing={5}>
                    {todolists.map(tl => {
                        return <Grid item key={tl.id}>

                            <TodolistWithRedux
                                key={tl.id}
                                idTodolist={tl.id}
                                title={tl.title}
                                filterValue={tl.filter}/>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;


