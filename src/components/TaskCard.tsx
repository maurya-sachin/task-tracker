import { Task } from "../types/task";

type Props = {
    task: Task;
};

export default function TaskCard({ task }: Props) {
    return (
        <div className="bg-white p-4 shadow rounded-md">
            <div className="font-semibold">{task.title}</div>
            <div className="text-sm text-gray-600">
                Status: <span className="capitalize">{task.status}</span> |
                Priority: <span className="capitalize">{task.priority}</span> |
                Due: <span>{task.dueDate}</span>
            </div>
        </div>
    );
}
