import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import React, {useState} from "react";
import {TaskWithRedux} from "./TaskWithRedux";
import {ReduxStoreProviderDecorator} from "../src/stories/decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../src/state/store";
import {TaskType} from "../src/Todolist";


// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,
    tags: ['autodocs'],
    args: {
        taskId: 'huhuih',
        todolistId: "dhfksdhfkshf",
    },
    decorators: [ReduxStoreProviderDecorator]

};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Task = () => {
    const idTask = useSelector<AppRootStateType, TaskType>(state=> state.tasks["todolistId1"][0])

    return <TaskWithRedux taskId={idTask.id} todolistId={"todolistId1"}/>
}
export const TaskWithReduxStory:Story = {
    render: () => <Task/>
};

