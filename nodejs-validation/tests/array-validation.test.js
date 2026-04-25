import Joi from "joi";

test("array validation", () => {
    const schema = Joi.array().items(Joi.string().min(10).required()).required().min(1).max(10).unique();

    const hobbies = ['Coding', 'Reading', 'Hiking'];
    
    const {error, value} = schema.validate(hobbies);
    
    expect(error).toBeUndefined();
});

test("array object validation", () => {
    const schema = Joi.array().items(
        Joi.object({
            name: Joi.string().min(3).required(),
            price: Joi.number().min(1000).required()
        }).required()
    ).required().min(1);

    const products = [{
        name: 'Apple',
        price: 1000
    }];
    
    const {error, value} = schema.validate(products);
    
    expect(error).toBeUndefined();
});
