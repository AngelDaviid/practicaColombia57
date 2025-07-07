import { createContext, useEffect, useState } from "react";
import {
    getTaskRequest,
    deleteTaskRequest,
    updateTaskRequest,
    CreateTaskRequest
} from "../API/task.ts";
import type { Task, CreateTask, UpdateTask } from "../interfaces/task.interface.ts";

interface TaskContextValue {
    tasks: Task[];
    createTask: (task: CreateTask) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTask: (id: string, task: UpdateTask) => Promise<void>;
}

export const TaskContext = createContext<TaskContextValue>({
    tasks: [],
    createTask: async () => {},
    deleteTask: async () => {},
    updateTask: async () => {},
});

interface Props {
    children: React.ReactNode;
}

export const TaskProvider: React.FC<Props> = ({ children }) => {
    const [tasks, setTask] = useState<Task[]>([]);

    useEffect(() => {
        getTaskRequest()
            .then((response) => response.json())
            .then((data) => setTask(data));
    }, []);

    const createTask = async (task: CreateTask) => {
        const res = await CreateTaskRequest(task);
        const data = await res.json();
        setTask([...tasks, data]);
    };

    const deleteTask = async (id: string) => {
        const res = await deleteTaskRequest(id);
        if (res.status === 200) {
            setTask(tasks.filter((task) => task._id !== id));
        }
    };

    const updateTask = async (id: string, task: UpdateTask) => {
        const res = await updateTaskRequest(id, task);
        const data = await res.json();
        setTask(
            tasks.map((t) => (t._id === id ? { ...t, ...data } : t))
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};
