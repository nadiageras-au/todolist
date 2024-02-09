import React, {useRef} from "react";
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
export const Todolist = (props: TodolistPropsType) => {

    const {title, tasks, addTask, removeTask, changeFilter} = props;

    const taskTitleInput = useRef<HTMLInputElement>(null)
    const tasksList = tasks.map(task => <li key={task.id}><input type="checkbox"
                                                                 checked={task.isDone}/><span>{task.title}</span>

        <Button title='x' onClick={() => {
            removeTask(task.id)
        }}/>
    </li>)

    const addTaskHandler = () => {
        if (taskTitleInput.current) {
            const newTaskTitle = taskTitleInput.current.value;
            addTask(newTaskTitle)
            taskTitleInput.current.value = '';
        }
    }

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div>
                <input  ref={taskTitleInput}/>
                <Button title={'+'} onClick={addTaskHandler}/>
                {/*<button>+</button>*/}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button title='All' onClick={() => {
                    changeFilter('all')
                }}/>
                <Button title='Active' onClick={() => {
                    changeFilter('active')
                }}/>
                <Button title='Completed' onClick={() => {
                    changeFilter('completed')
                }}/>

            </div>
        </div>
    )
}