
import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
//import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string,
}

export type addTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string,
}

type ActionsType = RemoveTaskActionType | addTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state,
                [action.todolistId]: state[action.todolistId].filter((t=>(t.id !== action.taskId)))}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    } as const
}

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}