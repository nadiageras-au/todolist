import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist, TodolistPropsType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC, ChangeTodolisTitleAC,
    RemoveTodolistAC,
    todolistsReducer,
    TodolistsReducerActionsType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolistsReducer] =

        useReducer<Reducer<TodolistType[], TodolistsReducerActionsType>>(todolistsReducer, [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "BOOK", isDone: true},
            {id: v1(), title: "Bike", isDone: true},
            {id: v1(), title: "Car", isDone: false},
            {id: v1(), title: "House", isDone: false},
            {id: v1(), title: "Land", isDone: false},
        ]
    });

    const removeTask = (idTodolist: string, id: string) => {
        const action = removeTaskAC(id, idTodolist)
        dispatchToTasksReducer(action);
    }
    const removeTodolist = (idTodolist: string) => {
        const action = RemoveTodolistAC(idTodolist)
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action)
    }

    const changeTaskStatus = (idTodolist: string, taskId: string, isDoneNewValue: boolean) => {
        dispatchToTasksReducer(changeTaskStatusAC(idTodolist, isDoneNewValue, taskId))
    }

    const addTask = (idTodolist: string, title: string) => {
        dispatchToTasksReducer(addTaskAC(title, idTodolist))
    }

    //else
    function changeFilter(value: FilterValuesType, idTodoList: string) {
        dispatchToTodolistsReducer(ChangeTodoListFilterAC(idTodoList, value))
    }

    const addTodolist = (title: string) => {
        const action =AddTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    const changeItemTitle = (idTodoList: string, taskId: string, title: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(idTodoList, taskId, title))
    } //ChangeTaskTitle

    const changeListTitle = (idTodoList: string, title: string) => {
        dispatchToTodolistsReducer(ChangeTodolisTitleAC(idTodoList, title))
    }

    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>

                    <AddItemForm addItemTitle={addTodolist}/>
                </Grid>

                {/*<div className="dflex">*/}
                <Grid container spacing={5}>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];
                        if (tl.filter === "active") {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                        }


                        return <Grid item>

                            <Todolist
                                key={tl.id}
                                idTodolist={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                filterValue={tl.filter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTask={removeTask}
                                removeTodolist={removeTodolist}
                                changeFilter={changeFilter}
                                changeTitle={changeItemTitle}
                                changeListTitle={changeListTitle}/>

                        </Grid>

                    })}

                </Grid>
                {/*</div>*/}

            </Container>
        </div>
    )
        ;
}

export default AppWithReducers;


