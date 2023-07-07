import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: true}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })




    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
    }
    function addTask(todoListID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]]})

    }
    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    function changeTaskTitle(todoListID: string, taskId: string, newTitle: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            title,
            filter: "all"
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasks,
            [todoList.id]: []
        })
    }
    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }
    function changeTodolistTitle(todoListID: string, newTodoTitle: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: newTodoTitle} : tl))
    }
    function removeTodo(todoID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoID))
        delete tasks[todoID]
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ { padding: '10px' }}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]

                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={ { padding: '10px' }}>
                                <Todolist
                                    id={tl.id}
                                    key={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodo={removeTodo}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default App;
