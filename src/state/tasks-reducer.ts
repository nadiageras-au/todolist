
import {TasksStateType, TodolistType} from "../App";
//import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string,
}

type ActionsType = RemoveTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            //setTasks({...tasks, [idTodolist]: tasks[idTodolist].filter(ft => ft.id !== id)});
            return {...state,
                [action.todolistId]: state[action.todolistId].filter((t=>(t.id !== action.taskId)))}
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