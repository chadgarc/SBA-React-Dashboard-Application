import type { SelectListProps } from "../../types";

/**
 * SelectList Component
 * --------------------
 * A reusable, generic <select> element that supports any value type.
 *
 * Responsibilities:
 * - Displays a list of options with labels and typed values
 * - Converts option values to strings internally (HTML <select> limitation)
 * - Maps the selected string value back to its original typed value
 * - Delegates selection changes to the parent through `onChange`
 *
 * Generic behavior:
 * - The component accepts any value type (string, number, enum, etc.)
 * - Type safety is preserved by returning the original typed value
 *
 * @template T - The type of the option values.
 * @param {SelectListProps<T>} props - Contains defaultValue, options, and onChange.
 */
export function SelectList<T> ({
    defaultValue,
    options,
    onChange}: SelectListProps<T>) {
    
    /**
     * Render Logic
     * ------------
     * - <select> uses string values, so each option's value is stringified.
     * - On change, the component finds the matching option and returns
     *   its original typed value.
     * - Options are rendered with their label and stringified value.
     */
    return (
        <select
        defaultValue={defaultValue as any}
        className="select text-wrap w-35 select-neutral bg-gray-300 text-black"

        /** Forward the selected typed value to the parent */
        onChange={(e) => {
            const selected = options.find(option => `${option.value}` === e.target.value);
            if(selected) onChange(selected.value)
        }}
        >
        {options.map( option =>
            <option key={`${option.value}`} value={`${option.value}`}>{option.label}</option>
        )}
        </select>
    );
}
