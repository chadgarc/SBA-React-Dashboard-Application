import type { searchBarProps } from "../../types";

export function SearchBar({title,
    placeHolder,
    onTextChange}
    : searchBarProps){

    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{title}</legend>
            <input type="text"
                className="input bg-gray-300 text-black w-90 sm:w-70 md:w-100 lg:w-130"
                placeholder={placeHolder}
                onChange={(e) => onTextChange(e.target.value)}/>
        </fieldset>
    )
}