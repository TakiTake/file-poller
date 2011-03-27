#!/usr/bin/env node
var fs = require('fs');

// TODO: read config file which is written json format
//       polling config file
function filePoller(path, interval, callback) {
	this.path = path;
	this.interval = interval;
	this.callback = callback;

	this.read();
	this.polling();
}

exports.filePoller = filePoller;

exports.createFilePoller = function(path, interval, callback) {
	return new filePoller(path, interval, callback);
}

filePoller.prototype.read = function() {
	fs.readFile(this.path, 'utf8', this.callback);
}

filePoller.prototype.polling = function() {
	if (this.tid) {
		throw new Error('already polling!');
	}

	var self = this;
	self.tid = setInterval(function(){ self.read() }, self.interval);
}

filePoller.prototype.stop = function() {
	clearInterval(this.tid);
	this.tid = null;
}
