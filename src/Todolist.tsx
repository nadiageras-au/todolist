import React, {useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>

    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
}
export const Todolist = ({
         title,
         tasks,
         addTask,
         removeTask,
         changeFilter
     }: TodolistPropsType) => {
    console.log("todo")

    const [taskTitle, setTaskTitle] = useState("234")
    const tasksList = tasks.map(task =>
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
            <Button title='x' onClickHandler={() => {
                removeTask(task.id)
            }}/>
        </li>)

    const listItems: JSX.Element = tasks.length !== 0
        ? <ul>{tasksList}</ul>
        : <span> Task list is empty</span>


    const addTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if(trimmedTaskTitle){
            addTask(taskTitle)
        } else {
            alert("In your input just only spaces")
        }
        setTaskTitle("")
    }
    const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()

        }
    }
        return (
            <div className="todoList">
                <h3>{title}</h3>
                <div>
                    <input value={taskTitle}
                           onChange={(e) => setTaskTitle(e.currentTarget.value)}
                           onKeyDown={addTaskKeyDownHandler}/>
                    <Button title={'+'} onClickHandler={addTaskHandler} isDisabled={!taskTitle}/>

                </div>
                {listItems}
                <div>
                    <Button title='All' onClickHandler={() => {
                        changeFilter('all')
                    }}/>
                    <Button title='Active' onClickHandler={() => {
                        changeFilter('active')
                    }}/>
                    <Button title='Completed' onClickHandler={() => {
                        changeFilter('completed')
                    }}/>

                </div>
            </div>
        )
    }
