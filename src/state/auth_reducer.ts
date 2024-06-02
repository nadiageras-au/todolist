import {Dispatch} from 'redux'
import {setAppStatusAC, SetAppStatusACType, SetErrorStatusACType} from "./app-reducer";
import {authAPI} from "../api/todolist-api";
import {LoginParamsType} from "../components/Login/Login";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value}) as const

// thunks

//инициализация initializeApp залогинены ли


export const meTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
}

// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusACType
    | SetErrorStatusACType