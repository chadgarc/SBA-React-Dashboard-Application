import type { StatProps } from "../../types";

/**
 * Stat Component
 * --------------
 * Displays a single statistic block with a title and value.
 *
 * Purpose:
 * - Used inside the dashboard to show computed metrics
 *   (e.g., total tasks, completed tasks, pending tasks).
 *
 * UI behavior:
 * - Wraps the content in a styled container using DaisyUI's
 *   `stats` and `stat` classes for consistent visual formatting.
 *
 * @param {StatProps} props - Contains the stat title and numeric value.
 */
export function Stat({title, value}: StatProps){

    /**
     * Render Logic
     * ------------
     * - Outer <div> centers the stat visually.
     * - Inner <div> displays the title and value using DaisyUI styles.
     * - Title is bold and white for emphasis; value uses default stat styling.
     */
    return (
        <div className="stats shadow flex justify-center items-center">
            <div className="stat">
                <div className="stat-title text-white font-bold">{title}</div>
                <div className="stat-value">{value}</div>
            </div>
        </div>
    )
}