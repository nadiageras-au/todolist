import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
// @ts-ignore
import {TasksStateType, TodolistType} from "../AppWithRedux";



const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = {
    todolists: TodolistType[],
    tasks: TasksStateType
}

//type AppRootStateType = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store

//  object store when function legacy_createStore
// {
//     state: {
//         tasks:{}
//         todolists: []
//     }
//     getState()
//     dispatch()
//     subscribe()
// }