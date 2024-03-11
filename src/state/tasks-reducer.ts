import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
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

export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    isDone: boolean,
    todolistId: string,
}

export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todolistId: string,
}

type ActionsType = RemoveTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((t => (t.id !== action.taskId)))
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, isDone: action.isDone}
                    : el)
            }
        }

        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, title: action.title}
                    : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState =  {...state}
            delete copyState[action.todolistId]
            return copyState
            // second way to delete todolist
            // const {[action.id]: [], ...rest} = state
            // return rest

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

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todolistId
    } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistId
    } as const
}