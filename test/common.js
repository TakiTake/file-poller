#!/bin/env node
var assert = require('assert');
var filePoller = require('../index.js');
var fp = filePoller.createFilePoller(__dirname + '/test.txt', 5000, function(err, data) {
	if (err) {
		throw err;
	}

	console.log(data);
});
