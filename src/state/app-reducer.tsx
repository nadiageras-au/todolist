export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    isInitializad: false as boolean,
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }

        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
}
export const setAppStatusAC = (status:RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorStatusAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)


export type SetAppStatusACType = ReturnType<typeof  setAppStatusAC>
export type SetErrorStatusACType = ReturnType<typeof  setErrorStatusAC>

type ActionsType = SetAppStatusACType | SetErrorStatusACType
