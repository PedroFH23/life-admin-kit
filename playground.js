import { createLifeAdminKit } from './src/index.js';

const kit = createLifeAdminKit({
    storage: 'file',
    tasksPath: './tasks.json',
    remindersPath: './reminders.json',
});

kit.tasks.create({ title: 'Separated task storage' });
kit.reminders.create({
    title: 'Separated reminder storage',
    remindAt: new Date().toISOString(),
});

console.log('Tasks:', kit.tasks.getAll());
console.log('Reminders:', kit.reminders.getAll());