const crypto = require("crypto");

const encrypt = (message) => {
    // const algorithm = "aes-128-cbc"; 
    // // generate 16 bytes of random data
    // const initVector = crypto.randomBytes(16);

    // // secret key generate 32 bytes of random data
    // const Securitykey = crypto.randomBytes(16);

    // // the cipher function
    // const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    // // const cipher = crypto.SHA3(message, { outputLength: 24 });
    // // encrypt the message
    // // input encoding
    // // output encoding
    
    // let encryptedData = cipher.update(message, "utf-8", "hex");
    // encryptedData += cipher.final("hex");
    // let encryptedData = crypto.enc.Hex.parse(message, { outputLength: 24 });
    // let encryptedData = crypto.randomBytes(12).toString('hex')
    // const bufferText = Buffer.from(message, 'utf8'); // or Buffer.from('hello world')
    // console.log(bufferText); // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>

    // const text = bufferText.toString('hex');
    // // To get hex
    // console.log(text); // 68656c6c6f20776f726c64

    // console.log(bufferText.toString()); // or toString('utf8')
    // hello world

    //one single line
    // let encryptedData = Buffer.from(message).toString('hex')

    const encryptedData = crypto.randomBytes(12, (err, message) => {
        console.log('message: ', message)
        // if (err) {
        //   // Prints error
        //   console.log(err);
        //   return;
        // }
        
        // Prints random bytes of generated data
        console.log("The random data is: "
                   + message.toString('hex'));
    });
    return encryptedData
}

// const encrypt = ('hmac', { length: 64 }, (err, key) =>{
//     if (err) throw err;
//     console.log('encypt: ', key.export().toString('hex'));
//     return key.export().toString('hex')
// })
  
//   generateKey('hmac', { length: 64 }, (err, key) => {
//     if (err) throw err;
//     console.log(key.export().toString('hex'));  // 46e..........620
//   });


module.exports = { encrypt }