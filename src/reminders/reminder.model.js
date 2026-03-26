import { REMINDER_STATUS } from '../core/constants.js';
import { generateId } from '../core/utils.js';

export function createReminderModel({ title, remindAt }) {
    return {
        id: generateId(),
        title: title.trim(),
        remindAt,
        status: REMINDER_STATUS.PENDING,
        createdAt: new Date().toISOString(),
        completedAt: null,
    };
}