import { ValidationError } from './errors.js';

export function validateRequiredString(value, fieldName) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new ValidationError(`${fieldName} is required`);
    }
}

export function validateOptionalDate(value, fieldName) {
    if (value == null) return;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        throw new ValidationError(`${fieldName} must be a valid date`);
    }
}