import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";

type CheckBoxProps = {
    checked: boolean
    onChange: (checked:boolean)=>void
    color?:  'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
}


const CheckBox = (props:CheckBoxProps) => {
    const onChangeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        //props.onChange(ev.currentTarget.checked)
        // @ts-ignore
        props.onChange((ev.currentTarget as HTMLInputElement).checked)
    }
    return (
        <Checkbox checked={props.checked}
                  onChange={onChangeHandler}
                  color={'secondary'}/>
    );
};

export default CheckBox;