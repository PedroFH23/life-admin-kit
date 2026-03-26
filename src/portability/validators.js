function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isValidDate(value) {
  return value === null || value === undefined || !Number.isNaN(new Date(value).getTime());
}

export function validateImportedTask(task) {
  if (!isObject(task)) {
    throw new Error('Invalid task: expected object');
  }

  if (typeof task.id !== 'string' || task.id.trim() === '') {
    throw new Error('Invalid task: id is required');
  }

  if (typeof task.title !== 'string' || task.title.trim() === '') {
    throw new Error('Invalid task: title is required');
  }

  if (typeof task.status !== 'string' || task.status.trim() === '') {
    throw new Error('Invalid task: status is required');
  }

  if (!isValidDate(task.dueDate)) {
    throw new Error('Invalid task: dueDate must be a valid date');
  }

  if (!isValidDate(task.createdAt)) {
    throw new Error('Invalid task: createdAt must be a valid date');
  }

  if (!isValidDate(task.completedAt)) {
    throw new Error('Invalid task: completedAt must be a valid date');
  }

  return true;
}

export function validateImportedReminder(reminder) {
  if (!isObject(reminder)) {
    throw new Error('Invalid reminder: expected object');
  }

  if (typeof reminder.id !== 'string' || reminder.id.trim() === '') {
    throw new Error('Invalid reminder: id is required');
  }

  if (typeof reminder.title !== 'string' || reminder.title.trim() === '') {
    throw new Error('Invalid reminder: title is required');
  }

  if (typeof reminder.status !== 'string' || reminder.status.trim() === '') {
    throw new Error('Invalid reminder: status is required');
  }

  if (!isValidDate(reminder.remindAt)) {
    throw new Error('Invalid reminder: remindAt must be a valid date');
  }

  if (!isValidDate(reminder.createdAt)) {
    throw new Error('Invalid reminder: createdAt must be a valid date');
  }

  if (!isValidDate(reminder.completedAt)) {
    throw new Error('Invalid reminder: completedAt must be a valid date');
  }

  return true;
}

export function validateImportedKitData(data) {
  if (!isObject(data)) {
    throw new Error('Invalid import data: expected object');
  }

  const tasks = Array.isArray(data.tasks) ? data.tasks : [];
  const reminders = Array.isArray(data.reminders) ? data.reminders : [];

  tasks.forEach(validateImportedTask);
  reminders.forEach(validateImportedReminder);

  return {
    tasks,
    reminders,
  };
}
