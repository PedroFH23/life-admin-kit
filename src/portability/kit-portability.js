import { exportToJson, importFromJson } from './json-portability.js';
import { validateImportedKitData } from './validators.js';

export function exportKitData(kit) {
  return exportToJson({
    tasks: kit.tasks.getAll(),
    reminders: kit.reminders.getAll(),
  });
}

export function importKitData(kit, jsonString) {
  const rawData = importFromJson(jsonString);
  const data = validateImportedKitData(rawData);

  kit.tasks.storage.saveAll(data.tasks);
  kit.reminders.storage.saveAll(data.reminders);

  return {
    tasksImported: data.tasks.length,
    remindersImported: data.reminders.length,
  };
}