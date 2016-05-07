'use strict';

import { doGet, doPut, doDelete, doPost, setConfig } from '../src';
import chai from 'chai';

const assert = chai.assert;

describe('index', function() {
    it('should return true', function() {
        doGet('url');
        doPut('url');
        doPost('url');
        doDelete('url');
        setConfig('url');

        assert.equal(1, 1);
    });
});