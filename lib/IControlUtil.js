const rp = require('request-promise');
const _ = require('lodash');
const Promise = require('bluebird');
const strict = process.env.NODE_TLS_REJECT_UNAUTHORIZED === '1' ? true : false;

/**
 * Constructor
 *
 * @param opts Options when initializing a IControl Client instance
 *
 */
let IControlUtil = function(opts) {

    if (_.isNil(opts)) {
        throw new Error('iControl.Initialization(): Request Options is required');
    }

    if(strict && _.isNil(opts.ca)) {
        throw new Error('iControl.Initialization(): No CA provided for strict mode');
    }

    // Set default options
    this.host = (typeof opts.host === 'string') ? opts.host : '127.0.0.1';
    this.proto = (typeof opts.proto === 'string') ? opts.proto : 'https';
    this.port = (typeof opts.port === 'number') ? opts.port : 443;
    this.output = (typeof opts.output === 'boolean') ? opts.output : false;

};

/**
 * List all F5 iControl Collections
 *
 * @param path URL path
 * @param cb callback
 *
 * @return {Promise}
 * @public
 */
IControlUtil.prototype.list = function (path, cb) {

    if (_.isNil(path)) {
        return Promise.reject(new Error('iControl.list():API Path is required'));
    }

    _.attempt(this.output, 'path for get = ' + path);

    let opts = {path: path, method: 'GET'};
    return this.sendRequest(opts);
};

/**
 * Create a F5 iControl Collection
 *
 * @param path URL path
 * @param body Post request Body
 * @param cb callback
 *
 * @return {Promise}
 * @public
 */
IControlUtil.prototype.create = function (path, body, cb) {

    if (_.isNil(path)) {
        return Promise.reject(new Error('iControl.create():API Path is required'));
    }

    if (_.isNil(body)) {
        return Promise.reject(new Error('iControl.create():Request Body is required'));
    }

    _.attempt(this.output, 'path for create = ' + path);
    _.attempt(this.output, 'body for create = ' + body);
    let opts = {path: path, body: body, method: 'POST'};
    return this.sendRequest(opts);
};

/**
 * Update a F5 iControl Collection
 *
 * @param path URL path
 * @param body Post request Body
 * @param cb callback
 *
 * @return {Promise}
 * @public
 */
IControlUtil.prototype.update = function (path, body, cb) {

    if (_.isNil(path)) {
        return Promise.reject(new Error('iControl.update():API Path is required'));
    }

    if (_.isNil(body)) {
        return Promise.reject(new Error('iControl.update():Request Body is required'));
    }

    _.attempt(this.output, 'path for update = ' + path);
    _.attempt(this.output, 'body for update = ' + body);
    let opts = {path: path, body: body, method: 'PUT'};
    return this.sendRequest(opts);
};

/**
 * Delete a F5 iControl Collection
 *
 * @param path URL path
 * @param cb callback
 *
 * @return {Promise}
 * @public
 */
IControlUtil.prototype.delete = function (path, cb) {

    if (_.isNil(path)) {
        return Promise.reject(new Error('iControl.delete():API Path is required'));
    }

    _.attempt(this.output, 'path for delete = ' + path);
    let opts = {path: path, method: 'DELETE'};
    return this.sendRequest(opts);
};

/**
 * Send HTTP request to F5
 *
 * @param opts Request options
 * @param cb Callback
 *
 * @return {Promise}
 * @public
 */
IControlUtil.prototype.sendRequest = function (opts, cb) {

    _.attempt(this.output, 'opts for sendRequest = ' + JSON.stringify(opts));

    if (typeof opts.path !== 'string') {
        return Promise.reject(new TypeError('iControl.sendRequest():Invalid URL Path provided'));
    }

    let uri = this.proto + '://' + this.host + ':' + this.port + opts.path;

    let options = {
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
        options.body = opts.body;
    }

    // If query string has been specified and not empty, add to request options
    if (typeof opts.query === 'string' && !_.isEmpty(opts.query)) {
        options.qs = opts.query;
    }
    _.attempt(this.output, 'Request Options for sendRequest = ' + JSON.stringify(options));

    return rp(options).then((res) => {
        _.attempt(this.output, 'Response from sendRequest = ' + JSON.stringify(res));
        return res;
    }).catch((err) => {
        _.attempt(this.output, 'Error from sendRequest = ' + JSON.stringify(err));
        return Promise.reject(new Error('iControl.sendRequest(): ' + err));
    });
};

module.exports = IControlUtil;