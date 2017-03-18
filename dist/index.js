'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doDelete = exports.doPost = exports.doPut = exports.doGet = exports.setConfig = undefined;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _polyfill = require('object.assign/polyfill');

var _polyfill2 = _interopRequireDefault(_polyfill);

var _defaultOptions = require('./config/defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assign = (0, _polyfill2.default)(); /* eslint-disable no-unused-vars,no-console */

var opts = {};

assign(opts, _defaultOptions2.default);

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

  var optionInstance = {};
  assign(optionInstance, opts, customOptions);

  return (0, _isomorphicFetch2.default)(optionInstance.url, optionInstance).then(function (resp) {
    if (resp.status < 300 && resp.status >= 200) {
      return resp[getResponseType(optionInstance.responseType)]();
    }

    throw new Error(resp.statusText);
  });
};

/**
 *  object merged function.
 *  @param obj: the raw object.
 *  @param source: the resource, can be `string` or `object`
 *  @param method: the request method.
 */
var merge = function merge(obj, source, method) {
  var mergedOptions = {};

  if (typeof source === 'string') {
    mergedOptions.url = source;
  } else {
    mergedOptions = source;
  }

  if (mergedOptions.method) {
    console.warn('\'' + method + '\' is used for this type of request, your custom method type will be ignored.');
  }

  assign(obj, mergedOptions, { method: method });
};

/**
 * Exported functions
 */

/**
 * Set global config used for override the default global settings.
 */
var setConfig = exports.setConfig = function setConfig() {
  var customConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return assign(opts, customConfig);
};

/**
 *  Get request
 */
var doGet = exports.doGet = function doGet(customOptions) {
  var mergedOptions = {};

  merge(mergedOptions, customOptions, 'get');
  return doRequest(mergedOptions);
};

/**
 *  Put request
 */
var doPut = exports.doPut = function doPut(customOptions) {
  var mergedOptions = {};

  merge(mergedOptions, customOptions, 'put');

  return doRequest(mergedOptions);
};

/**
 *  Post request
 */
var doPost = exports.doPost = function doPost(customOptions) {
  var mergedOptions = {};

  merge(mergedOptions, customOptions, 'post');

  return doRequest(mergedOptions);
};

/**
 *  Delete request
 */
var doDelete = exports.doDelete = function doDelete(customOptions) {
  var mergedOptions = {};

  merge(mergedOptions, customOptions, 'delete');

  return doRequest(mergedOptions);
};

// export setConfig;
// export doGet;
// export doPut;
// export doPost;
// export doDelete;