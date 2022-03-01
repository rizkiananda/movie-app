const logger = require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');
var requestId = getRequestId()
const path = require('path');
const fs = require('fs')
const util = require('util');

class Controller {
    static async uploadFile(type, id, fileDB, upload, deleteImage){
        //type is folder name
        let uploadPath;
        var pathDB;
        //NEED TO DO: CREATE FOLDER IF FOLDER DOESNT EXIST
        try {
            //Kondisi antara hapus atau tidak file yang sudah ada
            pathDB = process.cwd() + '/document/'+ type +'/' + fileDB
            let remove = 'no'
            if(fileDB != null){
                if(upload){
                    remove = 'yes'
                }
                else{
                    if(deleteImage == true || deleteImage == "true"){
                        remove = 'yes'
                    }
                }
            }

            if(remove == 'yes'){
                if (fs.existsSync(pathDB)) {
                    fs.unlink(pathDB, (err) => {
                        if (err) {
                            logger.error(requestId+' [UPLOAD FILE] msg: '+err)
                            res.status(500).send({ result: 'error', message: 'Terjadi kesalahan! Silakan coba lagi atau hubungi vendor.', data: {} })
                        }
                    })
                }
            }

            //kondisi menyimpan file ke dalam folder
            if(upload){
                let fileUpload = upload
               
                var fileName = fileUpload.name

                uploadPath = process.cwd() + '/document/'+ type +'/' + fileName;

                //jika pas upload file, ternyata nama file nya ada yg sama, ubah nama filenya dengan menyisipkan id
                if (fs.existsSync(uploadPath)) {
                    let splitString = fileName.split('.')
                    let extension = fileName.substr(fileName.lastIndexOf('.') + 1)
                    fileName = splitString[0]+'('+id+').'+extension
                }
                uploadPath = process.cwd() + '/document/'+ type +'/' + fileName
                
                //bikin folder dokumen jika belom ada
                let dir = process.cwd() + '/document/'+ type
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir, { recursive: true });
                }

                //masukin file dokumen ke folder
                var uploadProcess = await fileUpload.mv(uploadPath, async function(err) {
                    if (err){
                        logger.error(requestId+` [UPLOAD FILE], msg: ${err}`)
                    }
                });
           }
           return fileName
       }
       catch (err) {
            logger.error(requestId+` [UPLOAD FILE], msg: ${err}`)
       }
   }
}

module.exports = Controller.uploadFile