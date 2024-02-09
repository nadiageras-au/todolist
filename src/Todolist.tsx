import React, {useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";

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
    changeFilter: (value: FilterValuesType, idTodoList: string) => void
}
export const Todolist = ({
                             idTodolist,
                             title,
                             tasks,
                             changeTaskStatus,
                             addTask,
                             filterValue,
                             removeTask,
                             changeFilter
                         }: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState("");
    const [inputError, setInputError] = useState(false)
    const onClickHandler = (idTodoList: string, taskId: string) => {
        removeTask(idTodoList, taskId)
    }
    const onChangeHandler = (idTodoList: string, taskId: string, isDone: boolean) => {
        changeTaskStatus(idTodoList, taskId, isDone);
    }
    const tasksList = tasks.map(task =>
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <input type="checkbox" checked={task.isDone}
                   onChange={(e) => onChangeHandler(idTodolist, task.id, e.currentTarget.checked)}
            />
            <span>{task.title}</span>
            <Button title='x' onClick={() => onClickHandler(idTodolist, task.id)}/>
        </li>)

    const listItems: JSX.Element = tasks.length !== 0
        ? <ul>{tasksList}</ul>
        : <span> Task list is empty</span>

    const addTaskHandler = (title: string) => {
        addTask(idTodolist,title)
    }

    return (
        <div className="todoList">
            <h3>{title}</h3>

            <AddItemForm addItemTitle={addTaskHandler}/>
            {listItems}

            <div>
                <Button classes={filterValue === "all" ? "btn-active" : ""} title='All' onClick={() => {
                    changeFilter('all', idTodolist)
                }}/>
                <Button classes={filterValue === "active" ? "btn-active" : ""} title='Active' onClick={() => {
                    changeFilter('active', idTodolist)
                }}/>
                <Button classes={filterValue === "completed" ? "btn-active" : ""} title='Completed' onClick={() => {
                    changeFilter('completed', idTodolist)
                }}/>

            </div>
        </div>
    )
}
