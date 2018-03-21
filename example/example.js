'use strict';
const IControlUtil = require('../lib/IControlUtil');
const config = require('./config/sample.json');
const fs = require('fs');

let iControlClient = new IControlUtil({
    host: config.test.host,
    ca: fs.readFileSync(config.test.ca, {encoding: 'utf-8'}),
    token: config.test.token, //Authorization Token for Basic Auth
    output: true //Set to true if you want to see output
});

iControlClient.list('/mgmt/tm/net/bwc/policy').then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
});

