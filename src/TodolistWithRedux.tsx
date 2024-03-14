import  * as React from "react";
import {FilterValuesType} from "./App";
import {ButtonUniversal} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox, Paper} from "@mui/material";
// import CheckBox from "./CheckBox";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodolisTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    idTodolist: string
    title: string
    filterValue: FilterValuesType,
}
export const TodolistWithRedux = ({
                                      idTodolist,
                                      title,
                                      filterValue,
                                  }: TodolistPropsType) => {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[idTodolist])
    const dispatch = useDispatch();
    const removeTodoList = () => {
        dispatch(RemoveTodolistAC(idTodolist))
    }
    const onClickHandler = (idTodoList: string, taskId: string) => {
        dispatch(removeTaskAC(idTodoList, taskId))
    }

    if (filterValue === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filterValue === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(idTodolist, title))
    }

    const changeTodolistTitle = (newTitle: string) => {
        dispatch(ChangeTodolisTitleAC(idTodolist, newTitle));
    }

    return (
        <Paper elevation={3} style={{'padding': "20px"}}>
            <h3>
                <EditableSpan title={title} addNewItem={changeTodolistTitle}/>

                <IconButton aria-label="delete" color="primary" onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItemTitle={addTaskHandler}/>

            { tasks.map(task => {
                const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, idTodolist))
                }
                const changeTaskTitle = (newTitle: string) => {
                    dispatch(changeTaskTitleAC(task.id,  newTitle, idTodolist));
                }
                return <li key={task.id} className={task.isDone ? "is-done" : ""}>

                    <Checkbox checked={task.isDone}
                              onChange={onChangeHandler}
                              color='secondary'
                    />

                    <EditableSpan title={task.title} addNewItem={changeTaskTitle}/>
                    <IconButton aria-label="delete" color="primary" onClick={() => onClickHandler(idTodolist, task.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </li>
            })}

            <div>
                <ButtonUniversal
                    //classes={filterValue === "all" ? "btn-active" : ""}
                    color="info"
                    title='All'
                    onClick={() => {
                        dispatch(ChangeTodoListFilterAC(idTodolist, 'all'))
                    }}
                    variant={filterValue === "all" ? "outlined" : 'contained'}/>
                <ButtonUniversal
                    // classes={filterValue === "active" ? "btn-active" : ""}
                    color="secondary"
                    title='Active'
                    onClick={() => {
                        dispatch(ChangeTodoListFilterAC(idTodolist, 'active',))
                    }}
                    variant={filterValue === "active" ? "outlined" : 'contained'}/>
                <ButtonUniversal
                    // classes={filterValue === "completed" ? "btn-active" : ""}
                    color="error"
                    title='Completed'
                    onClick={() => {
                        dispatch(ChangeTodoListFilterAC(idTodolist, 'completed'))
                    }}
                    variant={filterValue === "completed" ? "outlined" : 'contained'}/>
            </div>
        </Paper>
        //</div>
    )
}
