import test from 'node:test';
import assert from 'node:assert/strict';

import {
  validateImportedTask,
  validateImportedReminder,
  validateImportedKitData,
} from '../src/portability/validators.js';

test('validateImportedTask accepts valid task', () => {
  const result = validateImportedTask({
    id: '1',
    title: 'Task 1',
    status: 'pending',
    dueDate: '2026-03-26T10:00:00.000Z',
    createdAt: '2026-03-26T09:00:00.000Z',
    completedAt: null,
  });

  assert.equal(result, true);
});

test('validateImportedTask rejects invalid task', () => {
  assert.throws(() => {
    validateImportedTask({
      id: '',
      title: 'Task 1',
      status: 'pending',
    });
  });
});

test('validateImportedReminder accepts valid reminder', () => {
  const result = validateImportedReminder({
    id: '1',
    title: 'Reminder 1',
    status: 'pending',
    remindAt: '2026-03-26T10:00:00.000Z',
    createdAt: '2026-03-26T09:00:00.000Z',
    completedAt: null,
  });

  assert.equal(result, true);
});

test('validateImportedKitData rejects invalid nested task', () => {
  assert.throws(() => {
    validateImportedKitData({
      tasks: [{ id: '', title: 'Bad task', status: 'pending' }],
      reminders: [],
    });
  });
});
