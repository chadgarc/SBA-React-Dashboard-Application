import { useEffect, useRef } from "react"
import type { TaskFormProps } from "../../types";

/**
 * Modal Component
 * ---------------
 * A reusable modal built using the native <dialog> element.
 *
 * Props:
 * @param {boolean} isOpen - Controls whether the modal is open or closed.
 * @param {() => void} onClose - Callback executed when the modal is closed.
 *
 * Component Interaction:
 * - The `App` component controls the modal state (`isModalOpen`).
 * - When `isOpen` becomes true, the modal opens using `showModal()`.
 * - The modal displays whatever content `App` passes as `children`,
 *   typically the selected user's editable fields.
 * - When the user closes the modal, `onClose` updates `isModalOpen` in `App`.
 *
 * Note:
 * Because <dialog> does not always re-render its internal content when open,
 * `App` uses `key={selectedUser?.id}` to force the modal to refresh when a
 * different user is selected.
 */
export const TaskForm = ({
    isOpen,
    onCancel,
    onSave,
    children}: TaskFormProps) => {
        const modalRef = useRef<HTMLDialogElement>(null);
        
    useEffect(() => {
        if(isOpen){
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef}
                className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col gap-3">
                {/* Everything that I want to add to the content of the modal */}
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