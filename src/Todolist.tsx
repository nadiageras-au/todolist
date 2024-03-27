import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {ButtonUniversal} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox, Paper} from "@mui/material";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    idTodolist: string
    title: string
    tasks: Array<TaskType>
    filterValue: FilterValuesType,
    changeTaskStatus: (idTodoList: string, idTask: string, isDoneNewStatus: boolean) => void
    addTask: (idTodoList: string, title: string) => void
    removeTask: (idTodoList: string, id: string) => void
    removeTodolist: (idTodoList: string)=>void
    changeFilter: (value: FilterValuesType, idTodoList: string) => void
    changeTitle: (idTodoList: string, taskId: string, newTitle: string) => void
    changeListTitle: (idTodoList: string, newTitle: string) => void
}
export const Todolist = ({
                             idTodolist,
                             title,
                             tasks,
                             changeTaskStatus,
                             addTask,
                             filterValue,
                             removeTask,
                             removeTodolist,
                             changeFilter,
                             changeTitle,
                             changeListTitle
                         }: TodolistPropsType) => {

    const removeTodoList = ()=> {
        removeTodolist(idTodolist);
    }
    const onClickHandler = (idTodoList: string, taskId: string) => {
        removeTask(idTodoList, taskId)
    }
    const onChangeHandler = (taskId: string, isDone: boolean) => {
        changeTaskStatus(idTodolist, taskId, isDone);
    }

    // const onChangeHandler = (idTodoList: string,taskId: string,isDone: boolean) => {
    //     changeTaskStatus(idTodoList, taskId, isDone);
    // }
    const tasksList = tasks.map(task => {
        const changeTaskTitle = (newTitle: string) => {
            changeTitle(idTodolist, task.id, newTitle);
        }



        return <li key={task.id} className={task.isDone ? "is-done" : ""}>
            {/*<input type="checkbox" checked={task.isDone}*/}
            {/*       onChange={(e) => onChangeHandler(idTodolist, task.id, e.currentTarget.checked)}*/}
            {/*/>*/}
            <Checkbox checked={task.isDone}
                      onChange={()=>onChangeHandler(task.id,task.isDone)}
                      color={'secondary'}/>


            <EditableSpan title={task.title} addNewItem={changeTaskTitle}/>
            <IconButton aria-label="delete" color="primary" onClick={() => onClickHandler(idTodolist, task.id)}>
                <DeleteIcon/>
            </IconButton>
            {/*<ButtonUniversal title='x' onClick={() => onClickHandler(idTodolist, task.id)}/>*/}
        </li>
    })

    const listItems: JSX.Element = tasks.length !== 0
        ? <ul>{tasksList}</ul>
        : <span>Task list is empty</span>

    const addTaskHandler = (title: string) => {
        addTask(idTodolist, title)
    }

    const changeTodolistTitle = (newTitle: string) => {
        changeListTitle(idTodolist, newTitle);
    }

    return (
        //<div className="todoList">
        <Paper elevation={3} style={{'padding': "20px"}}>
            <h3>
                <EditableSpan title={title} addNewItem={changeTodolistTitle}/>

                <IconButton aria-label="delete" color="primary" onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            {/*<IconButton aria-label="delete" color="primary" onClick={() => onClickHandler(idTodolist, task.id)}>*/}
            {/*    <DeleteIcon />*/}
            {/*</IconButton>*/}

            <AddItemForm addItemTitle={addTaskHandler}/>
            {listItems}

            <div>
                <ButtonUniversal
                    //classes={filterValue === "all" ? "btn-active" : ""}
                    color="info"
                    title='All'
                    onClick={() => {
                        changeFilter('all', idTodolist)
                    }}
                    variant={filterValue === "all" ? "outlined" : 'contained'}/>
                <ButtonUniversal
                    // classes={filterValue === "active" ? "btn-active" : ""}
                    color="secondary"
                    title='Active'
                    onClick={() => {
                        changeFilter('active', idTodolist)
                    }}
                    variant={filterValue === "active" ? "outlined" : 'contained'}/>
                <ButtonUniversal
                    // classes={filterValue === "completed" ? "btn-active" : ""}
                    color="error"
                    title='Completed'
                    onClick={() => {
                        changeFilter('completed', idTodolist)
                    }}
                    variant={filterValue === "completed" ? "outlined" : 'contained'}/>

            </div>
        </Paper>
        //</div>
    )
}
