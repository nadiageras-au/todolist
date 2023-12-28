import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';
function App() {

    console.log(v1())
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])

    const [filterValue, setFilterValue] = useState<FilterValuesType >("all")

    const removeTask = (id: string)=> {
        setTasks(tasks.filter((t) => t.id !== id));
    }

    const changeTaskStatus = (taskId:string, isDoneNewValue:boolean)=> {
        let nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: isDoneNewValue} : t);
        setTasks(nextState);
    }

    const addTask = (title:string) => {
        const newTask: TaskType = {
            id: v1(),
            title, //title: title, - для сокращения если имя св-ва совпадает с именем переменной
            isDone: false
        }

        const nextState: Array<TaskType> = [newTask, ...tasks]
        setTasks(nextState)
    }

    const tasksForTodolist = filterValue === 'completed'
        ? tasks.filter(t=> t.isDone === true) //if
        : filterValue === 'active'                            // if else
            ? tasks.filter(t=> t.isDone === false)
            : tasks;                                    //else
    function changeFilter(value:FilterValuesType) {
        setFilterValue(value);
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                filterValue={filterValue}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;


