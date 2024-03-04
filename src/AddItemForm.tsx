import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ButtonUniversal} from "./Button";
import TextField from "@mui/material/TextField";


type AddItemFormProps = {
    addItemTitle: (newTitle: string) => void
}
export const AddItemForm = ({addItemTitle}: AddItemFormProps) => {
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
            {/*<input value={title}*/}
            {/*       onChange={(e) => {*/}
            {/*           setTitle(e.currentTarget.value);*/}
            {/*           error && setError(false)*/}
            {/*       }}*/}
            {/*       onKeyDown={addTaskKeyDownHandler}*/}
            {/*       className={error ? "input-error" : ""}/>*/}

            <TextField
                error={error}
                size="small"
                id="standard-basic"
                label={error ? "Field is required" : 'Type something'}
                variant="standard"
                value={title}
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    // @ts-ignore
                    console.log(e.currentTarget.value);
                   // @ts-ignore
                    setTitle(e.currentTarget.value);
                    error && setError(false);
                }}
                onKeyDown={addTaskKeyDownHandler}
                />
            <ButtonUniversal
                variant={"contained"}
                title={'+'}
                onClick={addTitleHandler}
                isDisabled={!title}
                sx/>
            {/*{error && <div className={'red-text'}>Field is required</div>}*/}
        </div>
    );
};
