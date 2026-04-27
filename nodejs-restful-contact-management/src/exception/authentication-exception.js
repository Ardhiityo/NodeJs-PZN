export default class AuthenticationException extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}