function tagFunction(param1, ...param2) {
    console.log(param1); 
    console.log(param2);
}

test('tag function' , () => {
    const name = 'Eko';
    
    tagFunction `hello ${name}! how are you?`;
    
    //result:
    //param1: ['hello ', '! how are you?']
    //param2: ['Eko']
})

test('tag function sql' , () => {
    const user = 'eko';
    const password = 'password';
    
    tagFunction `SELECT * FROM users WHERE username = ${user} AND password = ${password}`;
    
    //result:
    //param1: ['SELECT * FROM users WHERE username = ', ' AND password = ', '']
    //param2: ['eko', 'password']
})