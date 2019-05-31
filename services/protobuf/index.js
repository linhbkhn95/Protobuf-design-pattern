var protobuf = require("protobufjs");
var config = require('./config');
class InstanceMessage {
    constructor(instance) {
        this.instance = instance;
    }
    setInstance(instance) {
        this.instance = instance;
    }
    encode(message) {

        return new Promise((resolve, reject) => {
            try {
                if (this.instance) {

                    var errMsg = this.instance.verify(message);
                    if (errMsg) {
                        console.log('errMsg: ', errMsg);
                        if (errMsg)
                            throw Error(errMsg);
                    }
                    message = this.instance.create(message);
                    var buffer = this.instance.encode(message).finish();
                    resolve(buffer);
                } else {
                    reject('instance is null')
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    decode(buffer) {
        return new Promise((resolve, reject) => {
            try {
                if (this.instance) {
                    var message = this.instance.decode(buffer);
                    resolve(message);
                } else {
                    reject('instance is null')
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}


module.exports = {
    //get root from protobuf
    getInstanceRoot(path, ) {

        const root = new protobuf.Root().loadSync(path, {
            keepCase: true
        });
        return root;
    },
    getInstanceMesage(path, message_type) {
        const root = this.getInstanceRoot(path);
        const instance = root.lookupType(message_type);
        const instanceMessage = new InstanceMessage(instance);
        return instanceMessage;
    },
    getListMessage() {
        const messages = {
            AwesomeMessage: (message_type = config.awesome.defaultType) => this.getInstanceMesage(config.awesome.pathFile, message_type),
            SallBank: (message_type = config.sallBank.defaultType) => this.getInstanceMesage(config.sallBank.pathFile, message_type)

        }
        return messages;
    },
}