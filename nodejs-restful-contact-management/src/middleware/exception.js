import logger from "../app/logging.js";
import AuthenticationException from "../exception/authentication-exception.js";
import ValidationException from "../exception/validation-exception.js";
import ResponseException from "../exception/response-exception.js";

const exception = (err, req, res, next) => {
    if (err instanceof ValidationException) {
        return res.status(400).json({
            errors: err.message
        }).end();
    } else if (err instanceof AuthenticationException) {
        return res.status(401).json({
            errors: err.message
        }).end();
    } else if (err instanceof ResponseException) {
        return res.status(err.status).json({
            errors: err.message
        }).end();
    }

    logger.error(err.message);

    res.status(500).json({
        errors: "Internal Server Error"
    }).end();
}

export default exception;