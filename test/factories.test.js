import test from 'node:test';
import assert from 'node:assert/strict';

import { createLifeAdminKit } from '../src/index.js';

test('createLifeAdminKit returns initialized services', () => {
    const kit = createLifeAdminKit();

    kit.tasks.create({ title: 'Task from factory' });
    kit.reminders.create({
        title: 'Reminder from factory',
        remindAt: new Date().toISOString(),
    });

    const summary = kit.summary.getTodaySummary();

    assert.equal(kit.tasks.getAll().length, 1);
    assert.equal(kit.reminders.getAll().length, 1);
    assert.ok(summary);
});