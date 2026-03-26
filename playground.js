import {
    createLifeAdminKit,
    exportKitData,
    importKitData,
} from './src/index.js';

const kit1 = createLifeAdminKit();

kit1.tasks.create({ title: 'Buy groceries' });
kit1.reminders.create({
    title: 'Doctor appointment',
    remindAt: new Date().toISOString(),
});

const exported = exportKitData(kit1);
console.log(exported);

const kit2 = createLifeAdminKit();
const result = importKitData(kit2, exported);

console.log(result);
console.log(kit2.tasks.getAll());
console.log(kit2.reminders.getAll());