'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doDelete = exports.doPost = exports.doPut = exports.doGet = exports.setConfig = undefined;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _defaultOptions = require('./config/defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = {}; /* eslint-disable no-unused-vars,no-console */


(0, _deepmerge2.default)(opts, _defaultOptions2.default);

/**
 *  Get an check the responseType user sets.
 */
var getResponseType = function getResponseType(type) {
  var validType = String(type).toLowerCase();
  var types = {
    json: true,
    text: true,
    formData: true,
    blob: true,
    arrayBuffer: true
  };

  return types[validType] ? validType : _defaultOptions.defaultResponseType;
};

/*
 * Private functions
 */

/**
 *  common used request sender
 */
var doRequest = function doRequest() {
  var customOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var optionInstance = (0, _deepmerge2.default)(opts, customOptions);
  var errorHandlers = optionInstance.errorHandlers;

  return (0, _isomorphicFetch2.default)(optionInstance.url, optionInstance).then(function (resp) {
    if (resp.status < 300 && resp.status >= 200) {
      return resp[getResponseType(optionInstance.responseType)]();
    }

    if (errorHandlers[resp.status]) {
      var ErrorInstance = errorHandlers[resp.status];
      throw new ErrorInstance(resp.statusText);
    }

    throw new Error(resp.statusText);
  });
};

/**
 *  object merged function.
 *  @param source: the resource, can be `string` or `object`
 *  @param method: the request method.
 */
var customMerge = function customMerge(source, method) {
  var mergedOptions = {};

  if (typeof source === 'string') {
    mergedOptions.url = source;
  } else {
    mergedOptions = source;
  }

  if (mergedOptions.method) {
    console.warn('\'' + method + '\' is used for this type of request, your custom method type will be ignored.');
  }

  return (0, _deepmerge2.default)(mergedOptions, { method: method });
};

/**
 * Exported functions
 */

/**
 * Set global config used for override the default global settings.
 */
var setConfig = exports.setConfig = function setConfig() {
  var customConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  opts = (0, _deepmerge2.default)(opts, customConfig);
};

/**
 *  Get request
 */
var doGet = exports.doGet = function doGet(customOptions) {
  var mergedOptions = customMerge(customOptions, 'get');

  return doRequest(mergedOptions);
};

/**
 *  Put request
 */
var doPut = exports.doPut = function doPut(customOptions) {
  var mergedOptions = customMerge(customOptions, 'put');

  return doRequest(mergedOptions);
};

/**
 *  Post request
 */
var doPost = exports.doPost = function doPost(customOptions) {
  var mergedOptions = customMerge(customOptions, 'post');

  return doRequest(mergedOptions);
};

/**
 *  Delete request
 */
var doDelete = exports.doDelete = function doDelete(customOptions) {
  var mergedOptions = customMerge(customOptions, 'delete');

  return doRequest(mergedOptions);
};

// export setConfig;
// export doGet;
// export doPut;
// export doPost;
// export doDelete;