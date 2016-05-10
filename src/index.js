/* eslint-disable no-unused-vars */
'use strict';

import fetch from 'isomorphic-fetch';
import assignPolyfill from 'object.assign/polyfill';
import options from './config/defaultOptions';

const assign = assignPolyfill();
const _options = {};

assign(_options, options);

/**
 * Set global config used for override the default global settings.
 *
 */
export function setConfig(customConfig = {}) {
    assign(_options, customConfig);
}

/**
 * Exported functions
 */

/**
 *  Get request
 */
export function doGet(customOptions) {
    const mergedOptions = {};

    merge(mergedOptions, customOptions, 'get');
    return doRequest(mergedOptions);
}

/**
 *  Put request
 */
export function doPut(customOptions) {
    const mergedOptions = {};

    merge(mergedOptions, customOptions, 'put');

    return doRequest(mergedOptions);
}

/**
 *  Post request
 */
export function doPost(customOptions) {
    const mergedOptions = {};

    merge(mergedOptions, customOptions, 'post');

    return doRequest(mergedOptions);
}

/**
 *  Delete request
 */
export function doDelete(customOptions) {
    const mergedOptions = {};
    
    merge(mergedOptions, customOptions, 'delete');

    return doRequest(mergedOptions);
}

/*
 * Private functions
 */

/**
 *  common used request sender
 */
function doRequest(customOptions = {}) {
    const optionInstance = {};
    assign(optionInstance, _options, customOptions);

    return fetch(optionInstance.url, optionInstance);
}

/**
 *  object merged function.
 *  @param obj: the raw object.
 *  @param source: the resource, can be `string` or `object`
 *  @param method: the request method.
 */
function merge(obj, source, method) {
    let _source = {};

    if (typeof source === 'string') {
        _source.url = source;
    } else {
        _source = source;
    }

    if (_source.method) {
        console.warn(`'${method}' is used for this type of request, your custom method type will be ignored.`);
    }

    assign(obj, _source, { method });
}
