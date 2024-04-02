import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo(({
                                    task,
                                    todolistId,
                                    removeTask,
                                    changeTaskStatus,
                                    changeTaskTitle
                                }: TaskPropsType) => {

    const {id, title, isDone} = task
    const onClickHandler = () => removeTask(id, todolistId)

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(id, newIsDoneValue, todolistId);
    },[changeTaskStatus, id,todolistId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        console.log('newValue', newValue)
        changeTaskTitle(id, newValue, todolistId)
    }, [changeTaskTitle, id, todolistId])


    return (
        <div className={isDone ? "is-done" : ""}>
            <Checkbox
                checked={isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>

        </div>)

})