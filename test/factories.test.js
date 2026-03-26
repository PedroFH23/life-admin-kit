import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

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

test('createLifeAdminKit supports separate file storage paths', () => {
    const tasksFile = './test-tasks-factory.json';
    const remindersFile = './test-reminders-factory.json';

    if (fs.existsSync(tasksFile)) {
        fs.unlinkSync(tasksFile);
    }

    if (fs.existsSync(remindersFile)) {
        fs.unlinkSync(remindersFile);
    }

    const kit = createLifeAdminKit({
        storage: 'file',
        tasksPath: tasksFile,
        remindersPath: remindersFile,
    });

    kit.tasks.create({ title: 'File task' });
    kit.reminders.create({
        title: 'File reminder',
        remindAt: '2026-03-26T10:00:00.000Z',
    });

    const tasksData = JSON.parse(fs.readFileSync(tasksFile, 'utf-8'));
    const remindersData = JSON.parse(fs.readFileSync(remindersFile, 'utf-8'));

    assert.equal(tasksData.length, 1);
    assert.equal(remindersData.length, 1);
    assert.equal(tasksData[0].title, 'File task');
    assert.equal(remindersData[0].title, 'File reminder');

    fs.unlinkSync(tasksFile);
    fs.unlinkSync(remindersFile);
});