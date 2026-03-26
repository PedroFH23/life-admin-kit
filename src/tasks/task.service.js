import { NotFoundError } from '../core/errors.js';
import { validateOptionalDate, validateRequiredString } from '../core/validators.js';
import { TASK_STATUS } from '../core/constants.js';
import { createTaskModel } from './task.model.js';
import { getPendingTasks, getTodayTasks } from './task.helpers.js';

export class TaskService {
    constructor(storage) {
        this.storage = storage;
    }

    create(input) {
        validateRequiredString(input.title, 'title');
        validateOptionalDate(input.dueDate, 'dueDate');

        const tasks = this.storage.getAll();
        const task = createTaskModel(input);

        tasks.push(task);
        this.storage.saveAll(tasks);

        return task;
    }

    getAll() {
        return this.storage.getAll();
    }

    getPending() {
        return getPendingTasks(this.storage.getAll());
    }

    getToday() {
        return getTodayTasks(this.storage.getAll());
    }

    complete(taskId) {
        const tasks = this.storage.getAll();
        const task = tasks.find((item) => item.id === taskId);

        if (!task) {
            throw new NotFoundError('Task not found');
        }

        task.status = TASK_STATUS.DONE;
        task.completedAt = new Date().toISOString();

        this.storage.saveAll(tasks);
        return task;
    }

    remove(taskId) {
        const tasks = this.storage.getAll();
        const next = tasks.filter((item) => item.id !== taskId);

        if (next.length === tasks.length) {
            throw new NotFoundError('Task not found');
        }

        this.storage.saveAll(next);
        return true;
    }
}