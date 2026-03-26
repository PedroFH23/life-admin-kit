import { TaskService, FileStorage } from './src/index.js';

const tasks = new TaskService(new FileStorage('./tasks.json'));

tasks.create({ title: 'Persist test' });

console.log(tasks.getAll());