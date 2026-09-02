import { useSortable } from "@dnd-kit/react/sortable";
import type { SortableProps } from "../../types";

export function Sortable({id, index, children}: SortableProps) {
    const {ref} = useSortable({id, index});

    return (
        <li ref={ref} className="item">
            {children}
        </li>
    );
}