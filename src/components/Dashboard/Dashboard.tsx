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

/**
 * Dashboard Component
 * -------------------
 * Main container for the entire task management workflow. It coordinates
 * state, filtering, sorting, metrics, search, and modal interactions.
 *
 * Responsibilities:
 * - Loads tasks from localStorage or fallback seed data
 * - Manages all task-related state (CRUD operations)
 * - Computes metrics (total, pending, in-progress, completed)
 * - Handles search, filtering, and sorting logic
 * - Controls modal visibility for adding and editing tasks
 * - Delegates rendering to child components (TaskList, TaskFilter, SearchBar, etc.)
 *
 * State overview:
 * - tasks: full list of tasks
 * - metrics: computed dashboard statistics
 * - searchInput: text used to filter tasks by title/description
 * - filters: status/priority filters
 * - newTask: controlled form state for add/edit modals
 * - validation: validation flags for newTask
 * - selectedTask: task being edited
 * - isAddingOpen / isEditingOpen: modal visibility flags
 *
 * Side effects:
 * - Syncs tasks to localStorage whenever they change
 * - Revalidates newTask whenever its fields update
 *
 * Component flow:
 * 1. User interacts with search/filter/sort → Dashboard updates state
 * 2. Dashboard passes filtered/sorted tasks to TaskList
 * 3. User edits or adds a task → Dashboard opens TaskForm modal
 * 4. Modal updates newTask → Dashboard validates and saves
 *
 * This component acts as the "controller" of the application.
 */
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

    /** Update a task's status */
    const updateStatusChange = (id: string, newStatus: TaskStatus) => {
        setTasks(previusTask =>
        previusTask.map(task => task.id === id ? { ...task, status: newStatus } : task )
        )
    }

    /** Delete a task by ID */
    const deleteTask = (id: string) => {
        setTasks(previusTask =>
            previusTask.filter(task => task.id !== id))
    }

    /** Merge partial filter updates */
    const handleFilter = (filter: FilterHandle) => {
        setFilters(prevFilter => ({ ...prevFilter, ...filter }))
    }

    /** Open edit modal with selected task */
    function editTask(taskId: string){
        const task = tasks.find(task => task.id === taskId);
        if(task){
            setSelectedTask(task);
            setNewTask(task);
            setIsEditingOpen(true);
        }
    }
    
    /** Update search text */
    function onSearch(text: string){
        setSearchInput(text.trim());
    }

    /** Open add-task modal */
    const addNewTask = () => {
        setIsAddingOpen(true);
    }

    /** Cancel add-task modal */
    const handleCancel = () => {
        setNewTask(defaultInputs())
        setIsAddingOpen(false);
    }
    
    /** Save new task */
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

    /** Cancel edit modal */
    const handleEditCancel = () => {
        setNewTask(defaultInputs());
        setIsEditingOpen(false);
    }
    
    /** Save edited task */
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
    
    /** Apply sorting mode */
    const handleSortBy = (value: string) => {
        setTasks(onSortBy(tasks, value));
    }

    useEffect(() => {
        setMetrics(updateMetrics(tasks))
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        setValidation(validateTask(newTask))
    }, [newTask]);

    /**
     * Render Logic
     * ------------
     * - Top section: Displays metrics using <Stat>
     * - Middle section: Search bar, filters, and sort dropdown
     * - Task list: Uses filteredTasks() to apply search + filters
     * - Two TaskForm modals:
     *      • Add new task
     *      • Edit existing task (keyed by selectedTask.id to refresh content)
     *
     * Child components handle UI; Dashboard handles all logic/state.
     */
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
            <button className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-400
                btn bg-gray-300 text-black rounded-md border-gray-300" onClick={() => addNewTask()}>
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