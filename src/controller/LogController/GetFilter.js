const fs = require('fs')
const logger= require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');
var requestId = getRequestId()

class Controller {
    static async getFilter(folderPath, filterType){
        return new Promise(async (resolve, rejects) => {
            try {
                fs.readdir(folderPath, filterType, async function (err, folders) {
                    //handling error
                    if (err) {
                        return console.log('Unable to scan directory: ' + err)
                    } 
                    //listing all folders using forEach
                    folders.forEach(function (folder) {
                        let filterTypeObj = new Object()
                        let splitFolderName = folder.split('-')
                        let lastElement = splitFolderName[splitFolderName.length - 1]
                        filterTypeObj.type = lastElement
                        filterTypeObj.folder = folder
                        filterType.push(filterTypeObj) 
                    })
                    return resolve(filterType)
                })
            }
            catch (err) {
                logger.error(requestId+` [FILTER LOG] msg: ${err}`)
            }
        })
    }
}

module.exports = Controller.getFilter
