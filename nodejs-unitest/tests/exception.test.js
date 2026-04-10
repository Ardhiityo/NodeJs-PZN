import { callMe, MyException } from "../src/exception.js";

test('test exception', () => {
    //Memastikan tidak terjadi exception
    expect(() => callMe('Eko')).not.toThrow();

    //Memastikan terjadi exception apapun
    expect(() => callMe()).toThrow();

    //Memastikan exception dengan tipe tertentu
    expect(() => callMe()).toThrow(MyException);

    //Memastikan exception dengan pesan tertentu
    expect(() => callMe()).toThrow("Ups, ada error");
});