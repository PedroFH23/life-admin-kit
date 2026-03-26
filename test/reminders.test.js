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