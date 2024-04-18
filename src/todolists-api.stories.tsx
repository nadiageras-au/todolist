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
        const todolistId = "f2858ada-2670-4ab7-a712-fa5882f70e69"

        todolistAPI.DeleteTodolist(todolistId)
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")


    const getTasks=()=> {
        todolistAPI.GetTasks(todolistId).then((res)=>{
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'}
               value={todolistId}
        onChange={(e)=> {setTodolistId(e.currentTarget.value)}}/>
        <button onClick={getTasks}>Get Tasks</button>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [titleTask, setTitleTask] = useState<string>("")

    const createTask = ()=> {
        todolistAPI.CreateTask(todolistId, titleTask).then((res)=>{
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId}
               onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'task title'} value={titleTask}
               onChange={(e)=>{setTitleTask(e.currentTarget.value)}}/>
        <button onClick={createTask}> Create Task</button>
    </div>
}

export const  UpdateTaskTitle= () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const [taskTitle, setTaskTitle] = useState<string>("")
    const [taskDescription, setTaskDescription] = useState<string>("")
    const [taskStatus, setTaskStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)

    const updateTask=()=>{
        todolistAPI.UpdateTask(todolistId, taskId,{
            description: taskDescription,
            title: taskTitle,
            completed: false,
            status: taskStatus,
            priority: priority,
            startDate: '2024-04-18',
            deadline: '2024-04-18',
            id: taskId,
            todoListId: todolistId,
            order: 0,
            addedDate: '2024-04-18'
        })
            .then(res => {
                setState(res.data)
            })

    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId}
                   onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <input placeholder={'taskTitle'} value={taskTitle}
                   onChange={(e)=>{setTaskTitle(e.currentTarget.value)}}/>
            <input placeholder={'taskDescription'} value={taskDescription}
                   onChange={(e)=>{setTaskDescription(e.currentTarget.value)}}/>
            <input placeholder={'taskStatus'} value={taskStatus}
                   onChange={(e)=>{setTaskStatus(+e.currentTarget.value)}}/>
            <input placeholder={'priority'} value={priority}
                   onChange={(e)=>{setPriority(+e.currentTarget.value)}}/>
            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}

export const  DeleteTask= () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask=()=> {
        todolistAPI.DeleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })

    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId}
                   onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>Delete Task</button>
        </div>
    </div>
}