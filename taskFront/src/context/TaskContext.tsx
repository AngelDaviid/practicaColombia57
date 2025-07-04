import {createContext, type Provider, useEffect, useState} from "react";
import {
    CreateTaskRequest,
    getTaskRequest,
    deleteTaskRequest,
    updateTaskRequest
} from "../API/task.ts";
import type {Task, CreateTask, UpdateTask } from "../interfaces/task.interface.ts";

interface TaskContextValue {
    task: Task[];
    createTask: (task: CreateTask) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTask: (id: string, task: UpdateTask) => Promise<void>;
}

export const TaskContext = createContext<TaskContextValue>({
    task: [],
    createTask: async () => {},
    deleteTask: async () => {},
    updateTask: async () => {},
})

interface Props {
    children: React.ReactNode
}

export const TaskProvider: React.FC<Props> = ({ children }) => {
    const[tasks, setTask] = useState<Task[]>([]);

    useEffect(() => {
        getTaskRequest()
            .then((response) => response.json())
            .then((data) => setTask(data))
    }, []);

    const createTask = async (task: CreateTask) => {
        console.log(task);
        const res = await CreateTaskRequest(task)
        const data = await res.json()
        setTask([...tasks, data])
    }

    const deleteTask = async (id: string) => {
        const res = await deleteTaskRequest(id);
        if (res.status === 200) {
            setTask(tasks.filter((task) => task._id !== id))
        }
    }

   const updateTask = async (id: string, task: UpdateTask) => {
        const res = await updateTaskRequest(id, task)
        const data = await res.json()
       console.log(data)
       setTask(
            tasks.map(task => task._id === id ? {...task, ...data } : task)
        )

   }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            deleteTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}