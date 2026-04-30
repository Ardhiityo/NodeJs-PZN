import axios from "axios";
import fs from 'fs';
import FormData from "form-data";

const instance = axios.create({
    baseURL: "https://eovkp0h5dtd7x0w.m.pipedream.net",
    timeout: 5000,
    headers: { "X-Custom-Header": "foobar" },
});

// Add a request interceptor
instance.interceptors.request.use(
    async function (config) {
        // Do something before request is sent
        console.log(`request send to ${config.baseURL}${config.url}`);
        return config;
    },
    async function (error) {
        // Do something with request error
        console.log(`request error ${error.message}`)
        return Promise.reject(error);
    },
    {
        synchronous: false
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    async function (response) {
        // Do something with response data
        const fullUrl = response.config.baseURL + response.config.url;
        const body = JSON.stringify(response.config.data);
        console.log(`response from ${fullUrl} with data ${body}`);
        return response;
    },
    async function (error) {
        // Do something with response error
        const fullUrl = response.config.baseURL + response.config.url;
        console.log(`respone form ${fullUrl} with message ${error.message}`);
        return Promise.reject(error);
    },
    {
        synchronous: false
    }
);

test('Should support http client', () => {
    const instance = axios.create({
        baseURL: "https://eovkp0h5dtd7x0w.m.pipedream.net",
        timeout: 5000,
        headers: { "X-Custom-Header": "foobar" },
    });

    expect(instance).toBeDefined();
});

test('Should support http method', async () => {

    const response = await instance.get('/', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        params: {
            name: "Eko"
        }
    });

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
});

test('Should support http response', async () => {

    const response = await instance.get('/', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        params: {
            name: "Eko"
        }
    });

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
});

test('Should support http with json', async () => {

    const body = {
        name: 'Eko',
        age: 30
    }

    const response = await instance.post('/', body, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
});

test('Should support http with text/plain', async () => {

    const body = {
        name: 'Eko',
        address: "Indonesia"
    }

    const response = await instance.post('/', body, {
        headers: {
            "Content-Type": "text/plain",
            "Accept": "application/json"
        }
    });

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
});

test('Should support http with form data', async () => {

    const body = {
        name: 'Eko',
        email: "eko@test.com"
    }

    const response = await instance.post('/', body, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
        }
    });

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
});

test('Should support http with form url encoded', async () => {

    const body = {
        name: 'Eko',
        username: "eko"
    }

    const response = await instance.post('/', body, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        }
    });

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
});

test('Should support http with multipart form data', async () => {

    const form = new FormData();
    form.append("username", 'eko');
    form.append("password", 'rahasia');

    const image = fs.readFileSync(__dirname + '/sample.png');

    form.append('profile', image, 'sample.png');

    const response = await instance.post('/', form, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
        }
    });

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
});