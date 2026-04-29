export const hello = async () => {
    return 'Hello'; //error : no await expression
};

export const sum = (a, b) => {
    let total = a + b; //error : total is never reassigned
    return total;
};

//jalankan di cmd : npx eslint src --format html > eslint.html
//akan membuat file eslint.html berisi error nya
