import { Task } from "../types/task";
import dayjs from "dayjs";

export function groupTasksByDate(tasks: Task[]): Record<string, Task[]> {
    const grouped: Record<string, Task[]> = {};

    tasks.forEach(task => {
        const date = dayjs(task.dueDate);
        const today = dayjs().startOf('day');
        const tomorrow = today.add(1, 'day');

        let groupName: string;

        if (date.isSame(today, 'day')) {
            groupName = "Today";
        } else if (date.isSame(tomorrow, 'day')) {
            groupName = "Tomorrow";
        } else if (date.isBefore(today, 'day')) {
            groupName = "Overdue";
        } else {
            // For future dates beyond tomorrow
            groupName = date.format("MMMM D, YYYY");
        }

        if (!grouped[groupName]) {
            grouped[groupName] = [];
        }

        grouped[groupName].push(task);
    });

    // Sort groups by date (Overdue first, then Today, Tomorrow, and future dates)
    const sortedGrouped: Record<string, Task[]> = {};

    if (grouped["Overdue"]) sortedGrouped["Overdue"] = grouped["Overdue"];
    if (grouped["Today"]) sortedGrouped["Today"] = grouped["Today"];
    if (grouped["Tomorrow"]) sortedGrouped["Tomorrow"] = grouped["Tomorrow"];

    // Add remaining future dates in chronological order
    const futureGroups = Object.keys(grouped)
        .filter(key => !["Overdue", "Today", "Tomorrow"].includes(key))
        .sort((a, b) => dayjs(a, "MMMM D, YYYY").unix() - dayjs(b, "MMMM D, YYYY").unix());

    futureGroups.forEach(group => {
        sortedGrouped[group] = grouped[group];
    });

    return sortedGrouped;
}