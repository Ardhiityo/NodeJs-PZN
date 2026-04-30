import axios from "axios";

const instance = axios.create({
    baseURL: "https://eovkp0h5dtd7x0w.m.pipedream.net",
    timeout: 5000,
    headers: { "X-Custom-Header": "foobar" },
});

test('Should support http client', () => {
    const instance = axios.create({
        baseURL: "https://eovkp0h5dtd7x0w.m.pipedream.net",
        timeout: 5000,
        headers: { "X-Custom-Header": "foobar" },
    });

    expect(instance).toBeDefined();
});

test('Should support http method', async () => {

    const response = await instance.get();
    
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
});