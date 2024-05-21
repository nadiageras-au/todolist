import React from 'react';
import {Grid, Paper} from "@mui/material";
import {Todolist} from "../../Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "../../state/store";
import {TodolistDomainType} from "../../state/todolists-reducer";
import {FilterValuesType, TasksStateType} from "../../App/App";
import {TaskStatuses} from "../../api/todolist-api";
import {AddItemForm} from "../../AddItemForm/AddItemForm";

type TodosList_T = {
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (id: string, title: string) => void
    addTodolist: (title: string) => void
}

export const TodosList = ({
          removeTask,
          changeFilter,
          addTask,
          changeTaskStatus,
          removeTodolist,
          changeTaskTitle,
          changeTodolistTitle,
          addTodolist
      }: TodosList_T) => {
    const todos = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            {
                todos.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                entityStatus={tl.entityStatus}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </>
    );
};

