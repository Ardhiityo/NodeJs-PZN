import { URL } from 'node:url';

const myURL = new URL('https://example.com/images?keyword=martabak');

//console.log(myURL);
console.log(myURL.href);
console.log(myURL.pathname);
console.log(myURL.search);
console.log(myURL.searchParams);

myURL.hostname = 'google.com';
myURL.searchParams.append('type', 'special');
console.log(myURL.href);
console.log(myURL.searchParams);