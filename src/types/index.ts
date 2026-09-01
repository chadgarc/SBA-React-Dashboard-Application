/**
 * Represents the possible workflow states of a task.
 * Used to control UI rendering and filtering logic.
 *
 * - 'pending'      → Task has not started.
 * - 'in-progress'  → Task is currently being worked on.
 * - 'completed'    → Task is finished.
 */
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

/**
 * Priority levels assigned to a task.
 *
 * - 'low'    → Minimal urgency.
 * - 'medium' → Normal urgency.
 * - 'high'   → Requires immediate attention.
 */
export type Priority = 'low' | 'medium' | 'high'

/**
 * Represents a single task item in the system.
 *
 * @property {string} id - Unique identifier for the task.
 * @property {string} title - Short title describing the task.
 * @property {string} description - Detailed explanation of the task.
 * @property {TaskStatus} status - Current workflow state of the task.
 * @property {Priority} priority - Urgency level of the task.
 * @property {string} dueDate - Deadline for completing the task (MM/DD/YYYY).
 */
export interface Task {
    id: string;
    title: string;
    description: string;
    status?: TaskStatus;
    priority?: Priority;
    dueDate: string;
}

/**
 * Props for the TaskList component.
 *
 * @property {Task[]} tasks - Array of tasks to be rendered.
 * @property {(taskId: string, newStatus: TaskStatus) => void} onStatusChange
 *   Callback fired when a task's status is updated.
 * @property {(taskId: string) => void} onDelete
 *   Callback fired when a task is removed.
 */
export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onEdit: (taskId: string) => void;
    onDelete: (taskId: string) => void;
}

/**
 * Props for the TaskItem component.
 *
 * @property {Task} task - The task data to display.
 * @property {(taskId: string, newStatus: TaskStatus) => void} onStatusChange
 *   Callback triggered when the user selects a new status.
 * @property {(taskId: string) => void} onDelete
 *   Callback triggered when the user deletes the task.
 */
export interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onEdit: (taskId: string) => void;
    onDelete: (taskId: string) => void;
}

/**
 * Props for the TaskFilter component.
 *
 * @property {(filters: { status?: TaskStatus; priority?: Priority }) => void} onFilterChange
 *   Callback fired whenever the user updates either the status or priority filter.
 *   The callback receives only the changed filter field.
 */
export interface TaskFilterProps {
    onFilterChange: (filters: {
        status?: TaskStatus;
        priority?: Priority;
    }) => void;
}

/**
 * Represents a selectable option inside a dropdown list.
 *
 * @template T - The type of the option's value.
 *
 * @property {string} label - Text displayed to the user.
 * @property {T} value - Internal value returned when selected.
 */
export interface Option<T> {
    label: string,
    value: T
}

/**
 * Props for a reusable select component.
 *
 * @template T - The type of the selected value.
 *
 * @property {T} defaultValue - Initial selected value.
 * @property {Option<T>[]} options - List of selectable options.
 * @property {(value: T) => void} onChange - Callback fired when the user selects a new value.
 */
export interface SelectListProps<T> {
    defaultValue?: T,
    options: Option<T>[],
    onChange: (value: T) => void
}

/**
 * Represents the combined filter state for tasks.
 *
 * @property {TaskStatus} [status] - Optional status filter.
 * @property {Priority} [priority] - Optional priority filter.
 */
export interface FilterHandle {
    status?: TaskStatus,
    priority?: Priority
}

export interface MetricsData {
    total: number,
    pending: number,
    inProgress: number,
    completed: number
}

export interface TaskFormProps{
    isOpen: boolean,
    onCancel: () => void,
    onSave: () => void,
    children: React.ReactNode
}

export interface ValidationValues{
    title: boolean,
    description: boolean,
    status?: boolean,
    priority?: boolean,
    dueDate: boolean
}

export interface ModalProps{
    task: Task,
    validation: ValidationValues,
    changeTitle: (title: String) => void,
    changeDescription: (description: string) => void,
    changeStatus: (status: TaskStatus) => void,
    changePriority: (priority: Priority) => void,
    changeDueDate: (dueDate: string) => void
}

export interface searchBarProps{
    title: string,
    placeHolder: string,
    onTextChange: (text:string) => void
}

export interface StatProps{
    title: string,
    value: number
}