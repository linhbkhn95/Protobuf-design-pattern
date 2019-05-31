const express = require('express');
var app = express();
const bodyParser = require('body-parser');

const path = require('path');
var protobufService = require('./services/protobuf')

app.use(bodyParser.json());
testProtobuf();

app.listen('3000', () => {
    console.log('App running on 3000');
});


async function testProtobuf() {
    // protobufService.test();
    try {
        const AwesomeMessage = protobufService.getListMessage().AwesomeMessage();
        if (AwesomeMessage) {
            let message = {
                // awesomeField: "AwesomeString",
                awesome_field: "Linh dep trai"

            }
            let buffer = await AwesomeMessage.encode(message)
            console.log('buffer: ', buffer);
            message = await AwesomeMessage.decode(buffer);
            console.log('message: ', message);
        } else {
            console.log('AwesomeMessage is null')
        }
    } catch (error) {
        console.log('error: ', error);

    }
}