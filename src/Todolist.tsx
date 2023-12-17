import React from "react";
// import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {Button} from "./Button";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:number) => void
    changeFilter: (value: FilterValuesType) => void
}


export const Todolist = (props: PropsType) => {

    const {title, tasks, removeTask, changeFilter} = props;
    const tasksList = tasks.map(task => <li key={task.id}><input type="checkbox"
                                                                 checked={task.isDone}/><span>{task.title}</span>

        <Button title='x' onClickHandler={() => {
            removeTask(task.id)}}/>
    </li>)

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
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