/* eslint-disable no-unused-vars,no-console */
import fetch from 'isomorphic-fetch';
import assignPolyfill from 'object.assign/polyfill';
import options, { defaultResponseType } from './config/defaultOptions';

const assign = assignPolyfill();
const opts = {};

assign(opts, options);

/**
 *  Get an check the responseType user sets.
 */
const getResponseType = (type) => {
  const validType = String(type).toLowerCase();
  const types = {
    json: true,
    text: true,
    formData: true,
    blob: true,
    arrayBuffer: true,
  };

  return types[validType] ? validType : defaultResponseType;
};

/*
 * Private functions
 */

/**
 *  common used request sender
 */
const doRequest = (customOptions = {}) => {
  const optionInstance = {};
  assign(optionInstance, opts, customOptions);

  return fetch(optionInstance.url, optionInstance).then((resp) => {
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
const merge = (obj, source, method) => {
  let mergedOptions = {};

  if (typeof source === 'string') {
    mergedOptions.url = source;
  } else {
    mergedOptions = source;
  }

  if (mergedOptions.method) {
    console.warn(`'${method}' is used for this type of request, your custom method type will be ignored.`);
  }

  assign(obj, mergedOptions, { method });
};

/**
 * Exported functions
 */

/**
 * Set global config used for override the default global settings.
 */
export const setConfig = (customConfig = {}) => assign(opts, customConfig);

/**
 *  Get request
 */
export const doGet = (customOptions) => {
  const mergedOptions = {};

  merge(mergedOptions, customOptions, 'get');
  return doRequest(mergedOptions);
};

/**
 *  Put request
 */
export const doPut = (customOptions) => {
  const mergedOptions = {};

  merge(mergedOptions, customOptions, 'put');

  return doRequest(mergedOptions);
};

/**
 *  Post request
 */
export const doPost = (customOptions) => {
  const mergedOptions = {};

  merge(mergedOptions, customOptions, 'post');

  return doRequest(mergedOptions);
};

/**
 *  Delete request
 */
export const doDelete = (customOptions) => {
  const mergedOptions = {};

  merge(mergedOptions, customOptions, 'delete');

  return doRequest(mergedOptions);
};

// export setConfig;
// export doGet;
// export doPut;
// export doPost;
// export doDelete;
