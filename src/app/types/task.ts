import { constant } from '../utils/constant';

export type Task = {
    id: number;
    title: string;
    status: typeof constant.IS_PENDING | typeof constant.IS_COMPLETED | typeof constant.IS_IN_PROGRESS;
    priority: typeof constant.LOW | typeof constant.MEDIUM | typeof constant.HIGH;
    dueDate: string;
};
