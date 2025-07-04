import { useContext } from 'react'
import  {TaskContext} from "./TaskContext.tsx";

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTasks must be used as an object')
    }
    return context
}