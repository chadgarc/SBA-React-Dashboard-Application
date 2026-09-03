import type { searchBarProps } from "../../types";

/**
 * SearchBar Component
 * -------------------
 * A simple controlled text input used for filtering or searching tasks.
 *
 * Responsibilities:
 * - Displays a labeled text field inside a styled fieldset
 * - Delegates text changes to the parent component through `onTextChange`
 * - Allows flexible usage by customizing the title and placeholder
 *
 * Controlled behavior:
 * - The component does not store internal state
 * - Every keystroke is forwarded upward, letting the parent manage filtering logic
 *
 * @param {searchBarProps} props - Contains the title, placeholder, and change handler.
 */
export function SearchBar({title,
    placeHolder,
    onTextChange}
    : searchBarProps){

    /**
     * Render Logic
     * ------------
     * - Wraps the input in a <fieldset> for semantic grouping.
     * - Displays the title inside a <legend>.
     * - The input triggers `onTextChange` on every keystroke.
     * - Styling ensures consistent layout across screen sizes.
     */
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{title}</legend>
            <input type="text"
                className="input bg-gray-300 text-black w-90 sm:w-70 md:w-100 lg:w-130"
                placeholder={placeHolder}
                /** Forward text changes to the parent component */
                onChange={(e) => onTextChange(e.target.value)}/>
        </fieldset>
    )
}