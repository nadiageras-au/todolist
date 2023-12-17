import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed';
function App() {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType >("all")
    function removeTask(id: number) {
        setTasks(tasks.filter((t) => t.id !== id));
    }

    const tasksForTodolist = filter === 'completed'
        ? tasks.filter(t=> t.isDone === true) //if
        : filter === 'active'                            // if else
            ? tasks.filter(t=> t.isDone === false)
            : tasks;                                    //else
    function changeFilter(value:FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;


