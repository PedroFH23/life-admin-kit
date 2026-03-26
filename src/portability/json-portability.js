export function exportToJson(data) {
    return JSON.stringify(data, null, 2);
}

export function importFromJson(jsonString) {
    const parsed = JSON.parse(jsonString);

    if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON data');
    }

    return parsed;
}