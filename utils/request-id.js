const { v4: uuidv4 } = require('uuid');
const moment = require('moment')

//random request id with uuid
// const v4options = {
//     node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
//     clockseq: 0x1234,
//     msecs: new Date().getTime(),
//     nsecs: 5678,
// };
// const requestId = uuidv4(v4options)

// random request id with moment milisecond
const requestId = () => {
    return moment().valueOf()
}

module.exports = requestId