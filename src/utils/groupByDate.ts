import { Task } from "../types/task";
import dayjs from "dayjs";

export function groupTasksByDate(tasks: Task[]) {
    const groups: { [key: string]: Task[] } = {};

    tasks.forEach(task => {
        const due = dayjs(task.dueDate);
        const now = dayjs();

        let groupKey = "Earlier";

        if (due.isSame(now, 'day')) {
            groupKey = "Today";
        } else if (due.isSame(now.subtract(1, 'day'), 'day')) {
            groupKey = "Yesterday";
        }

        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }

        groups[groupKey].push(task);
    });

    return groups;
}
