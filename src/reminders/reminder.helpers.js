import { REMINDER_STATUS } from '../core/constants.js';
import { isToday } from '../core/utils.js';

export function getPendingReminders(reminders) {
    return reminders.filter((reminder) => reminder.status === REMINDER_STATUS.PENDING);
}

export function getTodayReminders(reminders) {
    return reminders.filter((reminder) => reminder.remindAt && isToday(reminder.remindAt));
}