import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (todoListID: string) => void

}
export const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }


    return (
        <div>
            <TextField value={title}
                       variant={'standard'}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       size={'small'}
                       label={'Type value'}
                       helperText={error}
            />
            <IconButton onClick={addTask} color={'primary'} style={{margin: '16px'}}>
                <Add/>
            </IconButton>

        </div>
    )
}