import Joi from "joi";

test("validation option", () => {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(100).required()
    });
    
    const data = {
        email: "eko"
    };
    
    // abortEarly => false => joi tidak berhenti jika sudah menemukan error pertama,
    // tapi akan melanjutkan validasi ke field berikutnya
    const {error, value} = schema.validate(data, { abortEarly: false });
    
    expect(error).toBeDefined();
    
    if(error) {
        error.details.forEach(error => {
            console.log(`${error.path} : ${error.message}`);
        });
    }
});