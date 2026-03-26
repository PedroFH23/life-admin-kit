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