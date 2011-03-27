#!/usr/bin/env node
var fs = require('fs');

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
	var self = this;

	fs.stat(self.path, function(err, stats) {
		if (err) {
			throw err;
		}

		var mtime = new Date(stats.mtime).getTime();

		if (!self.mtime || self.mtime < mtime) {
			self.mtime = mtime;
			fs.readFile(self.path, 'utf8', self.callback);
		}
	});
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
