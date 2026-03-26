import { TASK_STATUS } from '../core/constants.js';
import { generateId } from '../core/utils.js';

export function createTaskModel({ title, dueDate = null, priority = 'normal' }) {
    return {
        id: generateId(),
        title: title.trim(),
        dueDate,
        priority,
        status: TASK_STATUS.PENDING,
        createdAt: new Date().toISOString(),
        completedAt: null,
    };
}