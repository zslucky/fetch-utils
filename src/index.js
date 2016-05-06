/* eslint-disable no-unused-vars */
'use strict';

import fetch from 'isomorphic-fetch';
import assign from 'object.assign/polyfill';
import options from './config/defaultOptions';

function doRequest(customOptions = {}) {
    assign(options, customOptions);

    return fetch(options.url, options);
}

export function setConfig(customConfig = {}) {
    assign(options, customConfig);
}

export function doGet(customOptions = {}) {
    assign(customOptions, { method: 'get' });
    
    return doRequest(customOptions);
}

export function doPut(customOptions = {}) {
    assign(customOptions, { method: 'put' });

    return doRequest(mergedOptions);
}

export function doPost(customOptions = {}) {
    assign(customOptions, { method: 'post' });

    return doRequest(mergedOptions);
}

export function doDelete(customOptions = {}) {
    assign(customOptions, { method: 'delete' });

    return doRequest(mergedOptions);
}
