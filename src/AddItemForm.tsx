import React, {KeyboardEvent, useState} from 'react';
import {Button} from "./Button";


type AddItemFormProps = {
    addTitle: (newTitle:string, todolistId:string)=>void
    todolistId: string
}
export const AddItemForm = ({addTitle, todolistId}:AddItemFormProps) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(false)

    const addTaskHandler = () => {
        const trimmedTaskTitle = title.trim()
        if (trimmedTaskTitle) {
            addTitle(todolistId,title)
        } else {
            // alert("In your input just only spaces")
            setError(true)
        }
        setTitle("")
    }
    const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }
    return (
        <div>
            <input value={title}
    onChange={(e) => {
        setTitle(e.currentTarget.value);
        error && setError(false)
    }}
    onKeyDown={addTaskKeyDownHandler}
    className={error ? "input-error" : ""}/>
    <Button title={'+'} onClick={addTaskHandler} isDisabled={!title}/>
    {error && <div className={'red-text'}>Field is required</div>}
    </div>
    );
};
