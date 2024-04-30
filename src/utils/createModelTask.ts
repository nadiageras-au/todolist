import React from 'react';
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

type domainModelTaskType = {
    [key: string]: string | TaskStatuses | TaskPriorities
}

export const createModelTask = (task: TaskType, domainModelTask: domainModelTaskType) => {
    return {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModelTask
    }
};

