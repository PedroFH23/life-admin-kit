import {
    TaskService,
    MemoryStorage
} from './src/index.js';

const tasks = new TaskService(new MemoryStorage());

tasks.create({ title: 'Test real' });

console.log(tasks.getAll());