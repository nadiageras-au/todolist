import React from 'react';
import {FilterValuesType} from "./App";

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
}
export const Button = (props: ButtonPropsType) => {
    return (
        <button
        disabled={props.isDisabled}
            onClick={props.onClickHandler}>
            {props.title}
        </button>
    );
};
