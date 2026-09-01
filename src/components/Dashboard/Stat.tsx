import type { StatProps } from "../../types";

export function Stat({title, value}: StatProps){

    return (
        <div className="stats shadow flex justify-center items-center">
            <div className="stat">
                <div className="stat-title text-white font-bold">{title}</div>
                <div className="stat-value">{value}</div>
            </div>
        </div>
    )
}