import Joi from "joi";

test("object nested", () => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        address: Joi.object({
            street: Joi.string().required(),
            city: Joi.string().required(),
            country: Joi.string().required(),
            postalCode: Joi.string().required()
        }).required()
    });
    
    const data = {
        name: "Eko Khannedy",
        address: {
            street: "Jl. Example",
            city: "Jakarta",
            country: "Indonesia",
            postalCode: "42411"
        }
    };
    
    const {error, value} = schema.validate(data);

    expect(error).toBeUndefined();
});