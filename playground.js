import {
    createLifeAdminKit,
    exportToJson,
    importFromJson,
} from './src/index.js';

const kit = createLifeAdminKit();

kit.tasks.create({ title: 'Buy groceries' });
kit.reminders.create({
    title: 'Doctor appointment',
    remindAt: new Date().toISOString(),
});

const exported = exportToJson({
    tasks: kit.tasks.getAll(),
    reminders: kit.reminders.getAll(),
});

console.log(exported);

const imported = importFromJson(exported);

console.log(imported);