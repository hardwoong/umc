export class DuplicateUserEmailError extends Error {
    constructor(reason, data) {
        super(reason);
        this.errorCode = "U001";
        this.reason = reason;
        this.data = data;
    }
}