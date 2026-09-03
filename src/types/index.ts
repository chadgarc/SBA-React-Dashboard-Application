/**
 * Workflow states for a task.
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
 * Represents a single task in the system.
 *
 * @property {string} id - Unique identifier.
 * @property {string} title - Short descriptive title.
 * @property {string} description - Detailed explanation.
 * @property {TaskStatus} status - Current workflow state.
 * @property {Priority} priority - Urgency level.
 * @property {string} dueDate - Deadline (YYYY-MM-DD).
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
 * @property {Task[]} tasks - Tasks to render.
 * @property {(taskId: string, newStatus: TaskStatus) => void} onStatusChange
 *   Fired when a task's status changes.
 * @property {(taskId: string) => void} onEdit
 *   Fired when the user wants to edit a task.
 * @property {(taskId: string) => void} onDelete
 *   Fired when the user deletes a task.
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
 * @property {Task} task - Task data to display.
 * @property {(taskId: string, newStatus: TaskStatus) => void} onStatusChange
 *   Fired when the user selects a new status.
 * @property {(taskId: string) => void} onEdit
 *   Fired when the user clicks "Edit".
 * @property {(taskId: string) => void} onDelete
 *   Fired when the user clicks "Delete".
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
 *   Fired when either filter changes. Only sends the updated field.
 */
export interface TaskFilterProps {
    onFilterChange: (filters: {
        status?: TaskStatus;
        priority?: Priority;
    }) => void;
}

/**
 * Represents a selectable option inside a dropdown.
 *
 * @template T - Type of the option value.
 *
 * @property {string} label - Display text.
 * @property {T} value - Internal value.
 */
export interface Option<T> {
    label: string,
    value: T
}

/**
 * Props for the SelectList component.
 *
 * @template T - Type of the selected value.
 *
 * @property {T} defaultValue - Initial selection.
 * @property {Option<T>[]} options - Available options.
 * @property {(value: T) => void} onChange - Fired when selection changes.
 */
export interface SelectListProps<T> {
    defaultValue?: T,
    options: Option<T>[],
    onChange: (value: T) => void
}

/**
 * Combined filter state for tasks.
 *
 * @property {TaskStatus} [status] - Optional status filter.
 * @property {Priority} [priority] - Optional priority filter.
 */
export interface FilterHandle {
    status?: TaskStatus,
    priority?: Priority
}

/**
 * Dashboard metrics.
 *
 * @property {number} total - Total tasks.
 * @property {number} pending - Pending tasks.
 * @property {number} inProgress - Tasks in progress.
 * @property {number} completed - Completed tasks.
 */
export interface MetricsData {
    total: number,
    pending: number,
    inProgress: number,
    completed: number
}

/**
 * Props for the TaskForm modal.
 *
 * @property {boolean} isOpen - Controls modal visibility.
 * @property {() => void} onCancel - Fired when user cancels.
 * @property {() => void} onSave - Fired when user saves.
 * @property {React.ReactNode} children - Modal content.
 */
export interface TaskFormProps{
    isOpen: boolean,
    onCancel: () => void,
    onSave: () => void,
    children: React.ReactNode
}

/**
 * Validation flags for a task.
 *
 * @property {boolean} title - Title validity.
 * @property {boolean} description - Description validity.
 * @property {boolean} [status] - Optional status validity.
 * @property {boolean} [priority] - Optional priority validity.
 * @property {boolean} dueDate - Due date validity.
 */
export interface ValidationValues{
    title: boolean,
    description: boolean,
    status?: boolean,
    priority?: boolean,
    dueDate: boolean
}

/**
 * Props for the Modal component.
 *
 * @property {Task} task - Task being edited.
 * @property {ValidationValues} validation - Validation flags.
 * @property {(title: string) => void} changeTitle - Update title.
 * @property {(description: string) => void} changeDescription - Update description.
 * @property {(status: TaskStatus) => void} changeStatus - Update status.
 * @property {(priority: Priority) => void} changePriority - Update priority.
 * @property {(dueDate: string) => void} changeDueDate - Update due date.
 */
export interface ModalProps{
    task: Task,
    validation: ValidationValues,
    changeTitle: (title: String) => void,
    changeDescription: (description: string) => void,
    changeStatus: (status: TaskStatus) => void,
    changePriority: (priority: Priority) => void,
    changeDueDate: (dueDate: string) => void
}

/**
 * Props for the SearchBar component.
 *
 * @property {string} title - Fieldset title.
 * @property {string} placeHolder - Input placeholder.
 * @property {(text: string) => void} onTextChange - Fired on input change.
 */
export interface searchBarProps{
    title: string,
    placeHolder: string,
    onTextChange: (text:string) => void
}

/**
 * Props for the Stat component.
 *
 * @property {string} title - Label for the metric.
 * @property {number} value - Metric value.
 */
export interface StatProps{
    title: string,
    value: number
}

/**
 * Props for the Sortable wrapper.
 *
 * @property {string} id - Unique sortable identifier.
 * @property {number} index - Position in the list.
 * @property {React.ReactNode} children - Wrapped content.
 */
export interface SortableProps{
    id:string,
    index: number,
    children: React.ReactNode
}