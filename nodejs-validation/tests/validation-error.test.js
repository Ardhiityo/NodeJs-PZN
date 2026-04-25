import Joi from "joi";

test("validation error", () => {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });
    
    const data = {
        email: "eko"
    };
    
    const {error, value} = schema.validate(data);
    
    expect(error).toBeDefined();
    
    if(error) {
        error.details.forEach(error => {
            console.log(`${error.path} : ${error.message}`);
        });
    }
});