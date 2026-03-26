import fs from 'node:fs';

export class FileStorage {
    constructor(filePath) {
        this.filePath = filePath;

        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '[]', 'utf-8');
        }
    }

    getAll() {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(raw);
    }

    saveAll(items) {
        fs.writeFileSync(
            this.filePath,
            JSON.stringify(items, null, 2),
            'utf-8'
        );
    }
}