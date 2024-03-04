import React, {useRef} from "react";
import {FilterValuesType} from "./App";
import {ButtonUniversal} from "./Button";

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

        <ButtonUniversal title='x' onClick={() => {
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
                <ButtonUniversal title={'+'} onClick={addTaskHandler}/>
                {/*<button>+</button>*/}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <ButtonUniversal title='All' onClick={() => {
                    changeFilter('all')
                }}/>
                <ButtonUniversal title='Active' onClick={() => {
                    changeFilter('active')
                }}/>
                <ButtonUniversal title='Completed' onClick={() => {
                    changeFilter('completed')
                }}/>

            </div>
        </div>
    )
}