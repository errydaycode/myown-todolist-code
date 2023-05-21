import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

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
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
                       size={'small'}


            />
            <Button  onClick={addTask} variant={"outlined"} color={'primary'}
            style={{maxWidth: '35px', maxHeight: '40px', minWidth: '35px', minHeight: '40px'}}
            >+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}