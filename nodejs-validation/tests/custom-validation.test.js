import Joi from 'joi';

test('Custom Validation', () => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8).custom((value, helpers) => {
            if (value === '123') {
                return helpers.error('password.invalid');
            }

            return value;
        }).messages({
            'password.invalid': 'Password is not valid'
        }),
        passwordConfirm: Joi.string().required().min(8)
    }).custom((value, helpers) => {
        if (value.password !== value.passwordConfirm) {
            return helpers.error('password.mismatch');
        }
        return value;
    }).messages({
        'password.mismatch': 'Password and password confirm do not match'
    });

    const { error } = schema.validate({
        email: 'eko@pzn.com',
        password: 'eko12345',
        passwordConfirm: 'eko12345'
    }, { abortEarly: false });

    expect(error).toBeUndefined();

    if (error) {
        error.details.forEach(detail => {
            console.log(detail.message);
        });
    }
});