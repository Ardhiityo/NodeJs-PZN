import Joi from 'joi';
import prisma from '../app/database.js';
import ValidationException from '../exception/validation-exception.js';

const register = async (request) => {
    const rules = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        name: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(8).max(100).required(),
    })

    const validate = rules.validate(request.body, { abortEarly: false });

    const messages = {};

    if (validate.error) {
        validate.error.details.forEach(error => {
            messages[error.path] = [error.message]
        });
        throw new ValidationException(messages);
    }

    const userExists = await prisma.user.findUnique({
        where: {
            username: request.body.username
        }
    });

    if (userExists) {
        messages['username'] = ["Username already exists"];
        throw new ValidationException(messages);
    }
}

const login = (request) => {
    const rules = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(8).max(100).required(),
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

const update = (request) => {
    const rules = Joi.object({
        name: Joi.string().min(3).max(100).allow(null),
        password: Joi.string().min(8).max(100).allow(null),
    });

   const validate = rules.validate(request.body, { abortEarly: false });

    if (validate.error) {
        const messages = {};
        validate.error.details.forEach(error => {
            messages[error.path] = [error.message]
        });
        throw new ValidationException(messages);
    }
}

export default {
    register,
    login,
    update
}