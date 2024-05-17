import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useAddItemForm} from "./hooks/useAddItemForm";
import {RequestStatusType} from "../state/app-reducer";

export type AddItemFormPropsType = {
    disabled?: boolean
    addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {

    const {
        title,
        error,
        onChangeHandler,
        onKeyPressHandler,
        addItem} = useAddItemForm(props.addItem)


    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
                   disabled={props.disabled}
        />
        <IconButton color="primary" onClick={addItem}  disabled={props.disabled}>
        {/*<IconButton color="primary" onClick={addItem}  disabled={true}>*/}
            <AddBox/>
        </IconButton>
    </div>
})