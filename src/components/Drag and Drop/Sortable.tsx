import { useSortable } from "@dnd-kit/react/sortable";
import type { SortableProps } from "../../types";

/**
 * Sortable Component
 * ------------------
 * Wraps a child element with dnd-kit sortable behavior.
 *
 * Responsibilities:
 * - Registers the element as a sortable item using `useSortable`
 * - Provides the required `ref` for drag‑and‑drop interaction
 * - Ensures each sortable item is associated with a unique `id`
 * - Allows children (TaskItem, motion.div, etc.) to be draggable
 *
 * dnd-kit usage:
 * - `useSortable({ id, index })`:
 *      Connects the element to the sortable context and enables
 *      reordering based on its index and unique identifier.
 *      Returns a `ref` that must be applied to the DOM node so
 *      dnd-kit can measure and control its position.
 *
 * @param {SortableProps} props - Contains the sortable id, index, and children.
 */
export function Sortable({id, index, children}: SortableProps) {

    // Attach sortable behavior to this element
    const {ref} = useSortable({id, index});

    /**
     * Render Logic
     * ------------
     * - The <li> element becomes the draggable/sortable node.
     * - `ref` is applied so dnd-kit can track its position and movement.
     * - Children are rendered inside without modification, allowing
     *   components like TaskItem or motion.div to animate independently.
     */
    return (
        <li ref={ref} className="item">
            {children}
        </li>
    );
}