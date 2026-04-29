export const hello = async () => {
    return 'Hello'; //error : no await expression
};

export const sum = (a, b) => {
    let total = a + b; //error : total is never reassigned
    return total;
};