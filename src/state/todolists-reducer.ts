import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolist-api'
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";
import {setAppStatusAC, SetAppStatusACType} from '../App/app-reducer'

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    |SetAppStatusACType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case "SET-TODOS" : {
            return action.todos.map((item) => {
                return {...item, filter: 'all' as FilterValuesType}
            })
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType)  => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}

export const setTodolistsAC = (todos: TodolistType[]) => {
    return {type: 'SET-TODOS', todos} as const
}

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>


//Thunk

export const fetchTodosTC = () => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    // диспатчим setAppStatusAC со статусом loading, а когда мы попадем then - это будет означать, что тудулисты
    // подгрузились и loader нужно убирать. Соответственно, диспатчим setAppStatusAC со статусом succeeded
    dispatch(setAppStatusAC('loading'))
    //1. side effects(asynchronous requests)
    todolistsAPI.getTodolists()
        .then((res) => {

    //2. dispatch actions (thunk)
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const addTodolistTC = (title:string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res)=>{
            dispatch(addTodolistAC(res.data.data.item));
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res)=>{
            dispatch(removeTodolistAC(todolistId));
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const changeTodolistTitleTC = (todolistId: string,title: string)=> (dispatch:Dispatch)=>{
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(todolistId,title)
        .then((res)=>{
            dispatch(changeTodolistTitleAC(todolistId,title))
            dispatch(setAppStatusAC("succeeded"))
        })
}



