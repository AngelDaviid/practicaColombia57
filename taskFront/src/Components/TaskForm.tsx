import {type ChangeEvent, type FormEvent, useState} from "react";
import {useTasks} from "../context/useTask.tsx";


function TaskForm() {
    const [task, setTask] = useState({
        title: '',
        description: '',
        finished: false,
    });

    const {createTask} = useTasks();

    const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>setTask({...task, [e.target.name]: e.target.value});

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTask(task)


    }


    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input type="text" name='title' className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 bloc w-full my-2 " placeholder="write a title" onChange={handleChange}/>

                <textarea name="description" rows={3} className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 bloc w-full my-2 " placeholder="write a description" onChange={handleChange} ></textarea>

                <label htmlFor="" className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="h-5 w-5 text-indigo-600"
                        checked={task.finished}
                        onChange={(e) => setTask({ ...task, finished: e.target.checked })}
                    />
                    <span>Finished</span>
                </label>

                <button className="bg-indigo-500 px-3 block py-2 w-full">Save</button>
            </form>


        </div>
    )
}

export {TaskForm};