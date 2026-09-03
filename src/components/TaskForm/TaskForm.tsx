import { useEffect, useRef } from "react"
import type { TaskFormProps } from "../../types";

/**
 * TaskForm Component
 * ------------------
 * A controlled modal built using the native <dialog> element. It displays
 * editable task fields passed as `children` and provides Cancel/Save actions.
 *
 * Responsibilities:
 * - Opens and closes based on the `isOpen` prop
 * - Uses `showModal()` and `close()` to control the native dialog
 * - Delegates Cancel and Save actions to the parent component
 * - Renders arbitrary content inside the modal (typically a task form)
 *
 * Modal behavior:
 * - The parent controls visibility through `isOpen`
 * - When `isOpen` becomes true, the modal is shown programmatically
 * - When closed, `onCancel` or `onSave` update the parent state
 *
 * @param {TaskFormProps} props - Contains modal state, actions, and children.
 */
export const TaskForm = ({
    isOpen,
    onCancel,
    onSave,
    children}: TaskFormProps) => {

    /** Reference to the native <dialog> element */
    const modalRef = useRef<HTMLDialogElement>(null);
        
    /**
     * Sync modal visibility with `isOpen`.
     * - showModal() opens the dialog
     * - close() hides it
     */
    useEffect(() => {
        if(isOpen){
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [isOpen]);

    /**
     * Render Logic
     * ------------
     * - Wraps content inside a <dialog> element
     * - `children` represent the editable fields of the task
     * - Footer contains Cancel and Save buttons
     * - Styling centers the modal and applies spacing
     */
    return (
        <dialog ref={modalRef}
                className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col gap-3">
                {children}
                
                <div className="flex justify-end gap-4">
                    <button className="btn bg-gray-300 text-black"
                            onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="btn bg-gray-300 text-black"
                            onClick={onSave}>
                        Save
                    </button>
                </div>
            </div>
        </dialog>
    )
}