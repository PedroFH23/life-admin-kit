import { exportToJson, importFromJson } from './json-portability.js';

export function exportKitData(kit) {
  return exportToJson({
    tasks: kit.tasks.getAll(),
    reminders: kit.reminders.getAll(),
  });
}

export function importKitData(kit, jsonString) {
  const data = importFromJson(jsonString);

  const tasks = Array.isArray(data.tasks) ? data.tasks : [];
  const reminders = Array.isArray(data.reminders) ? data.reminders : [];

  kit.tasks.storage.saveAll(tasks);
  kit.reminders.storage.saveAll(reminders);

  return {
    tasksImported: tasks.length,
    remindersImported: reminders.length,
  };
}
