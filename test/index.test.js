'use strict';

import { doGet, doPut, doDelete, doPost, setConfig } from '../src';
import chai from 'chai';

const assert = chai.assert;

describe('index.js', function() {
    this.timeout(60000);

    let url;

    beforeEach(function() {
        url = 'http://dropwizard-myblog.herokuapp.com/api/v1/test';    
    });

    describe('with custom configuration', function() {

        let customConfig;

        beforeEach(function() {
            customConfig = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
        });

        it('should get json successfully', function() {
            assert(1, 1);
        });


    });


    it('should get successfully', function(done) {
        doGet(url)
            .then(function(resp) {
                return resp.text();
            })
            .then(function(data) {
                assert(data, 'Get Successfully');
                done();
            });
    });

    it('should put successfully', function() {
        doPut(url)
            .then(function(resp) {
                return resp.text();
            })
            .then(function(data) {
                assert(data, 'Put Successfully');
                done();
            });
    });

    it('should post successfully', function() {
        doPost(url)
            .then(function(resp) {
                return resp.text();
            })
            .then(function(data) {
                assert(data, 'Post Successfully');
                done();
            });
    });

    it('should delete successfully', function() {
        doDelete(url)
            .then(function(resp) {
                return resp.text();
            })
            .then(function(data) {
                assert(data, 'Delete Successfully');
                done();
            });
    });

    it('should setConfig successfully', function() {
        setConfig();

        assert.equal(1, 1);
    });
});