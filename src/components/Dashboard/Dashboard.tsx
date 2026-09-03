import { useEffect, useState } from "react"
import { tasksData } from "../../data/tasksData"
import type { MetricsData, Task, FilterHandle, TaskStatus, ValidationValues } from "../../types"
import { Stat } from "./Stat";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { TaskList } from "../TaskList/TaskList";
import { SearchBar } from "../SearchBar/SearchBar";
import { TaskForm } from "../TaskForm/TaskForm";
import { createNewId, filteredTasks, defaultInputs, updateMetrics, validateTask, onSortBy } from "../utils/taskUtils";
import { Modal } from "../Modal/Modal";
import { SortBy } from "../SortBy/SortBy";

export function Dashboard(){

    const savedTasks = localStorage.getItem('tasks');

    const [tasks, setTasks] = useState<Task[]>(savedTasks ? JSON.parse(savedTasks) : tasksData);
    const [metrics, setMetrics] = useState<MetricsData>(updateMetrics(tasks));
    const [searchInput, setSearchInput] = useState('');
    const [isAddingOpen, setIsAddingOpen] = useState(false);
    const [isEditingOpen, setIsEditingOpen] = useState(false);
    const [newTask, setNewTask] = useState<Task>(defaultInputs());
    const [validation, setValidation] = useState<ValidationValues>();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [filters, setFilters] = useState<FilterHandle>({})

    const updateStatusChange = (id: string, newStatus: TaskStatus) => {
        setTasks(previusTask =>
        previusTask.map(task => task.id === id ? { ...task, status: newStatus } : task )
        )
    }

    const deleteTask = (id: string) => {
        setTasks(previusTask =>
        previusTask.filter(task => task.id !== id)
        )
    }

    const handleFilter = (filter: FilterHandle) => {
        setFilters(prevFilter => ({ ...prevFilter, ...filter }))
    }

    function editTask(taskId: string){
        const task = tasks.find(task => task.id === taskId);
        if(task){
            setSelectedTask(task);
            setNewTask(task);
            setIsEditingOpen(true);
        }
    }
    
    function onSearch(text: string){
        setSearchInput(text.trim());
    }

    const addNewTask = () => {
        setIsAddingOpen(true);
    }

    const handleCancel = () => {
        setNewTask(defaultInputs())
        setIsAddingOpen(false);
    }
    
    const handleSave = () => {
        if(!(validation?.title && validation?.description && validation.dueDate)) return;
        const createdTask = {
            id: createNewId(tasks),
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            status: newTask.status,
            dueDate: newTask.dueDate
        }
        setTasks(tasks.concat(createdTask))
        setNewTask(defaultInputs())
        setIsAddingOpen(false);
    }

    const handleEditCancel = () => {
        setNewTask(defaultInputs());
        setIsEditingOpen(false);
    }
    
    const handleEditSave = () => {
        if(!(validation?.title && validation?.description && validation.dueDate)) return;
        const modifiedTask: Task = {
            id: newTask.id,
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            status: newTask.status,
            dueDate: newTask.dueDate
        }
        setTasks(tasks.map(task => {
            if(task.id === modifiedTask.id){
                task.title = modifiedTask.title;
                task.description = modifiedTask.description;
                task.status = modifiedTask.status;
                task.priority = modifiedTask.priority;
                task.dueDate = modifiedTask.dueDate;
            }
            return task;
        }))
        setIsEditingOpen(false);
        setNewTask(defaultInputs())
    }
    
    const handleSortBy = (value: string) => {
        setTasks(onSortBy(tasks, value));
        console.log(value)
    }

    useEffect(() => {
        setMetrics(updateMetrics(tasks))
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        setValidation(validateTask(newTask))
    }, [newTask]);


    return (
        <>
        <section>
            <h2 className="pt-10">Task Statistics Panel</h2>
            <section className="flex justify-around pb-10">
                {Object.entries(metrics).map(([key, value]) => {
                    return <Stat key={key} title={key} value={value} />
                })}
            </section>
        </section>
        <section className="ps-10 pe-10 min-h-35 bg-slate-800 rounded-xl">
            <section className='flex flex-col sm:flex-row items-center justify-between'>
                <SearchBar
                title={'Search Task:'}
                placeHolder={'Start typing..'}
                onTextChange={onSearch}
                />
                <div className="flex gap-5">
                    <TaskFilter
                    onFilterChange={handleFilter}
                    />
                </div>
            </section>
        <section className="flex justify-between mt-2">
            <button className="btn bg-gray-300 text-black" onClick={() => addNewTask()}>
                Add +
            </button>
            <SortBy handleSort={handleSortBy}/>
        </section>
        </section>
        <section className='my-auto'>
            <TaskList
            tasks={filteredTasks(tasks, searchInput, filters)}
            onStatusChange={updateStatusChange}
            onEdit={editTask}
            onDelete={deleteTask}
            />
        </section>
        <TaskForm
            isOpen={isAddingOpen}
            onCancel={handleCancel}
            onSave={handleSave}
            >
            {isAddingOpen &&
                <Modal task={newTask}
                    validation={validateTask(newTask)}
                    changeTitle={(title) => setNewTask({...newTask, title: `${title}`})}
                    changeDescription={(description) => setNewTask({...newTask, description: `${description}`})}
                    changeStatus={(status) => setNewTask({...newTask, status: `${status}`})}
                    changePriority={(priority) => setNewTask({...newTask, priority: `${priority}`})}
                    changeDueDate={(dueDate) => setNewTask({...newTask, dueDate: `${dueDate}`})}
                />
            }
        </TaskForm>
        <TaskForm
            key={selectedTask?.id}
            isOpen={isEditingOpen}
            onCancel={handleEditCancel}
            onSave={handleEditSave}
            >
            {isEditingOpen &&
                <Modal task={newTask}
                    validation={validateTask(newTask)}
                    changeTitle={(title) => setNewTask({...newTask, title: `${title}`})}
                    changeDescription={(description) => setNewTask({...newTask, description: `${description}`})}
                    changeStatus={(status) => setNewTask({...newTask, status: `${status}`})}
                    changePriority={(priority) => setNewTask({...newTask, priority: `${priority}`})}
                    changeDueDate={(dueDate) => setNewTask({...newTask, dueDate: `${dueDate}`})}
                />
            }
        </TaskForm>
        </>
    )
}