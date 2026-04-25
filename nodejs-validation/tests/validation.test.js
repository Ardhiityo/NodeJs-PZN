import Joi from "joi";

test("validation string number boolean", () => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        age: Joi.number().required().min(18).max(60),
        isStudent: Joi.boolean().required()
    });
    
    const data = {
        email: "eko@pzn.com",
        age: 25,
        isStudent: true
    };
    
    const {error, value} = schema.validate(data);
    
    expect(error).toBeUndefined();
    expect(value).toEqual(data);
});