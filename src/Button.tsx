import React from 'react';
import {FilterValuesType} from "./App";

type ButtonPropsType = {
    title: string
    onClick: () => void
    isDisabled?: boolean
    classes?: string
}
export const Button = (props: ButtonPropsType) => {
    return (
        <button
            className={props.classes}
        disabled={props.isDisabled}
            onClick={props.onClick}>
            {props.title}
        </button>
    );
};
