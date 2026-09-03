import type { Priority, Task, TaskStatus, MetricsData, ValidationValues } from "../../types";

/**
 * createNewId
 * -----------
 * Generates a unique numeric ID (as a string) for a new task.
 *
 * Behavior:
 * - Collects all existing IDs
 * - Randomly generates a number between 0–10000
 * - Repeats until the generated ID does not exist in the list
 *
 * @param {Task[]} tasks - Existing tasks used to avoid ID collisions.
 * @returns {string} A unique ID for the new task.
 */
export const createNewId = (tasks: Task[]): string => {
        const ids = tasks.map( task => task.id );
        let newId: number = 0;
        while (newId === 0 || ids.find( id => id === `${newId}`)){
            newId = Math.round(Math.random() * 10000)
        }
        return `${newId}`;
    }


/**
 * filteredTasks
 * -------------
 * Applies search and filter logic to the task list.
 *
 * Behavior:
 * - Search: Matches title or description (case‑insensitive)
 * - Filters: Applies status and priority if provided
 *
 * @param {Task[]} tasks - Full list of tasks.
 * @param {string} searchInput - Search text for title/description.
 * @param {{status?: TaskStatus, priority?: Priority}} filters - Optional filters.
 * @returns {Task[]} Tasks matching search and filter criteria.
 */
export const filteredTasks = (tasks: Task[], searchInput: string, filters: {status?: TaskStatus, priority?: Priority}): Task[] => {
    const searchedTask = searchInput === '' ? tasks
        : tasks.filter( task => task.title.toLowerCase().includes(searchInput.toLowerCase())
            || task.description.toLowerCase().includes(searchInput.toLowerCase()))

    const filteredTasks = searchedTask.filter(task =>{
    const statusFilter = !filters.status || task.status === filters.status;

    const priorityFilter = !filters.priority || task.priority === filters.priority;

    return statusFilter && priorityFilter;
    })
    return filteredTasks;
}


/**
 * defaultInputs
 * -------------
 * Returns a blank task object used when creating a new task.
 *
 * @returns {Task} A task with default empty values.
 */
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


/**
 * updateMetrics
 * -------------
 * Computes dashboard metrics based on the current task list.
 *
 * Metrics:
 * - total
 * - pending
 * - inProgress
 * - completed
 *
 * @param {Task[]} tasks - List of tasks.
 * @returns {MetricsData} Aggregated metrics.
 */
export function updateMetrics(tasks: Task[]): MetricsData{
    const total = tasks.length;
    const pending = tasks.filter( task => task.status === 'pending' ).length
    const inProgress = tasks.filter( task => task.status === 'in-progress' ).length
    const completed = tasks.filter( task => task.status === 'completed' ).length
    return {total: total, pending: pending, inProgress: inProgress, completed: completed}
}


/**
 * validateTask
 * ------------
 * Validates a task's fields according to minimum requirements.
 *
 * Rules:
 * - title: ≥ 5 characters
 * - description: ≥ 10 characters
 * - dueDate: must not be empty
 *
 * @param {Task} task - Task to validate.
 * @returns {ValidationValues} Boolean flags for each field.
 */
export const validateTask = (task: Task): ValidationValues => {
    const checker = {
        title: (task.title.trim().length >= 5),
        description: (task.description.trim().length >= 10),
        dueDate: (task.dueDate.trim() !== '')
    }
    return checker;
}


/**
 * onSortBy
 * --------
 * Sorts the task list based on the selected sort mode.
 *
 * Modes:
 * - "priority": low → medium → high
 * - "dueDate": earliest first
 * - "default": numeric ID order
 *
 * @param {Task[]} taskList - Tasks to sort.
 * @param {string} value - Sorting mode.
 * @returns {Task[]} Sorted list.
 */
export function onSortBy(taskList: Task[], value: string){
        let sortedList: Task[] = [];
        if(value === 'priority'){
            const priorities = ['low','medium','high']
            priorities.forEach( priority =>
                taskList
                    .filter( task => task.priority === priority)
                    .forEach(filteredTask => sortedList.push(filteredTask)))
        } else if (value === 'dueDate'){
            sortedList = [...taskList].sort((task1, task2) =>
                new Date(task1.dueDate).getTime() - new Date(task2.dueDate).getTime())
        } else {
            sortedList = [...taskList].sort((task1, task2) =>
                Number(task1.id) - Number(task2.id))
        }
        return sortedList;
    }