import Joi from "joi";
import ValidationException from "../exception/validation-exception";

const create = (request) => {
    const rules = Joi.object({
        first_name: Joi.string().min(3).max(100).required(),
        last_name: Joi.string().min(3).max(100).allow(null),
        email: Joi.string().min(8).max(100).email().allow(null),
        phone: Joi.string().min(8).max(15).allow(null)
    });

    const validate = rules.validate(request.body,
        {
            abortEarly: false,
        }
    );

    const messages = {};

    if (validate.error) {
        validate.error.details.forEach(error => {
            messages[error.path] = [error.message]
        });
        throw new ValidationException(messages);
    }
}

const update = (request) => {
    const rules = Joi.object({
        first_name: Joi.string().min(3).max(100).required(),
        last_name: Joi.string().min(3).max(100).allow(null),
        email: Joi.string().min(8).max(100).email().allow(null),
        phone: Joi.string().min(8).max(15).allow(null)
    });

    const validate = rules.validate(request.body, { abortEarly: false });

    const messages = {};

    if (validate.error) {
        validate.error.details.forEach(error => {
            messages[error.path] = [error.message]
        });
        throw new ValidationException(messages);
    }
}

export default {
    create,
    update
}