import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox, IconButton} from "@mui/material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string,taskId: string) => void
    changeFilter: (todoListID: string ,value: FilterValuesType) => void
    addTask: (todoListID: string,title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListID: string, taskId: string, title: string) => void
    filter: FilterValuesType
    removeTodo: (todoID: string) => void
    changeTodolistTitle: (todoListID: string, newTodoTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.id,"all");
    const onActiveClickHandler = () => props.changeFilter(props.id,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.id,"completed");
    const onRemoveTodoHandler =()=> props.removeTodo(props.id)
    const addTask = (title: string) => {
      props.addTask(props.id, title)
    }
    
    const changeTodoListTitle = (title: string) => {
      props.changeTodolistTitle(props.id, title)
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            <IconButton onClick={onRemoveTodoHandler}>
                <Delete />
            </IconButton>
        </h3>
       <AddItemForm addItem={addTask} />
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.id,t.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id,t.id, e.currentTarget.checked);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                         props.changeTaskTitle(props.id,t.id, newValue);
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox  onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button size={"small"} variant={props.filter === 'all' ? "outlined" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button size={"small"} variant={props.filter === 'active' ? "outlined" : "text"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button size={"small"} variant={props.filter === 'completed' ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}




