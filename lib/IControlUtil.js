const rp = require('request-promise');
const _ = require('lodash');
const Promise = require('bluebird');
const strict = process.env.NODE_TLS_REJECT_UNAUTHORIZED === '1' ? true : false;

let IControlUtil = function(opts) {

    if (_.isNil(opts)) {
        return Promise.reject(new Error('iControl.Initialization(): Request Options is required'));
    }

    if (_.isNil(opts.token)) {
        return Promise.reject(new Error('iControl.Initialization(): Authorization Token is required'));
    }

    if(strict && _.isNil(opts.ca)) {
        return Promise.reject(new Error('iControl.Initialization()(): No CA Specify for strict mode'));
    }

    // Set default options
    this.host = (typeof opts.host === 'string') ? opts.host : '127.0.0.1';
    this.proto = (typeof opts.proto === 'string') ? opts.proto : 'https';
    this.port = (typeof opts.port === 'number') ? opts.port : 443;
    this.output = (typeof opts.output === 'boolean') ? opts.output : false;

};

// List collections
IControlUtil.prototype.list = function (path, cb) {

    if (_.isNil(path)) {
        return Promise.reject(new Error('iControl.List():API Path is required'));
    }

    _.attempt(this.output, 'path for get = ' + path);

    let opts = {path: path, method: 'GET'};
    return this.sendRequest(opts);
};

// Create a collection
IControlUtil.prototype.create = function (path, body, cb) {

    if (_.isNil(path)) {
        return Promise.reject(new Error('iControl.List():API Path is required'));
    }

    _.attempt(this.output, 'path for create = ' + path);
    _.attempt(this.output, 'body for create = ' + body);
    let opts = {path: path, body: body, method: 'POST'};
    return this.sendRequest(opts);
};

// Update and Modify a collection
IControlUtil.prototype.update = function (path, body, cb) {

    if (_.isNil(path)) {
        return Promise.reject(new Error('iControl.List():API Path is required'));
    }

    _.attempt(this.output, 'path for update = ' + path);
    _.attempt(this.output, 'body for update = ' + body);
    let opts = {path: path, body: body, method: 'PUT'};
    return this.sendRequest(opts);
};

// Delete a collection
IControlUtil.prototype.delete = function (path, cb) {

    if (_.isNil(path)) {
        return Promise.reject(new Error('iControl.List():API Path is required'));
    }

    _.attempt(this.output, 'path for delete = ' + path);
    let opts = {path: path, method: 'DELETE'};
    return this.sendRequest(opts);
};


IControlUtil.prototype.sendRequest = function (opts, cb) {

    _.attempt(this.output, 'opts for sendRequest = ' + JSON.stringify(opts));

    if (typeof opts.path !== 'string') {
        throw new Error('Invalid URL Path provided');
    }

    let uri = this.proto + '://' + this.host + ':' + this.port + opts.path;

    let reqOptions = {
        uri: uri,
        method: opts.method,
        json: true,
        rejectUnauthorized: strict,  //Allows Self-signed certificate in lab
        strictSSL: strict,
        ca: this.ca,
        headers: {
            'Authorization': this.token,
            'Content-Type': 'application/json'
        }

    };

    // If body has been specified and not empty, add to request options
    if (typeof opts.body === 'object' && !_.isEmpty(opts.body)) {
        reqOptions.body = opts.body;
    }

    // If query string has been specified and not empty, add to request options
    if (typeof opts.query === 'string' && !_.isEmpty(opts.query)) {
        reqOptions.qs = opts.query;
    }
    _.attempt(this.output, 'Request Options for sendRequest = ' + JSON.stringify(reqOptions));

    return rp(reqOptions).then((response) => {
        _.attempt(this.output, 'Response from sendRequest = ' + JSON.stringify(response));
        return response;
    }).catch((err) => {
        _.attempt(this.output, 'Err Response from sendRequest = ' + JSON.stringify(err));
        return {
            status : 'Error',
            message : err.message
        }
    });
};

module.exports = IControlUtil;