import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {Todolist} from "../../Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../state/store";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodosTC,
    removeTodolistTC,
    TodolistDomainType
} from "../../state/todolists-reducer";
import {FilterValuesType, TasksStateType} from "../../App/App";
import {TaskStatuses} from "../../api/todolist-api";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {RequestStatusType} from "../../state/app-reducer";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "../../state/tasks-reducer";
import LinearProgress from "@mui/material/LinearProgress";
import {Navigate} from "react-router-dom";

export const TodosList = () => {
    console.log('todoslist')
    const todos = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector((state)=> state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    const status = useAppSelector<RequestStatusType>((state) => state.app.status)

    console.log('app')

    useEffect(() => {
        if(!isLoggedIn) {
            return
        }
        dispatch(fetchTodosTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC({todolistId, title}))
    }, [])
    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
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

    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
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
                        {
                            status === 'loading' && <LinearProgress color="secondary"/>
                        }
                    </Grid>
                })
            }
        </>
    );
};

