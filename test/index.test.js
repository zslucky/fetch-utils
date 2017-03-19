
/* eslint-disable no-undef,prefer-arrow-callback,func-names */
import chai from 'chai';
import { doGet, doPut, doDelete, doPost, setConfig } from '../src';

const assert = chai.assert;

describe('index.js', function () {
  this.timeout(60000);

  describe('with default configuration', function () {
    let url;
    // let options;
    let textResp;

    beforeEach(function () {
      url = 'http://dropwizard-myblog.herokuapp.com/api/v1/test';
      // options = { url };
      textResp = { url, responseType: 'text' };
    });

    it('should get successfully with string parameter', function (done) {
      doGet(textResp)
        .then(function (data) {
          assert.equal(data, 'Get Successfully', 'get results');
          done();
        });
    });

    it('should get successfully with object parameter', function (done) {
      doGet(textResp)
        .then(function (data) {
          assert.equal(data, 'Get Successfully', 'get results');
          done();
        });
    });

    it('should put successfully with string parameter', function (done) {
      doPut(textResp)
        .then(function (data) {
          assert.equal(data, 'Put Successfully', 'put results');
          done();
        });
    });

    it('should put successfully with object parameter', function (done) {
      doPut(textResp)
        .then(function (data) {
          assert.equal(data, 'Put Successfully', 'put results');
          done();
        });
    });

    it('should post successfully with string parameter', function (done) {
      doPost(textResp)
        .then(function (data) {
          assert.equal(data, 'Post Successfully', 'post results');
          done();
        });
    });

    it('should post successfully with object parameter', function (done) {
      doPost(textResp)
        .then(function (data) {
          assert.equal(data, 'Post Successfully', 'post results');
          done();
        });
    });


    it('should delete successfully with string parameter', function (done) {
      doDelete(textResp)
        .then(function (data) {
          assert.equal(data, 'Delete Successfully', 'delete results');
          done();
        });
    });

    it('should delete successfully with object parameter', function (done) {
      doDelete(textResp)
        .then(function (data) {
          assert.equal(data, 'Delete Successfully', 'delete results');
          done();
        });
    });
  });

  describe('with custom configuration', function () {
    let customConfig;
    let url;
    let options;

    beforeEach(function () {
      customConfig = {
        headers: {
          Accept: 'application/json',
        },
        responseType: 'json',
      };
      url = 'http://dropwizard-myblog.herokuapp.com/api/v1/test/json';
      options = { url };

      setConfig(customConfig);
    });

    it('should get successfully with string parameter', function (done) {
      doGet(url)
        .then(function (data) {
          assert.isObject(data, 'data typeof object');
          assert.equal(data.message, 'Get Successfully', 'get results');
          done();
        });
    });

    it('should get successfully with object parameter', function (done) {
      doGet(options)
        .then(function (data) {
          assert.isObject(data, 'object');
          assert.equal(data.message, 'Get Successfully', 'get results');
          done();
        });
    });

    it('should put successfully with string parameter', function (done) {
      doPut(url)
        .then(function (data) {
          assert.isObject(data, 'data typeof object');
          assert.equal(data.message, 'Put Successfully', 'get results');
          done();
        });
    });

    it('should put successfully with object parameter', function (done) {
      doPut(options)
        .then(function (data) {
          assert.isObject(data, 'object');
          assert.equal(data.message, 'Put Successfully', 'get results');
          done();
        });
    });

    it('should post successfully with string parameter', function (done) {
      doPost(url)
        .then(function (data) {
          assert.isObject(data, 'data typeof object');
          assert.equal(data.message, 'Post Successfully', 'get results');
          done();
        });
    });

    it('should post successfully with object parameter', function (done) {
      doPost(options)
        .then(function (data) {
          assert.isObject(data, 'object');
          assert.equal(data.message, 'Post Successfully', 'get results');
          done();
        });
    });

    it('should delete successfully with string parameter', function (done) {
      doDelete(url)
        .then(function (data) {
          assert.isObject(data, 'data typeof object');
          assert.equal(data.message, 'Delete Successfully', 'get results');
          done();
        });
    });

    it('should delete successfully with object parameter', function (done) {
      doDelete(options)
        .then(function (data) {
          assert.isObject(data, 'object');
          assert.equal(data.message, 'Delete Successfully', 'get results');
          done();
        });
    });
  });
});
