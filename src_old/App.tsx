import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist, TodolistPropsType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]> ([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "BOOK", isDone: true},
            {id: v1(), title: "Bike", isDone: true},
            {id: v1(), title: "Car", isDone: false},
            {id: v1(), title: "House", isDone: false},
            {id: v1(), title: "Land", isDone: false},
        ]
    });

    const removeTask = (idTodolist:string, id: string)=> {
        setTasks({...tasks,[idTodolist]:tasks[idTodolist].filter(ft=> ft.id!==id)})
    }

    const changeTaskStatus = (idTodolist:string, taskId:string, isDoneNewValue:boolean)=> {
        let task = tasks[idTodolist].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDoneNewValue
        }
        setTasks({...tasks, [idTodolist]:tasks[idTodolist]});
    }

    const addTask = (idTodolist:string, title:string) => {

        // let newTask = {id: v1(), title: title, isDone: false};
        // setTasks({...tasks, [idTodolist]:[newTask, ...tasks[idTodolist]]})


        let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[idTodolist];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[idTodolist] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
       setTasks({...tasks});


    }
     //else
    function changeFilter(value:FilterValuesType, idTodoList:string) {
        setTodolists(todolists.map(filtered=>filtered.id===idTodoList
            ? {...filtered, filter: value}
            :filtered))
    }

    return (
        <div className="App">

           {/*// <AddItemForm/>*/}
            {
                todolists.map(tl=> {
                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true)
                    }


                    return <Todolist
                        key={tl.id}
                        idTodolist = {tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        filterValue={tl.filter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                    />
                })
            }

        </div>
    );
}

export default App;


