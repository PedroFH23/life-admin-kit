import test from 'node:test';
import assert from 'node:assert/strict';

import {
    MemoryStorage,
    TaskService,
    ReminderService,
    DailySummaryService,
} from '../src/index.js';

test('daily summary counts correctly', () => {
    const taskStorage = new MemoryStorage();
    const reminderStorage = new MemoryStorage();

    const tasks = new TaskService(taskStorage);
    const reminders = new ReminderService(reminderStorage);
    const summary = new DailySummaryService(tasks, reminders);

    const today = new Date().toISOString();

    tasks.create({ title: 'Task today', dueDate: today });
    reminders.create({ title: 'Reminder today', remindAt: today });

    const result = summary.getTodaySummary();

    assert.equal(result.counters.tasksToday, 1);
    assert.equal(result.counters.remindersToday, 1);
});

test('daily summary counts completed items for today', () => {
    const taskStorage = new MemoryStorage();
    const reminderStorage = new MemoryStorage();

    const tasks = new TaskService(taskStorage);
    const reminders = new ReminderService(reminderStorage);
    const summary = new DailySummaryService(tasks, reminders);

    const task = tasks.create({ title: 'Task today', dueDate: new Date().toISOString() });
    const reminder = reminders.create({
        title: 'Reminder today',
        remindAt: new Date().toISOString(),
    });

    tasks.complete(task.id);
    reminders.complete(reminder.id);

    const result = summary.getTodaySummary();

    assert.equal(result.counters.completedTasksToday, 1);
    assert.equal(result.counters.completedRemindersToday, 1);
});