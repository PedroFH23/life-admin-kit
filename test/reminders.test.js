import test from 'node:test';
import assert from 'node:assert/strict';

import { MemoryStorage, ReminderService } from '../src/index.js';

test('create reminder', () => {
    const storage = new MemoryStorage();
    const service = new ReminderService(storage);

    const reminder = service.create({
        title: 'Doctor',
        remindAt: new Date().toISOString(),
    });

    assert.equal(reminder.title, 'Doctor');
    assert.equal(service.getAll().length, 1);
});

test('complete reminder', () => {
    const storage = new MemoryStorage();
    const service = new ReminderService(storage);

    const reminder = service.create({
        title: 'Meeting',
        remindAt: new Date().toISOString(),
    });

    service.complete(reminder.id);

    const updated = service.getAll()[0];
    assert.equal(updated.status, 'done');
});

test('fail with invalid date', () => {
    const storage = new MemoryStorage();
    const service = new ReminderService(storage);

    assert.throws(() => {
        service.create({
            title: 'Invalid',
            remindAt: 'not-a-date',
        });
    });
});

test('update reminder', () => {
    const storage = new MemoryStorage();
    const service = new ReminderService(storage);

    const created = service.create({
        title: 'Old reminder',
        remindAt: new Date().toISOString(),
    });

    const updated = service.update(created.id, {
        title: 'New reminder',
    });

    assert.equal(updated.title, 'New reminder');
});

test('fail update if reminder does not exist', () => {
    const storage = new MemoryStorage();
    const service = new ReminderService(storage);

    assert.throws(() => {
        service.update('missing-id', { title: 'Updated' });
    });
});

test('get reminders by date range', () => {
    const storage = new MemoryStorage();
    const service = new ReminderService(storage);

    service.create({
        title: 'Reminder 1',
        remindAt: '2026-03-26T10:00:00.000Z',
    });

    service.create({
        title: 'Reminder 2',
        remindAt: '2026-03-30T10:00:00.000Z',
    });

    const results = service.getByDateRange(
        '2026-03-25T00:00:00.000Z',
        '2026-03-27T23:59:59.000Z'
    );

    assert.equal(results.length, 1);
    assert.equal(results[0].title, 'Reminder 1');
});