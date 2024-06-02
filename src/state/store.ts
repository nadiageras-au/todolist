import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { appReducer } from './app-reducer';
import {authReducer} from "./auth_reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    auth: authReducer,
    app: appReducer
})
// непосредственно создаём store

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
// тип useSelector
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

