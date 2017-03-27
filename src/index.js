/* eslint-disable no-unused-vars,no-console */
import fetch from 'isomorphic-fetch';
import merge from 'deepmerge';
import options, { defaultResponseType } from './config/defaultOptions';

let opts = {};

merge(opts, options);

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
  const optionInstance = merge(opts, customOptions);
  const errorHandlers = optionInstance.errorHandlers;

  return fetch(optionInstance.url, optionInstance).then((resp) => {
    if (resp.status < 300 && resp.status >= 200) {
      return resp[getResponseType(optionInstance.responseType)]();
    }

    if (errorHandlers[resp.status]) {
      const ErrorInstance = errorHandlers[resp.status];
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
const customMerge = (source, method) => {
  let mergedOptions = {};

  if (typeof source === 'string') {
    mergedOptions.url = source;
  } else {
    mergedOptions = source;
  }

  if (mergedOptions.method) {
    console.warn(`'${method}' is used for this type of request, your custom method type will be ignored.`);
  }

  return merge(mergedOptions, { method });
};

/**
 * Exported functions
 */

/**
 * Set global config used for override the default global settings.
 */
export const setConfig = (customConfig = {}) => { opts = merge(opts, customConfig); };

/**
 *  Get request
 */
export const doGet = (customOptions) => {
  const mergedOptions = customMerge(customOptions, 'get');

  return doRequest(mergedOptions);
};

/**
 *  Put request
 */
export const doPut = (customOptions) => {
  const mergedOptions = customMerge(customOptions, 'put');

  return doRequest(mergedOptions);
};

/**
 *  Post request
 */
export const doPost = (customOptions) => {
  const mergedOptions = customMerge(customOptions, 'post');

  return doRequest(mergedOptions);
};

/**
 *  Delete request
 */
export const doDelete = (customOptions) => {
  const mergedOptions = customMerge(customOptions, 'delete');

  return doRequest(mergedOptions);
};

// export setConfig;
// export doGet;
// export doPut;
// export doPost;
// export doDelete;
