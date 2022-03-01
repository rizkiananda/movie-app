class Controller {
    static async createObj(attributeName, message, errorMessage){
        let messagePerAttribute = []
        messagePerAttribute.push(message)
        var key = attributeName;
        var obj = {};
        let listObjKeys = Object.keys(errorMessage)
        var available = false
        let availableMessages
        if(listObjKeys.length == 0){
            obj[key] = messagePerAttribute;
        }
        else{
            for(const listObjKey of listObjKeys){
                if(listObjKey == key){
                    available = true
                    availableMessages = errorMessage[key]
                }
            }
            if(available == true){
                for(const availableMessage of availableMessages){
                    messagePerAttribute.push(availableMessage)
                }
                obj[key] = messagePerAttribute
            }
            else{
                obj[key] = messagePerAttribute
            }
        }
        errorMessage[key] = obj[key]
        return 'ok'
    }

    // static async test(listObjKeys, messagePerAttribute, obj, key, errorMessage){
    //     var available = false
    //     let tests
    //     if(listObjKeys.length == 0){
    //         obj[key] = messagePerAttribute;
    //     }
    //     else{
    //         for(const listObjKey of listObjKeys){
    //             if(listObjKey == key){
    //                 available = true
    //                 tests = errorMessage[key]
    //                 console.log('test: ', tests)
    //             }
    //         }
    //         if(available == true){
    //             for(const test of tests){
    //                 messagePerAttribute.push(test)
    //             }
    //             obj[key] = messagePerAttribute
    //         }
    //         else{
    //             obj[key] = messagePerAttribute
    //         }
    //     }
    //     console.log('obj: ', obj[key])
    //     return obj[key]
    // }
}
module.exports = Controller.createObj