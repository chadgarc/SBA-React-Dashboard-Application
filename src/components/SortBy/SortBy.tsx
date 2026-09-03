import { SelectList } from "../SelectList/SelectList";

/**
 * SortBy Component
 * ----------------
 * Provides a small dropdown used to select the sorting strategy
 * for the task list (default, priority, or due date).
 *
 * Responsibilities:
 * - Wraps SelectList with predefined sorting options
 * - Delegates the selected sort value to the parent via `handleSort`
 * - Keeps UI consistent by reusing the generic SelectList component
 *
 * @param {{ handleSort: (value: string) => void }} props - Callback for sort changes.
 */
export function SortBy({handleSort}:{handleSort: (value: string) => void}){

    /**
     * Render Logic
     * ------------
     * - Uses SelectList to display three sorting options.
     * - `defaultValue` sets the initial selection.
     * - When the user selects an option, `handleSort` is triggered.
     */
    return (
        <SelectList
            defaultValue={'Default'}
            options={[
                {label: 'Default', value: 'default'},
                {label: 'Priority', value: 'priority'},
                {label: 'Due date', value: 'dueDate'}
            ]}
            /** Forward selected sort option to the parent */
            onChange={(value) => handleSort(value)}
        />
    )
}