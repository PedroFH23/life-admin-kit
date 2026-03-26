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

test('get task by id', () => {
    const storage = new MemoryStorage();
    const service = new TaskService(storage);

    const created = service.create({ title: 'Find me' });
    const found = service.getById(created.id);

    assert.equal(found.id, created.id);
    assert.equal(found.title, 'Find me');
});

test('fail getById if task does not exist', () => {
    const storage = new MemoryStorage();
    const service = new TaskService(storage);

    assert.throws(() => {
        service.getById('missing-id');
    });
});

test('update task', () => {
    const storage = new MemoryStorage();
    const service = new TaskService(storage);

    const created = service.create({ title: 'Old title' });
    const updated = service.update(created.id, {
        title: 'New title',
        dueDate: '2026-03-27T10:00:00.000Z',
        priority: 'high',
    });

    assert.equal(updated.title, 'New title');
    assert.equal(updated.dueDate, '2026-03-27T10:00:00.000Z');
    assert.equal(updated.priority, 'high');
});

test('fail update if task does not exist', () => {
    const storage = new MemoryStorage();
    const service = new TaskService(storage);

    assert.throws(() => {
        service.update('missing-id', { title: 'Updated' });
    });
});

test('update task', () => {
    const storage = new MemoryStorage();
    const service = new TaskService(storage);

    const created = service.create({ title: 'Old title' });
    const updated = service.update(created.id, {
        title: 'New title',
        dueDate: '2026-03-27T10:00:00.000Z',
        priority: 'high',
    });

    assert.equal(updated.title, 'New title');
    assert.equal(updated.dueDate, '2026-03-27T10:00:00.000Z');
    assert.equal(updated.priority, 'high');
});

test('fail update if task does not exist', () => {
    const storage = new MemoryStorage();
    const service = new TaskService(storage);

    assert.throws(() => {
        service.update('missing-id', { title: 'Updated' });
    });
});