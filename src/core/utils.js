export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function isSameDay(dateA, dateB) {
    const a = new Date(dateA);
    const b = new Date(dateB);

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function isToday(date) {
    return isSameDay(date, new Date());
}