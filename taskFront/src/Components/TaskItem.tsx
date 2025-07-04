import type {Task} from "../interfaces/task.interface";
import {useTasks} from "../context/useTask.tsx";
import { IoCheckmarkDone, IoTrash } from 'react-icons/io5'

interface Props {
    task:Task
}

function TaskItem ({ task }:Props){
    const { deleteTask, updateTask } = useTasks();
    return (
        <div key={task._id} className={"bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hiver:cursor-pointer"}>
           <div>
               <h1>{task.title}</h1>
               <p>{task.description}</p>
           </div>
            <div className="flex gap-2">
                <IoCheckmarkDone
                    className={task.finished ? "text-green-500" : "text-red-500"}
                    onClick={() =>
                        updateTask(task._id, {
                            title: task.title ?? '',
                            description: task.description ?? '',
                            finished: !task.finished
                        })
                    }
                />

                <IoTrash

                            onClick={async () => {
                                if (!window.confirm("Are you sure you want to delete this task?")) return;
                                await deleteTask(task._id);
                            }}
                        />

            </div>
        </div>
    )
}
export default TaskItem