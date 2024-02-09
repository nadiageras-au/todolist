import React, {KeyboardEvent, useState} from 'react';
import {Button} from "./Button";


type AddItemFormProps = {
    addItemTitle: (newTitle:string)=>void
}
export const AddItemForm = ({addItemTitle}:AddItemFormProps) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(false)

    const addTitleHandler = () => {
        const trimmedTaskTitle = title.trim()
        if (trimmedTaskTitle) {
            addItemTitle(title)
        } else {
            // alert("In your input just only spaces")
            setError(true)
        }
        setTitle("")
    }
    const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTitleHandler()
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
    <Button title={'+'} onClick={addTitleHandler} isDisabled={!title}/>
    {error && <div className={'red-text'}>Field is required</div>}
    </div>
    );
};
