import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {todolistAPI} from "./api/todolist-api";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.GetTodolists().then((res)=>{
            setState(res.data)
        })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.CreateTodolist("Interview success").then(res => {
                setState(res.data.data.item)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const  UpdateTodolistTitle= () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "3bee645a-3160-4f73-bb35-6659045e86b4"

        todolistAPI.UpdateTodolist(todolistId,'React Success')
           .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "2965856e-93a9-4fdd-aedb-d8a2a29a37ec"

        todolistAPI.DeleteTodolist(todolistId)
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}