import test from 'node:test';
import assert from 'node:assert/strict';

import { exportToJson, importFromJson } from '../src/index.js';

test('exportToJson returns formatted JSON string', () => {
  const data = {
    tasks: [{ id: '1', title: 'Task 1' }],
    reminders: [{ id: '1', title: 'Reminder 1' }],
  };

  const result = exportToJson(data);

  assert.equal(typeof result, 'string');
  assert.ok(result.includes('"tasks"'));
  assert.ok(result.includes('"reminders"'));
});

test('importFromJson parses valid JSON string', () => {
  const json = JSON.stringify({
    tasks: [{ id: '1', title: 'Task 1' }],
    reminders: [{ id: '1', title: 'Reminder 1' }],
  });

  const result = importFromJson(json);

  assert.equal(result.tasks.length, 1);
  assert.equal(result.reminders.length, 1);
});

test('importFromJson throws on invalid JSON', () => {
  assert.throws(() => {
    importFromJson('invalid-json');
  });
});
