import {TasksStateType} from '../App/App';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI, UpdateTaskModelType,
} from '../api/todolist-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {createModelTask} from "../utils/createModelTask";
import {setAppStatusAC, SetAppStatusACType, setErrorStatusAC, SetErrorStatusACType} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


// ACTION CREATORS TYPES
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTaskActionType = ReturnType<typeof setTaskAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTaskActionType
    | UpdateTaskActionType
    | SetAppStatusACType
    | SetErrorStatusACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS" : {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        case "SET-TODOS" : {
            const stateCopy = {...state}
            action.todos.forEach((el) => {
                stateCopy[el.id] = []
            })
            return stateCopy
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId]
                    .map(t => t.id === action.payload.task.id
                        ? action.payload.task
                        : t)
                // .map((t)=> t.id === action.payload.task.id
                //     ? {...t, ...action.payload.domainModelTask}
                //     : t )
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        default:
            return state;
    }
}

//_____ACTIONS
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId} as const
}
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const setTaskAC = (tasks: TaskType[], todolistId: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todolistId
    } as const
}
export const updateTaskAC = (task: TaskType, domainModelTask: UpdateDomainTaskModelType) => {
    return {
        type: "UPDATE-TASK",
        payload: {task, domainModelTask}
    } as const
}


//Thunks

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    //1. side effects(asynchronous requests)
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            //2. dispatch actions (thunk)
            dispatch(setTaskAC(tasks, todolistId))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const addTaskTC = (payload: { todolistId: string, title: string }) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(payload.todolistId, payload.title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch,err.message)
        })
    // .finally(()=>{
    //     console.log('this line wil be at console always')
    // })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModelTask: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find((t) => t.id === taskId)
        if (!task) {
            throw new Error('Task is not found')
        }
        const actualModelTask: UpdateTaskModelType = createModelTask(task, domainModelTask)
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTask(todolistId, taskId, actualModelTask)
            .then((res) => {
                dispatch(updateTaskAC(res.data.data.item, domainModelTask))
                dispatch(setAppStatusAC("succeeded"))
            })

    }

