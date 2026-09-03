import { SelectList } from "../SelectList/SelectList";

export function SortBy({handleSort}:{handleSort: (value: string) => void}){

    return (
        <SelectList
            defaultValue={'Default'}
            options={[
                {label: 'Default', value: 'default'},
                {label: 'Priority', value: 'priority'},
                {label: 'Due date', value: 'dueDate'}
            ]}
            onChange={(value) => handleSort(value)}
        />
    )
}