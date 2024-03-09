//import {TodolistType} from "../App";


import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string,
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string,
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string,
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType,
}

type ActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state,
                {id: v1(), title: action.title, filter: 'all'}
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId,
    } as const
}

export const AddTodolistAC = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
    } as const
}
export const ChangeTodolisTitletAC = (todolistId: string, title: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title,
    } as const
}
export const ChangeTodoListFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter
    } as const
}