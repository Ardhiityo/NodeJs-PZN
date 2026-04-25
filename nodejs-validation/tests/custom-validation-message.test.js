import Joi from "joi";

test("custom validation message", () => {
    const schema = Joi.object({
        username: Joi.string()
            .required()
            .min(3)
            .max(10)
            .messages({
                'any.required': '{#label} harus diisi',
                'string.empty': '{#label} tidak boleh kosong',
                'string.base': '{#label} harus berupa teks',
                'string.min': '{#label} harus minimal {#limit} karakter',
                'string.max': '{#label} maksimal {#limit} karakter'
            })
    });

    const { error } = schema.validate({
        username: 'a'
    }, { abortEarly: false });

    expect(error).toBeDefined();

    error.details.forEach(detail => {
        console.log(detail.message);
    });
});