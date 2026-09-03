import type { Priority, TaskItemProps, TaskStatus } from "../../types";
import { SelectList } from "../SelectList/SelectList";
import {useDraggable} from '@dnd-kit/react';

/**
 * TaskItem Component
 * ------------------
 * Displays a single task with its title, description, priority indicator,
 * due date, status selector, and edit/delete actions. The component is fully
 * controlled and delegates all updates to the parent component.
 *
 * Responsibilities:
 * - Renders task information and visual priority indicator
 * - Allows status changes through a SelectList dropdown
 * - Provides Edit and Delete actions via callbacks
 * - Enables drag‑and‑drop behavior using dnd‑kit's `useDraggable`
 *
 * Drag behavior:
 * - `useDraggable` registers the component as a draggable item
 * - Requires a unique `id` to track movement
 * - Returns a `ref` that must be attached to the root element
 *
 * @param {TaskItemProps} props - Contains task data and action callbacks.
 */
export function TaskItem({
    task,
    onStatusChange,
    onEdit,
    onDelete}: TaskItemProps){

    /** Enable drag behavior for this task item */
    const {ref} = useDraggable({
        id: task.id,
    });


    /** Map priority to a CSS class for visual urgency indicator */
    const priorityClass = {
        'low': 'status-info',
        'medium': 'status-warning',
        'high': 'status-error',
        }[task.priority as Priority];

    /**
     * Render Logic
     * ------------
     * - Root <div> is draggable via dnd‑kit's `ref`
     * - Left section shows title, description, priority, and due date
     * - Status dropdown uses SelectList and triggers `onStatusChange`
     * - Edit and Delete buttons call their respective parent callbacks
     * - Styling ensures responsive layout and consistent spacing
     */
    return (
        <div ref={ref} className="list-col-grow sm:list-row min-h-45 ps-10 pe-10 pt-5 pb-5 bg-slate-800">
            
            <section className="flex flex-col justify-between w-120 text-wrap">
                <div>
                    <h2 className="text-start">{task.title}</h2>

                    <p className="list-col-wrap text-start text-sm min-h-20">
                    {task.description}
                    </p>
                </div>

                <div className="flex justify-start gap-5 items-center">
                    <div className={`status animate-bounce ${priorityClass}`}></div>Priority: {task.priority}
                    <p>Due: {task.dueDate}</p>
                </div>
                
            </section>

            <div className="ms-auto">
                <SelectList
                defaultValue={task.status}
                options={[
                    {label: 'Pending', value: 'pending'},
                    {label: 'In Progress', value: 'in-progress'},
                    {label: 'Completed', value: 'completed'}
                ]}
                onChange={(newStatus) => onStatusChange(task.id, newStatus as TaskStatus)}
                />
            </div>

            <button className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:btn-primary
                btn btn-info" onClick={() => onEdit?.(task.id)}>Edit</button>

            <button className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:btn-secondary
                btn btn-error" onClick={() => onDelete?.(task.id)}>Delete</button>
        </div>
    )
}