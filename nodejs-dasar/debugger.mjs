//untuk menjalankan debugger, gunakan perintah node inspect debugger.mjs
//atau bisa juga dengan bantuan text editor

//untuk debug variabel bisa menggunakan : watch('nama_variabel')
/**
cont, c: Continue execution
next, n: Step next
step, s: Step in
out, o: Step out
pause: Pause running code
 */

function sayHello(name) {
    debugger;
    return `Hello ${name}`;
}

sayHello('Budi');