import type {Meta, StoryObj} from '@storybook/react';

import {action} from '@storybook/addon-actions'
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof App> = {
    title: 'TODOLISTS/AppWithRedux',
    component: App,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes:
    // https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]

};

export default meta;
type Story = StoryObj<typeof App>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxStory: Story = {};

