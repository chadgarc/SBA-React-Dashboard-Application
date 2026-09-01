import type { Priority, Task, TaskStatus, MetricsData, ValidationValues } from "../../types";

export const createNewId = (tasks: Task[]): string => {
        const ids = tasks.map( task => task.id );
        let newId: number = 0;
        while (newId === 0 || ids.find( id => id === `${newId}`)){
            newId = Math.round(Math.random() * 10000)
        }
        return `${newId}`;
    }

export const filteredTasks = (tasks: Task[], searchInput: string, filters: {status?: TaskStatus, priority?: Priority}): Task[] => {
    const searchedTask = searchInput === '' ? tasks
        : tasks.filter( task => task.title.toLowerCase().includes(searchInput.toLowerCase())
            || task.description.toLowerCase().includes(searchInput.toLowerCase()))

    const filteredTask = searchedTask.filter(task =>{
    const statusFilter = !filters.status || task.status === filters.status;

    const priorityFilter = !filters.priority || task.priority === filters.priority;

    return statusFilter && priorityFilter;
    })
    return filteredTask;
}

export function defaultInputs(): Task{
    return {
        id: '',
        title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        dueDate: ''
    }
}

export function updateMetrics(tasks: Task[]): MetricsData{
    const total = tasks.length;
    const pending = tasks.filter( task => task.status === 'pending' ).length
    const inProgress = tasks.filter( task => task.status === 'in-progress' ).length
    const completed = tasks.filter( task => task.status === 'completed' ).length
    return {total: total, pending: pending, inProgress: inProgress, completed: completed}
}

export const validateTask = (task: Task): ValidationValues => {
    const checker = {
        title: (task.title.trim().length >= 5),
        description: (task.description.trim().length >= 10),
        dueDate: (task.dueDate.trim() !== '')
    }
    return checker;
}