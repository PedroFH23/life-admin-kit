import { MemoryStorage } from '../storage/memory.storage.js';
import { FileStorage } from '../storage/file.storage.js';
import { TaskService } from '../tasks/task.service.js';
import { ReminderService } from '../reminders/reminder.service.js';
import { DailySummaryService } from '../summary/daily-summary.service.js';

export function createLifeAdminKit(options = {}) {
    const {
        storage = 'memory',
        path = './life-admin-kit.json',
        tasksPath = './tasks.json',
        remindersPath = './reminders.json',
    } = options;

    let taskStorage;
    let reminderStorage;

    if (storage === 'file') {
        taskStorage = new FileStorage(tasksPath || path);
        reminderStorage = new FileStorage(remindersPath || path);
    } else {
        taskStorage = new MemoryStorage();
        reminderStorage = new MemoryStorage();
    }

    const tasks = new TaskService(taskStorage);
    const reminders = new ReminderService(reminderStorage);
    const summary = new DailySummaryService(tasks, reminders);

    return {
        tasks,
        reminders,
        summary,
    };
}