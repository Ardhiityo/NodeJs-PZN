export const sayHelloAsync = (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (name) {
                resolve(`Hello ${name}`);
            } else {
                reject(new Error("Name is required"));
            }
        }, 1000);
    });
};