import Joi from "joi";

test("validation date with iso", () => {
    const schema = Joi.object({
        birthDate: Joi.date()
            .required()
            .max("now")
            .min("1988-01-01")
            .iso()
    });

    const data = {
        birthDate: "1999-05-05"
    };

    const { error, value } = schema.validate(data);

    expect(error).toBeUndefined();
    expect(value.birthDate).toEqual(new Date("1999-05-05"));
    
    // value.birthDate : object new Date()
    console.log(value.birthDate.toString());
});