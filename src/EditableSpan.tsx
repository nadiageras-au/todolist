import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    title: string
    addNewItem: (newTitle:string)=> void

}
export const EditableSpan = (props:EditableSpanProps) => {

    const [title, setTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const onChangeHandler= (e:ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
        console.log("jkjk")
        // @ts-ignore
        let newTitle = e.currentTarget.value;
    setTitle(newTitle)
    }

    const onActionHandler = ()=> {
        setEdit(!edit)
        props.addNewItem(title);
    }

    return (
        edit
            ? <input onChange={onChangeHandler}  value={title} onBlur={onActionHandler} autoFocus/>
            : <span onDoubleClick={onActionHandler}>{props.title}</span>
    );
};
