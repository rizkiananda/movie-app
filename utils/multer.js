const multer  = require('multer')

const uploadMulter = (type) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // console.log(process.cwd()+'/document/excel_user')
            cb(null, process.cwd()+'/document/'+type)
            // cb(null, './document/excel_user')
        },
        filename: function (req, file, cb) {
            console.log(file)
            cb(null, file.originalname)
        }
    })
    
    const upload = multer({ storage: storage }).single('file')
    return upload
}

module.exports = uploadMulter

