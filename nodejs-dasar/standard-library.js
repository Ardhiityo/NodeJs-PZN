//jika ingin menggunakan javascript module namun tidak ingin mengubah nama file menjadi .mjs maka bisa menggunakan require function (cara lama, tidak direkomendasikan)
const os = require('os');

console.log(os.platform());
console.log(os.cpus());