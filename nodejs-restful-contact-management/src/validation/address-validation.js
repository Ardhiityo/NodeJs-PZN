import Joi from 'joi';
import ValidationException from '../exception/validation-exception';

const create = (req, res) => {
    const rules = Joi.object({
        street: Joi.string().min(3).max(255).allow(null),
        city: Joi.string().min(3).max(255).required(),
        province: Joi.string().min(3).max(255).required(),
        country: Joi.string().min(3).max(255).required(),
        postal_code: Joi.string().min(4).max(7).allow(null)
    });

    const validate = rules.validate(req.body, {
        abortEarly: false,
    });

    const messages = {};

    if (validate.error) {
        validate.error.details.forEach(error => {
            messages[error.path] = error.message
        });
        throw new ValidationException(messages);
    }
}

const update = (req, res) => {
    const rules = Joi.object({
        street: Joi.string().min(3).max(255).allow(null),
        city: Joi.string().min(3).max(255).required(),
        province: Joi.string().min(3).max(255).required(),
        country: Joi.string().min(3).max(255).required(),
        postal_code: Joi.string().min(4).max(7).allow(null)
    });

    const validate = rules.validate(req.body);

    const messages = {};

    if (validate.error) {
        validate.error.details.forEach(error => {
            messages[error.path] = error.message
        });
        throw new ValidationException(messages);
    }
}

export default {
    create,
    update
}