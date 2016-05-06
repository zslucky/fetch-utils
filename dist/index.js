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

var _options = {};
(0, _polyfill2.default)(_options, _defaultOptions2.default);

/**
 * Set config used for override the default global settings.
 *
 */
function setConfig() {
    var customConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    (0, _polyfill2.default)(_options, customConfig);
}

/**
 * Exported functions
 */
function doGet() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var mergedOptions = {};
    merge(mergedOptions, customOptions, 'get');

    return doRequest(mergedOptions);
}

function doPut() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var mergedOptions = {};
    merge(mergedOptions, customOptions, 'put');

    return doRequest(mergedOptions);
}

function doPost() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var mergedOptions = {};
    merge(mergedOptions, customOptions, 'post');

    return doRequest(mergedOptions);
}

function doDelete() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var mergedOptions = {};
    merge(mergedOptions, customOptions, 'delete');

    return doRequest(mergedOptions);
}

/*
 * Private functions
 */
function doRequest() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    (0, _polyfill2.default)(_options, customOptions);

    return (0, _isomorphicFetch2.default)(_options.url, _options);
}

function merge(obj, source, method) {
    if (source.method) {
        console.warn('\'' + method + '\' is used for this type of request, your custom method type will be ignored.');
    }

    (0, _polyfill2.default)(obj, source, { method: method });
}