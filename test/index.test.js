'use strict';

import { doGet, doPut, doDelete, doPost, setConfig } from '../src';
import chai from 'chai';

const assert = chai.assert;

describe('index.js', function() {
    this.timeout(60000);

    describe('with default configuration', function() {
        let url;
        let options;

        beforeEach(function() {
            url = 'http://dropwizard-myblog.herokuapp.com/api/v1/test';
            options = { url };
        });

        it('should get successfully with string parameter', function(done) {
            doGet(url)
                .then(function(resp) {
                    return resp.text();
                })
                .then(function(data) {
                    assert.equal(data, 'Get Successfully', 'get results');
                    done();
                });
        });

        it('should get successfully with object parameter', function(done) {
            doGet(options)
                .then(function(resp) {
                    return resp.text();
                })
                .then(function(data) {
                    assert.equal(data, 'Get Successfully', 'get results');
                    done();
                });
        });

        it('should put successfully with string parameter', function(done) {
            doPut(url)
                .then(function(resp) {
                    return resp.text();
                })
                .then(function(data) {
                    assert.equal(data, 'Put Successfully', 'put results');
                    done();
                });
        });

        it('should put successfully with object parameter', function(done) {
            doPut(options)
                .then(function(resp) {
                    return resp.text();
                })
                .then(function(data) {
                    assert.equal(data, 'Put Successfully', 'put results');
                    done();
                });
        });

        it('should post successfully with string parameter', function(done) {
            doPost(url)
                .then(function(resp) {
                    return resp.text();
                })
                .then(function(data) {
                    assert.equal(data, 'Post Successfully', 'post results');
                    done();
                });
        });

        it('should post successfully with object parameter', function(done) {
            doPost(options)
                .then(function(resp) {
                    return resp.text();
                })
                .then(function(data) {
                    assert.equal(data, 'Post Successfully', 'post results');
                    done();
                });
        });


        it('should delete successfully with string parameter', function(done) {
            doDelete(url)
                .then(function(resp) {
                    return resp.text();
                })
                .then(function(data) {
                    assert.equal(data, 'Delete Successfully', 'delete results');
                    done();
                });
        });

        it('should delete successfully with object parameter', function(done) {
            doDelete(options)
                .then(function(resp) {
                    return resp.text();
                })
                .then(function(data) {
                    assert.equal(data, 'Delete Successfully', 'delete results');
                    done();
                });
        });

    });

    describe('with custom configuration', function() {
        let customConfig;
        let url;
        let options;

        beforeEach(function() {
            customConfig = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            url = 'http://dropwizard-myblog.herokuapp.com/api/v1/test/json';
            options = { url };

            setConfig(customConfig);
        });

        it('should get successfully with string parameter', function(done) {
            doGet(url)
                .then(function(resp) {
                    assert(resp.headers.get('Content-Type'), 'application/json');

                    return resp.json();
                })
                .then(function(data) {
                    assert.isObject(data, 'data typeof object');
                    assert.equal(data.message, 'Get Successfully', 'get results');
                    done();
                });
        });

        it('should get successfully with object parameter', function(done) {
            doGet(options)
                .then(function(resp) {
                    assert(resp.headers.get('Content-Type'), 'application/json');

                    return resp.json();
                })
                .then(function(data) {
                    assert.isObject(data, 'object');
                    assert.equal(data.message, 'Get Successfully', 'get results');
                    done();
                });
        });

        it('should put successfully with string parameter', function(done) {
            doPut(url)
                .then(function(resp) {
                    assert(resp.headers.get('Content-Type'), 'application/json');

                    return resp.json();
                })
                .then(function(data) {
                    assert.isObject(data, 'data typeof object');
                    assert.equal(data.message, 'Put Successfully', 'get results');
                    done();
                });
        });

        it('should put successfully with object parameter', function(done) {
            doPut(options)
                .then(function(resp) {
                    assert(resp.headers.get('Content-Type'), 'application/json');

                    return resp.json();
                })
                .then(function(data) {
                    assert.isObject(data, 'object');
                    assert.equal(data.message, 'Put Successfully', 'get results');
                    done();
                });
        });

        it('should post successfully with string parameter', function(done) {
            doPost(url)
                .then(function(resp) {
                    assert(resp.headers.get('Content-Type'), 'application/json');

                    return resp.json();
                })
                .then(function(data) {
                    assert.isObject(data, 'data typeof object');
                    assert.equal(data.message, 'Post Successfully', 'get results');
                    done();
                });
        });

        it('should post successfully with object parameter', function(done) {
            doPost(options)
                .then(function(resp) {
                    assert(resp.headers.get('Content-Type'), 'application/json');

                    return resp.json();
                })
                .then(function(data) {
                    assert.isObject(data, 'object');
                    assert.equal(data.message, 'Post Successfully', 'get results');
                    done();
                });
        });

        it('should delete successfully with string parameter', function(done) {
            doDelete(url)
                .then(function(resp) {
                    assert(resp.headers.get('Content-Type'), 'application/json');

                    return resp.json();
                })
                .then(function(data) {
                    assert.isObject(data, 'data typeof object');
                    assert.equal(data.message, 'Delete Successfully', 'get results');
                    done();
                });
        });

        it('should delete successfully with object parameter', function(done) {
            doDelete(options)
                .then(function(resp) {
                    assert(resp.headers.get('Content-Type'), 'application/json');

                    return resp.json();
                })
                .then(function(data) {
                    assert.isObject(data, 'object');
                    assert.equal(data.message, 'Delete Successfully', 'get results');
                    done();
                });
        });

    });

});