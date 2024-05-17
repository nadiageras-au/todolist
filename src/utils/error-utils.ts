import {setAppStatusAC, SetAppStatusACType, setErrorStatusAC, SetErrorStatusACType} from "../state/app-reducer";
import {Dispatch} from "redux";
import { ResponseType } from '../api/todolist-api'

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, message: string) => {
    dispatch(setErrorStatusAC(message))
    dispatch(setAppStatusAC("failed"))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
    if(data.messages.length) {
        dispatch(setErrorStatusAC(data.messages[0]))
    } else {
        dispatch(setErrorStatusAC('Error is detected'))
    }
    dispatch(setAppStatusAC("failed"))
}

type ErrorUtilsDispatchType =  SetAppStatusACType | SetErrorStatusACType