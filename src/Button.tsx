import React from 'react';
import {FilterValuesType} from "./App";
//import {Button} from "@mui/material";
import Button from "@mui/material/Button";

type ButtonPropsType = {
    title: string
    onClick: () => void
    isDisabled?: boolean
    classes?: string
    variant?: 'text' | 'outlined' | 'contained'
    size?: 'small' | 'medium' | 'large'
    sx?: boolean
    color?: "primary" | "secondary" | "error" | "warning" | "info" | "success"
}
export const ButtonUniversal = (props: ButtonPropsType) => {
    const styles = {
        maxWidth: '42px',
        maxHeight: '42px',
        minWidth: '42px',
        minHeight: '42px',
    }

    return (
        <Button
            className={props.classes}
            disabled={props.isDisabled}
            onClick={props.onClick}
            variant={props.variant}
            sx={props.sx ? styles : null}
            color={props.color}>
            {props.title}


        </Button>
    );
};
