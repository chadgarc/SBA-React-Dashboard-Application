import type { Priority, TaskFilterProps, TaskStatus } from "../../types";
import { SelectList } from "../SelectList/SelectList";

/**
 * TaskFilter Component
 * --------------------
 * Provides two dropdown filters (status and priority) used to refine
 * the task list. Each dropdown sends a *partial* filter update to the
 * parent component, allowing the parent to merge both filters into a
 * single state object.
 *
 * Responsibilities:
 * - Renders a status filter and a priority filter
 * - Converts "All" selections into `undefined` to indicate no filtering
 * - Delegates filter changes upward through `onFilterChange`
 *
 * Controlled behavior:
 * - The component does not store internal state
 * - Each SelectList only updates its corresponding filter field
 *
 * @param {TaskFilterProps} props - Contains the filter change callback.
 */
export function TaskFilter({
    onFilterChange
    }:TaskFilterProps){

    /**
     * Render Logic
     * ------------
     * - Two SelectList components:
     *      • Status filter → updates `status`
     *      • Priority filter → updates `priority`
     *
     * - Each dropdown sends only its part of the filter:
     *      { status: ... } or { priority: ... }
     *
     * - The parent merges these partial updates into a full filter object.
     */
    return (
        <>
            <SelectList
            defaultValue={'all'}
            options={[
                { label: 'All Statuses', value: 'all-stats' },
                { label: 'Pending', value: 'pending' },
                { label: 'In Progress', value: 'in-progress' },
                { label: 'Completed', value: 'completed' }
            ]}
            onChange={(value) => {
                onFilterChange({
                    status: value === 'all-stats' ? undefined : value as TaskStatus
                })}}
            />
            <SelectList
            defaultValue={'all-priorities'}
            options={[
                { label: 'All Priorities', value: 'all-priorities' },
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' }
            ]}
            onChange={value => {
                onFilterChange({
                    priority: value === 'all-priorities' ? undefined : value as Priority
                })
            }}
            />
        </>
    )
}