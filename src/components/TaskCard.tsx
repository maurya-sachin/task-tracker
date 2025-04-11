import dayjs from "dayjs";
import { Task } from "../types/task";

type Props = {
    task: Task;
};

function getStatusColor(status: string) {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "completed":
            return "bg-green-100 text-green-800";
        case "in-progress":
            return "bg-blue-100 text-blue-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

function getPriorityColor(priority: string) {
    switch (priority) {
        case "high":
            return "bg-red-100 text-red-800";
        case "medium":
            return "bg-orange-100 text-orange-800";
        case "low":
            return "bg-gray-200 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}


export default function TaskCard({ task }: Props) {
    return (
        <div className="bg-white p-4 shadow rounded-md">
            <div className="font-semibold text-lg">{task.title}</div>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
                <span className={`px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                    {task.status}
                </span>
                <span className={`px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>
                <span className="text-gray-600">
                    Due: {dayjs(task.dueDate).format("DD MMM, YYYY")}
                </span>
            </div>
        </div>
    );
}
