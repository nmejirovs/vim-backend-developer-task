export default class DuplicateEntryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DuplicateEntryError';
    }
}