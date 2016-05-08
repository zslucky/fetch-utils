/* eslint-disable no-unused-vars */
'use strict';

import fetch from 'isomorphic-fetch';
import assignPolyfill from 'object.assign/polyfill';
import options from './config/defaultOptions';

const assign = assignPolyfill();
const _options = {};

assign(_options, options);

/**
 * Set config used for override the default global settings.
 *
 */
export function setConfig(customConfig = {}) {
    assign(_options, customConfig);
}

/**
 * Exported functions
 */
export function doGet(customOptions) {
    const mergedOptions = {};

    merge(mergedOptions, customOptions, 'get');
    return doRequest(mergedOptions);
}

export function doPut(customOptions) {
    const mergedOptions = {};

    merge(mergedOptions, customOptions, 'put');

    return doRequest(mergedOptions);
}

export function doPost(customOptions) {
    const mergedOptions = {};

    merge(mergedOptions, customOptions, 'post');

    return doRequest(mergedOptions);
}

export function doDelete(customOptions) {
    const mergedOptions = {};
    
    merge(mergedOptions, customOptions, 'delete');

    return doRequest(mergedOptions);
}

/*
 * Private functions
 */
function doRequest(customOptions = {}) {
    assign(_options, customOptions);

    return fetch(_options.url, _options);
}

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
