import type { TaskListProps, TaskStatus } from "../../types";
import { Sortable } from "../Drag and Drop/Sortable";
import { TaskItem } from "../TaskItem/TaskItem";
import { DragDropProvider } from "@dnd-kit/react";

/**
 * Renders a list of tasks and delegates user interactions
 * (status change and deletion) to callback functions provided
 * by the parent component.
 *
 * @component
 * @param {TaskListProps} props - Props for the TaskList component.
 * @param {Task[]} props.tasks - Array of tasks to display.
 * @param {(id: string, newStatus: TaskStatus) => void} props.onStatusChange
 *        Callback fired when a task's status is changed.
 * @param {(id: string) => void} props.onDelete
 *        Callback fired when a task is deleted.
 */
export function TaskList({
    tasks,
    onStatusChange,
    onEdit,
    onDelete
    }:TaskListProps){

    /**
     * Handles status updates for a specific task.
     *
     * @function
     * @param {string} id - ID of the task being updated.
     * @param {TaskStatus} newStatus - New status selected by the user.
     *
     * Delegates the update to the parent callback `onStatusChange`.
     */
    const handleStatusChange = (id: string, newStatus: TaskStatus) => {
        onStatusChange(id, newStatus);
    }

    const handleEdit = (id: string) => {
        onEdit(id);
    }

    /**
     * Handles deletion of a specific task.
     *
     * @function
     * @param {string} id - ID of the task to delete.
     *
     * Delegates the deletion to the parent callback `onDelete`.
     */
    const handleDelete = (id: string) => {
        onDelete(id);
    }

    /**
     * Maps over the list of tasks and renders a TaskItem for each one.
     * Each TaskItem receives its own data and the delegated handlers.
     * DragDropProvider sets the droppable area
     * Sortable make it posible to sort them based in index, requires the unique id
     */
    return (
        <>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <DragDropProvider>
                    {tasks.map((task, index) => {
                        return (
                            <Sortable
                                key={task.id}
                                id={task.id}
                                index={index}
                            >
                                <TaskItem
                                task={task}
                                onStatusChange={handleStatusChange}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                />
                            </Sortable>
                        )
                        })}
                </DragDropProvider>
            </ul>
        </>
    )
}