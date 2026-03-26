import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import { TaskService, FileStorage } from '../src/index.js';

const TEST_FILE = './test-tasks.json';

test('FileStorage persists tasks to disk', () => {
    if (fs.existsSync(TEST_FILE)) {
        fs.unlinkSync(TEST_FILE);
    }

    const service = new TaskService(new FileStorage(TEST_FILE));

    service.create({ title: 'Persisted task' });

    const raw = fs.readFileSync(TEST_FILE, 'utf-8');
    const data = JSON.parse(raw);

    assert.equal(data.length, 1);
    assert.equal(data[0].title, 'Persisted task');

    fs.unlinkSync(TEST_FILE);
});