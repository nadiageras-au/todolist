import axios from "axios";

// const settings = {
//     withCredentials: true
// }

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    // headers: {
    //     // Не забываем заменить API-KEY на собственный
    //     'API-KEY': '8d3af74f-7eef-4b17-a270-3306d1cf0e57',
    // },
})
type ResponseType<T = {}> = {
    "resultCode": number
    "messages": string[],
    "data": T,
    "fieldsErrors": FieldErrorType[],
}

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type FieldErrorType = {
    error: string
    field: string
}

// type CreateTodolistResponseType = {
//     "resultCode": number
//     "messages": string[],
//     "data": {
//         "item": TodolistType
//     },
//     "fieldsErrors": FieldErrorType[],
// }

// type DeleteAndUpdateTodolistResponseType = {
//     "resultCode": number
//     "messages": string[],
//     "data": {},
//     "fieldsErrors": FieldErrorType[],
// }


export const todolistAPI = {
    // GetTodolists() {
    //     const promise = axios.get(
    //         'https://social-network.samuraijs.com/api/1.1/todo-lists',
    //         settings
    //     )
    //     return promise
    // },
    GetTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    // UpdateTodolist(todolistId: string, title: string) {
    //     return axios.put(
    //         `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
    //         { title: title },
    //         settings
    //     )
    //
    // },
    UpdateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    // CreateTodolist(title: string) {
    //     const promise = axios.post(
    //         `https://social-network.samuraijs.com/api/1.1/todo-lists`,
    //         { title: title },
    //         settings
    //     )
    //     return promise
    // },
    CreateTodolist(title: string) {
        return instance.post<ResponseType<{item :TodolistType}>>(`todo-lists`, {title})
    },
    // DeleteTodolist(todolistId: string) {
    //     const promise = axios.delete(
    //         `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
    //         settings
    //     )
    //     return promise
    // }
    DeleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
}