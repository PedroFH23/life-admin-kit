import { TASK_STATUS } from '../core/constants.js';
import { isToday } from '../core/utils.js';

export function getPendingTasks(tasks) {
    return tasks.filter((task) => task.status === TASK_STATUS.PENDING);
}

export function getTodayTasks(tasks) {
    return tasks.filter((task) => task.dueDate && isToday(task.dueDate));
}