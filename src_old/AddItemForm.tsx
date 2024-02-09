import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";


type AddItemFormProps = {
    addTitle: (newTitle:string, todolistId:string)=>void
    todolistId: string
}
export const AddItemForm = (props:AddItemFormProps) =>{
    const [title, setTitle] = useState("");
    const [error, setError] = useState(false)
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError(false)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter") {
            onAddItemHandler()
        }
    }
    const onAddItemHandler = () => {
        const trimmedTaskTitle = title.trim()
        if (trimmedTaskTitle) {
            // console.log(title)
            props.addTitle(title,props.todolistId)
        } else {
            // alert("In your input just only spaces")
            setError(true)
        }
        setTitle("")
    }

    return(
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? "input-error" : ""}/>
            <Button title={'+'} onClick={onAddItemHandler} isDisabled={!title}/>
            {error && <div className={'red-text'}>Field is required</div>}
        </div>
    )

}