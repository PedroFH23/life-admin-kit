import { NotFoundError } from '../core/errors.js';
import { validateOptionalDate, validateRequiredString } from '../core/validators.js';
import { REMINDER_STATUS } from '../core/constants.js';
import { createReminderModel } from './reminder.model.js';
import { getPendingReminders, getTodayReminders } from './reminder.helpers.js';

export class ReminderService {
    constructor(storage) {
        this.storage = storage;
    }

    create(input) {
        validateRequiredString(input.title, 'title');
        validateOptionalDate(input.remindAt, 'remindAt');

        const reminders = this.storage.getAll();
        const reminder = createReminderModel(input);

        reminders.push(reminder);
        this.storage.saveAll(reminders);

        return reminder;
    }

    getAll() {
        return this.storage.getAll();
    }

    getPending() {
        return getPendingReminders(this.storage.getAll());
    }

    getToday() {
        return getTodayReminders(this.storage.getAll());
    }

    complete(reminderId) {
        const reminders = this.storage.getAll();
        const reminder = reminders.find((item) => item.id === reminderId);

        if (!reminder) {
            throw new NotFoundError('Reminder not found');
        }

        reminder.status = REMINDER_STATUS.DONE;
        reminder.completedAt = new Date().toISOString();

        this.storage.saveAll(reminders);
        return reminder;
    }

    remove(reminderId) {
        const reminders = this.storage.getAll();
        const next = reminders.filter((item) => item.id !== reminderId);

        if (next.length === reminders.length) {
            throw new NotFoundError('Reminder not found');
        }

        this.storage.saveAll(next);
        return true;
    }

    update(reminderId, input) {
        const reminders = this.storage.getAll();
        const reminder = reminders.find((item) => item.id === reminderId);

        if (!reminder) {
            throw new NotFoundError('Reminder not found');
        }

        if (input.title !== undefined) {
            validateRequiredString(input.title, 'title');
            reminder.title = input.title.trim();
        }

        if (input.remindAt !== undefined) {
            validateOptionalDate(input.remindAt, 'remindAt');
            reminder.remindAt = input.remindAt;
        }

        this.storage.saveAll(reminders);
        return reminder;
    }

    getByDateRange(startDate, endDate) {
        const reminders = this.storage.getAll();

        return reminders.filter((reminder) => {
            if (!reminder.remindAt) return false;

            const date = new Date(reminder.remindAt).getTime();
            return date >= new Date(startDate).getTime() &&
                date <= new Date(endDate).getTime();
        });
    }
}