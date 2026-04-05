import dns from "node:dns/promises";

const result = await dns.lookup("google.com");

console.log(result.address);
console.log(result.family);