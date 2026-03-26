import test from 'node:test';
import assert from 'node:assert/strict';

import { MemoryStorage, TaskService } from '../src/index.js';

test('create task', () => {
    const storage = new MemoryStorage();
    const service = new TaskService(storage);

    const task = service.create({ title: 'Test task' });

    assert.equal(task.title, 'Test task');
    assert.equal(task.status, 'pending');
    assert.equal(service.getAll().length, 1);
});

test('complete task', () => {
    const storage = new MemoryStorage();
    const service = new TaskService(storage);

    const task = service.create({ title: 'Task' });
    service.complete(task.id);

    const updated = service.getAll()[0];
    assert.equal(updated.status, 'done');
});

test('fail if task does not exist', () => {
    const storage = new MemoryStorage();
    const service = new TaskService(storage);

    assert.throws(() => {
        service.complete('invalid-id');
    });
});