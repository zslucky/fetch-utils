/* eslint-disable no-unused-vars */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setConfig = setConfig;
exports.doGet = doGet;
exports.doPut = doPut;
exports.doPost = doPost;
exports.doDelete = doDelete;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _polyfill = require('object.assign/polyfill');

var _polyfill2 = _interopRequireDefault(_polyfill);

var _defaultOptions = require('./config/defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assign = (0, _polyfill2.default)();
var _options = {};

assign(_options, _defaultOptions2.default);

/**
 * Set global config used for override the default global settings.
 *
 */
function setConfig() {
    var customConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    assign(_options, customConfig);
}

/**
 * Exported functions
 */

/**
 *  Get request
 */
function doGet(customOptions) {
    var mergedOptions = {};

    merge(mergedOptions, customOptions, 'get');
    return doRequest(mergedOptions);
}

/**
 *  Put request
 */
function doPut(customOptions) {
    var mergedOptions = {};

    merge(mergedOptions, customOptions, 'put');

    return doRequest(mergedOptions);
}

/**
 *  Post request
 */
function doPost(customOptions) {
    var mergedOptions = {};

    merge(mergedOptions, customOptions, 'post');

    return doRequest(mergedOptions);
}

/**
 *  Delete request
 */
function doDelete(customOptions) {
    var mergedOptions = {};

    merge(mergedOptions, customOptions, 'delete');

    return doRequest(mergedOptions);
}

/*
 * Private functions
 */

/**
 *  common used request sender
 */
function doRequest() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var optionInstance = {};
    assign(optionInstance, _options, customOptions);

    return (0, _isomorphicFetch2.default)(optionInstance.url, optionInstance).then(function (resp) {
        if (resp.status < 300 && resp.status >= 200) {
            return resp;
        }

        throw new Error(resp.statusText);
    });
}

/**
 *  object merged function.
 *  @param obj: the raw object.
 *  @param source: the resource, can be `string` or `object`
 *  @param method: the request method.
 */
function merge(obj, source, method) {
    var _source = {};

    if (typeof source === 'string') {
        _source.url = source;
    } else {
        _source = source;
    }

    if (_source.method) {
        console.warn('\'' + method + '\' is used for this type of request, your custom method type will be ignored.');
    }

    assign(obj, _source, { method: method });
}