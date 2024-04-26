import React, {ChangeEvent, memo, useCallback, useEffect, useMemo} from 'react';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {ButtonUniversal} from "./state/Button";
import {Task} from './Task'

import {FilterValuesType} from "./App/App";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {useAppDispatch} from "./state/store";
import {fetchTasksTC} from "./state/tasks-reducer";



type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist = memo((props: PropsType) => {
    console.log("Todolist called");

    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log('todos')
        dispatch(fetchTasksTC(props.id))
    }, [])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    let tasksForTodolist = props.tasks

    useMemo(() => {
        if (props.filter === "active") {
            tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
        }
        if (props.filter === "completed") {
            tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
        }
    }, [props.filter])


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(task => {
                    return <Task
                        key={task.id}
                        task={task}
                        todolistId={props.id}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                    />

                    // return <TaskWithRedux key={task.id} taskId={task.id} todolistId={props.id}/>

                })
            }
        </div>

        <div style={{paddingTop: "10px"}}>

            <ButtonUniversal
                //classes={filterValue === "all" ? "btn-active" : ""}
                color="info"
                title='All'
                onClick={onAllClickHandler}
                variant={props.filter === "all" ? "outlined" : 'contained'}/>

            <ButtonUniversal
                // classes={filterValue === "active" ? "btn-active" : ""}
                color="secondary"
                title='Active'
                onClick={onActiveClickHandler}
                variant={props.filter === "active" ? "outlined" : 'contained'}/>
            <ButtonUniversal
                // classes={filterValue === "completed" ? "btn-active" : ""}
                color="error"
                title='Completed'
                onClick={onCompletedClickHandler}
                variant={props.filter === "completed" ? "outlined" : 'contained'}/>

        </div>
    </div>
})


