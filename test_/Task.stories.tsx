import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {useState} from "react";


// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    // More on argTypes:
    // https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {id: "qwerty", title: "task_test_01", isDone: true},
        todolistId: "dhfksdhfkshf",
        removeTask: action('Task removed'),

    },
    argTypes: {
        changeTaskStatus: {
            description: "Change Task Status",
            action: 'Status changed inside Task'
        },
        changeTaskTitle: {
            description: "Change Task Title",
            action: 'Title changed inside Task'
        }
    }

};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {}
export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: "12wsdewfijdei2312", title: "task_test_02", isDone: false},
    }
};

export const TaskStory = () => {
    const todolistId = 'ewuroiewur'
    const [task, setTask] = useState({id: "12wsdewfijdei2312", title: "task_test_02", isDone: false})
    const changeTaskStatus = () => setTask({...task, isDone: !task.isDone})

    return <Task
        task={task}
        todolistId={todolistId}
        removeTask={action('deleted')}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={action('title changed')}
    />
}
