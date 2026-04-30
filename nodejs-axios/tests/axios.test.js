import axios from "axios";

test('Should support http client', () => {
    const instance = axios.create({
        baseURL: "https://eovkp0h5dtd7x0w.m.pipedream.net",
        timeout: 5000,
        headers: { "X-Custom-Header": "foobar" },
    });

    expect(instance).toBeDefined();
});