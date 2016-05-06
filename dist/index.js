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

function doRequest() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    (0, _polyfill2.default)(_defaultOptions2.default, customOptions);

    return (0, _isomorphicFetch2.default)(_defaultOptions2.default.url, _defaultOptions2.default);
}

function setConfig() {
    var customConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    (0, _polyfill2.default)(_defaultOptions2.default, customConfig);
}

function doGet() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    (0, _polyfill2.default)(customOptions, { method: 'get' });

    return doRequest(customOptions);
}

function doPut() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    (0, _polyfill2.default)(customOptions, { method: 'put' });

    return doRequest(mergedOptions);
}

function doPost() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    (0, _polyfill2.default)(customOptions, { method: 'post' });

    return doRequest(mergedOptions);
}

function doDelete() {
    var customOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    (0, _polyfill2.default)(customOptions, { method: 'delete' });

    return doRequest(mergedOptions);
}