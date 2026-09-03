import type { TaskStatus, Priority, ModalProps } from "../../types"
import { SelectList } from "../SelectList/SelectList"

/**
 * Modal Component
 * ---------------
 * Renders the editable fields for a task inside a modal-like layout.
 *
 * Responsibilities:
 * - Displays inputs for title, description, status, priority, and due date
 * - Validates fields visually based on the `validation` object
 * - Delegates all field updates to parent callbacks (controlled component)
 * - Uses SelectList for dropdown fields (status and priority)
 *
 * Controlled inputs:
 * - Every field reflects the current `task` state
 * - Changes are propagated upward through callback props
 *
 * Validation behavior:
 * - `validation` contains boolean flags for each field
 * - When a field is invalid, a small message is shown below the input
 *
 * @param {ModalProps} props - Contains the task data and update handlers.
 */
export function Modal({
    task,
    validation,
    changeTitle,
    changeDescription,
    changeStatus,
    changePriority,
    changeDueDate,
}:ModalProps){

    /**
     * Render Logic
     * ------------
     * - Each field is displayed with a label and an input.
     * - Inputs are fully controlled: their value comes from `task`.
     * - Validation messages appear only when the corresponding flag is false.
     * - SelectList is used for dropdown fields to keep UI consistent.
     * - SVG icons are decorative and help visually identify each field.
     */
    return (<>
        <h3 className="text-left">Task name:</h3>
        <label className="input validator w-full bg-gray-300 text-black">
        {/* task icon */}
        <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01"/>
        </svg>
        <input
            type="text"
            value={task.title}
            required
            pattern="^.{5,}$"
            minLength={1}
            maxLength={20}
            title="One character minimum"
            /** Update task title */
            onChange={(e) => changeTitle(e.target.value)}
        />
        </label>
        {!validation?.title && <p>Title must have at least 5 characters</p>}

        <h3 className="text-left">Task Description:</h3>
        <label className="input validator bg-gray-300 text-black w-full">
        {/* task icon */}
        <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clipRule="evenodd"/>
        </svg>
        <input
            type="text"
            value={task.description}
            required
            pattern="^.{10,}$"
            minLength={1}
            title="One character minimum"
            /** Update task description */
            onChange={(e) => changeDescription(e.target.value)}
        />
        </label>
        {!validation?.description && <p>Description must have at least 10 characters</p>}

        <h3 className="text-left">Status:</h3>
        <SelectList
        defaultValue={task.status}
        options={[
            {label: 'Pending', value: 'pending'},
            {label: 'In Progress', value: 'in-progress'},
            {label: 'Completed', value: 'completed'}
        ]}
        /** Update task status */
        onChange={ option => changeStatus(option as TaskStatus) }
        />

        <h3 className="text-left">Priority:</h3>
        <SelectList
        defaultValue={task.priority}
        options={[
            {label: 'Low', value: 'low'},
            {label: 'Medium', value: 'medium'},
            {label: 'High', value: 'high'}
        ]}
        /** Update task priority */
        onChange={ option => changePriority(option as Priority) }
        />

        <h3 className="text-left">Due date:</h3>
        <input type="date" value={task.dueDate} className="input bg-gray-300 text-black"
         /** Update task due date */
        onChange={(e) => changeDueDate(e.target.value)}/>
        {!validation?.dueDate && <p>Due date cannot be empty</p>}
    </>)
}