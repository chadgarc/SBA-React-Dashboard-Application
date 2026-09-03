import type { TaskListProps, TaskStatus } from "../../types";
import { Sortable } from "../Drag and Drop/Sortable";
import { TaskItem } from "../TaskItem/TaskItem";
import { DragDropProvider } from "@dnd-kit/react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * TaskList component — renders and animates a sortable list of tasks.
 * Delegates status changes, edits, and deletions to parent callbacks.
 *
 * Includes:
 * - Drag & drop reordering (dnd-kit)
 * - Smooth layout transitions (Framer Motion)
 * - Animated entry/exit for each task
 *
 * @param {TaskListProps} props - Component props
 */
export function TaskList({
    tasks,
    onStatusChange,
    onEdit,
    onDelete
    }:TaskListProps){

     /** Delegates status updates to the parent component */
    const handleStatusChange = (id: string, newStatus: TaskStatus) => {
        onStatusChange(id, newStatus);
    }

    /** Delegates edit action to the parent component */
    const handleEdit = (id: string) => {
        onEdit(id);
    }

    /** Delegates deletion to the parent component */
    const handleDelete = (id: string) => {
        onDelete(id);
    }

    /**
     * Maps over the list of tasks and renders each one inside a sortable,
     * animated wrapper.
     *
     * - DragDropProvider: defines the drag‑and‑drop context.
     * - Sortable: enables reordering based on index and unique task ID.
     *
     * - motion.div (layout):
     *      Enables automatic layout animations. When tasks change position
     *      due to sorting, filtering, or deletion, Framer Motion calculates
     *      the previous and next layout and smoothly animates the transition
     *      between them instead of instantly jumping to the new position.
     *
     * - motion.div (initial / animate / exit):
     *      Controls entry and exit animations:
     *        • initial → starting state before the element appears
     *        • animate → final state once rendered
     *        • exit → animation played when the element is removed
     *      This creates smooth fade/scale transitions when tasks are added,
     *      removed, or updated.
     */
    return (
        <>
            <motion.ul layout className="list bg-base-100 mt-2 rounded-box shadow-md">
                <DragDropProvider>
                    <AnimatePresence>
                    {tasks.map((task, index) => {
                        return (
                            <Sortable
                            key={task.id}
                            id={task.id}
                            index={index}
                            >
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                >
                                <TaskItem
                                task={task}
                                onStatusChange={handleStatusChange}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                />
                                </motion.div>
                                <div className="my-1 w-full border-y-2 border-dotted border-slate-900"></div>
                            </Sortable>
                        )
                    })}
                    </AnimatePresence>
                </DragDropProvider>
            </motion.ul>
        </>
    )
}