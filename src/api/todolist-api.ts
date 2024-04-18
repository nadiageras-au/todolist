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

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponse = {
    totalCount: number
    error: string | null
    items: TaskType[]

}

export const todolistAPI = {

    GetTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },

    UpdateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },

    CreateTodolist(title: string) {
        return instance.post<ResponseType<{item :TodolistType}>>(`todo-lists`, {title})
    },
    DeleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
    ,CreateTask(todolistId: string,title: string ) {
        return instance.post<ResponseType<{item :TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    GetTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    UpdateTask(todolistId: string, taskId: string, model: TaskType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    DeleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
