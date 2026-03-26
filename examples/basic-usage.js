import { MemoryStorage, TaskService, ReminderService, DailySummaryService } from '../src/index.js';

const taskStorage = new MemoryStorage();
const reminderStorage = new MemoryStorage();

const tasks = new TaskService(taskStorage);
const reminders = new ReminderService(reminderStorage);
const summary = new DailySummaryService(tasks, reminders);

tasks.create({
    title: 'Pay electricity bill',
    dueDate: new Date().toISOString(),
});

reminders.create({
    title: 'Doctor appointment',
    remindAt: new Date().toISOString(),
});

console.log(summary.getTodaySummary());