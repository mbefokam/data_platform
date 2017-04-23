'use strict';

const _ = require('lodash');
const assert = require('assert');
const moment = require('moment');
const randomWords = require('random-words');
var path = require('path');
var fs = require('fs');
var req;
module.exports = function () {

    this.Given(/^The json request data$/i, function (data) {
        this.requestBody = JSON.parse(data);
    });

    this.Given(/^A new user "(.*)"$/i, function (userdata, callback) {
        var file = path.join(__dirname, userdata);
        var data = fs.readFileSync(file);
        this.requestBody = JSON.parse(data);

        callback();
    });

    this.Given(/^The request data$/i, function (data) {
        const dataRows = data.hashes();
        const firstRow = dataRows[0];
        this.requestBody = firstRow;
    });

    this.Given(/^The property "(.*)" is todays date$/i, function (path) {
        this.requestBody = this.requestBody || {};
        const ts = moment().format('MM-DD-YYYY');
        _.set(this.requestBody, path, ts);
    });

    this.Given(/^The property "(.*)" is a random word$/i, function (path) {
        this.requestBody = this.requestBody || {};
        const value = randomWords();
        _.set(this.requestBody, path, value);
    });

    this.Given(/^The property "(.*)" is "(.*)" random words$/i, function (path, nbr) {
        this.requestBody = this.requestBody || {};
        const value = randomWords({ exactly: parseInt(nbr), join: ' ' });
        _.set(this.requestBody, path, value);
    });

    this.Given(/^The property "(.*)" is todays date with format "(.*)"$/i, function (path, format) {
        this.requestBody = this.requestBody || {};
        const ts = moment().format(format);
        _.set(this.requestBody, path, ts);
    });

    this.Given(/^The property "(.*)" is a date "(\d*)" days in the future$/i, function (path, days) {
        this.requestBody = this.requestBody || {};
        const ts = moment().add(days, 'day').format('MM-DD-YYYY');
        _.set(this.requestBody, path, ts);
    });

    this.Given(/^The property "(.*)" is a date "(\d*)" days in the past$/i, function (path, days) {
        this.requestBody = this.requestBody || {};
        const ts = moment().subtract(days, 'day').format('MM-DD-YYYY');
        _.set(this.requestBody, path, ts);
    });

    this.Given(/^the property "(.*)" is set to "(.*)"$/i, function (path, value) {
        this.requestBody = this.requestBody || {};
        _.set(this.requestBody, path, value);
    });

    this.Given(/^the property "(.*)" is set to the response property "(.*)"$/i, function (path, oldPath) {
        this.requestBody = this.requestBody || {};
        _.set(this.requestBody, path, _.get(this.actualResponse, oldPath));
    });

    this.When(/^I make a GET request to "(.*)"$/i, function (uri) {
        return this.httpGet(uri);
    });

    this.When(/^I make a DELETE request to "(.*)"$/i, function (uri) {
        return this.httpDelete(uri);
    });

    this.When(/^I make a POST request to "(.*)"$/i, function (uri) {
        return this.httpPost(uri);
    });

    this.Then(/^The response status should be "([^"]*)"$/, function (testdata, callback) {

        var file = path.join(__dirname, testdata);
        var expectedResponse = fs.readFileSync(file);
        assert.notEqual(this.actualResponse, expectedResponse, 'Good Response ');
        callback();
    });
    
    this.Then(/^The response status should not be "([^"]*)"$/, function (testdata, callback) {

        var file = path.join(__dirname, testdata);
        var expectedResponse = fs.readFileSync(file);
        assert.notEqual(this.actualResponse, expectedResponse, ' Bad Response');
        callback();
    });

    this.Then(/^The response property "(.*)" should be "(.*)"$/i, function (path, expectedValue, callback) {
        const actualValue = this.getValue(path);
        assert.equal(actualValue, expectedValue, this.prettyPrintError(actualValue, expectedValue));
        callback();
    });

    this.Then(/^The response status code should be "(.*)"$/i, function (expectedValue, callback) {
        assert.equal(this.statusCode, expectedValue, this.prettyPrintError(this.statusCode, expectedValue));
        callback();
    });

};
