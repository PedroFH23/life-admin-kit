import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createLifeAdminKit,
  exportKitData,
  importKitData,
} from '../src/index.js';

test('exportKitData exports tasks and reminders from kit', () => {
  const kit = createLifeAdminKit();

  kit.tasks.create({ title: 'Task 1' });
  kit.reminders.create({
    title: 'Reminder 1',
    remindAt: new Date().toISOString(),
  });

  const result = exportKitData(kit);

  assert.equal(typeof result, 'string');
  assert.ok(result.includes('"tasks"'));
  assert.ok(result.includes('"reminders"'));
});

test('importKitData imports tasks and reminders into kit', () => {
  const kit = createLifeAdminKit();

  const json = JSON.stringify({
    tasks: [{ id: '1', title: 'Imported task', status: 'pending' }],
    reminders: [
      {
        id: '1',
        title: 'Imported reminder',
        remindAt: '2026-03-26T10:00:00.000Z',
        status: 'pending',
      },
    ],
  });

  const result = importKitData(kit, json);

  assert.equal(result.tasksImported, 1);
  assert.equal(result.remindersImported, 1);
  assert.equal(kit.tasks.getAll().length, 1);
  assert.equal(kit.reminders.getAll().length, 1);
});

test('importKitData imports empty arrays when fields are missing', () => {
  const kit = createLifeAdminKit();

  const result = importKitData(kit, JSON.stringify({}));

  assert.equal(result.tasksImported, 0);
  assert.equal(result.remindersImported, 0);
  assert.equal(kit.tasks.getAll().length, 0);
  assert.equal(kit.reminders.getAll().length, 0);
});

test('importKitData throws when JSON contains invalid task data', () => {
  const kit = createLifeAdminKit();

  const json = JSON.stringify({
    tasks: [{ id: '', title: 'Broken task', status: 'pending' }],
    reminders: [],
  });

  assert.throws(() => {
    importKitData(kit, json);
  });
});
