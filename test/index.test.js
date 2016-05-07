'use strict';

import { doGet, doPut, doDelete, doPost, setConfig } from '../src';
import chai from 'chai';

const assert = chai.assert;

describe('index', function() {
    it('should get successfully', function() {
        doGet('url');

        assert.equal(1, 1);
    });

    it('should put successfully', function() {
        doPut('url');

        assert.equal(1, 1);
    });

    it('should post successfully', function() {
        doPost('url');

        assert.equal(1, 1);
    });

    it('should delete successfully', function() {
        doDelete('url');

        assert.equal(1, 1);
    });

    it('should setConfig successfully', function() {
        setConfig('url');

        assert.equal(1, 1);
    });
});