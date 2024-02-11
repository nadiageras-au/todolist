import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    title: string
    addNewItem: (newTitle:string)=> void

}
export const EditableSpan = (props:EditableSpanProps) => {

    const [value, setValue] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const onChangeHandler= (e:ChangeEvent<HTMLInputElement>) => {
    let newValue = e.currentTarget.value;
    setValue(newValue)
    }

    const onActionHandler = ()=> {
        setEdit(!edit)
        props.addNewItem(value);
    }

    return (
        edit
            ? <input onChange={onChangeHandler}  value={value} onBlur={onActionHandler} autoFocus/>
            : <span onDoubleClick={onActionHandler}>{props.title}</span>
    );
};
