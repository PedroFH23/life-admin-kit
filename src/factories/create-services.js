import { MemoryStorage } from '../storage/memory.storage.js';
import { TaskService } from '../tasks/task.service.js';
import { ReminderService } from '../reminders/reminder.service.js';
import { DailySummaryService } from '../summary/daily-summary.service.js';

export function createLifeAdminKit() {
    const taskStorage = new MemoryStorage();
    const reminderStorage = new MemoryStorage();

    const tasks = new TaskService(taskStorage);
    const reminders = new ReminderService(reminderStorage);
    const summary = new DailySummaryService(tasks, reminders);

    return {
        tasks,
        reminders,
        summary,
    };
}