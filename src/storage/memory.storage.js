import { StorageInterface } from './storage.interface.js';

export class MemoryStorage extends StorageInterface {
    constructor(initialData = []) {
        super();
        this.data = [...initialData];
    }

    getAll() {
        return [...this.data];
    }

    saveAll(items) {
        this.data = [...items];
    }
}
