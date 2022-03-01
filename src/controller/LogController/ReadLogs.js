const fs = require('fs')
const moment = require('moment')
const path = require('path');
var pjson = require('../../../package.json');
const logger = require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');
var requestId = getRequestId()
const getFilter = require('./getFilter')

class Controller {
    static async readLogs(flag , date, type, filterRequestId){
        try {
            let projectFolder = pjson.name
            projectFolder = projectFolder.charAt(0).toUpperCase() + projectFolder.slice(1); //Capital case
            let folderPath = path.resolve(process.cwd()+'/../')
            date = new Date(date)
            let data = []
            let fileContent
            let log
            let filterType = []
            let listFilterType = await getFilter(folderPath, filterType)
            for(const resultfilterType of listFilterType){
                if(type == resultfilterType.type){
                    if (flag == 'info') {
                        fileContent = fs.readFileSync(process.cwd() + '/../'+resultfilterType.folder+`/logs/${date.getMonth() + 1}-${date.getFullYear()}/info/application-${moment(date).format('YYYY-MM-DD')}-info.log`, 'utf-8')
                        log = fileContent.split('\n')
                    } else {
                        fileContent = fs.readFileSync(process.cwd() + '/../'+resultfilterType.folder+`/logs/${date.getMonth() + 1}-${date.getFullYear()}/error/application-${moment(date).format('YYYY-MM-DD')}-error.log`, 'utf-8')
                        log = fileContent.split('\n')
                    }
                }
            }
            // console.log('filterRequestId: ', filterRequestId)
            for(const resultLog of log){
                let resultLogObj = new Object()
                resultLogObj.log = resultLog
                if(filterRequestId){
                    // let splitLog = resultLog.split('|')
                    // let requestIdLog = ''+splitLog[0]
                    // console.log('requestIdLog: ', requestIdLog)
                    // requestIdLog = requestIdLog.replace(/(\r\n|\n|\r)/gm, "") //remove break
                    let position = resultLog.search(filterRequestId)
                    // if(requestIdLog == filterRequestId){
                    //     data.push(resultLogObj)
                    // }
                    if(position != -1){
                        data.push(resultLogObj)
                    }
                }
                else{
                    data.push(resultLogObj)
                }
            }
            return data
        }
        catch (err) {
            if (err.message.includes('no such file or directory')) {
                logger.info(requestId+` [LOG] msg: no such file or directory, please input filter properly!`)
            } else {
                logger.error(requestId+` [LOG] msg: ${err}`)
            }
        }
    }
}
module.exports = Controller.readLogs