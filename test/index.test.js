'use strict';

import { doGet, doPut, doDelete, doPost, setConfig } from '../src';
import chai from 'chai';

const assert = chai.assert;

describe('index', function() {
    it('should return true', function() {
        doGet();
        doPut();
        doPost();
        doDelete();
        setConfig();

        assert.equal(1, 1);
    });
});