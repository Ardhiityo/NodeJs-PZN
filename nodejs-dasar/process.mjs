import process from "node:process";

process.on("exit", (code) => {
    console.log(`About to exit with code: ${code}`);
});

console.log(process.version);

//node process.mjs "arya adhi"
console.table(process.argv);

//console.table(process.env);

process.exit(1);