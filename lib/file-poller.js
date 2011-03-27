#!/usr/bin/env node
var fs = require('fs');

// TODO: read config file which is written json format
//       polling config file
function filePoller(path, interval, callback) {
	this.setPath(path);
	this.setInterval(interval);
	this.setCallback(callback);

	this.read();
	this.polling();
}

exports.filePoller = filePoller;

exports.createFilePoller = function(path, interval, callback) {
	return new filePoller(path, interval, callback);
}

filePoller.prototype.setPath = function(path) {
	this.path = path;
}

filePoller.prototype.getPath = function() {
	return this.path;
}

filePoller.prototype.setInterval = function(interval) {
	this.interval = interval;
}

filePoller.prototype.getInterval = function() {
	return this.interval;
}

filePoller.prototype.setCallback = function(callback) {
	this.callback = callback;
}

filePoller.prototype.getCallback = function() {
	return this.callback;
}

filePoller.prototype.setTid = function(tid) {
	this.tid = tid;
}

filePoller.prototype.getTid = function() {
	return this.tid;
}

filePoller.prototype.read = function() {
	fs.readFile(this.getPath(), 'utf8', this.getCallback());
}

filePoller.prototype.polling = function() {
	if (this.getTid()) {
		throw new Error('already polling!');
	}

	var self = this;
	var tid = setInterval(function(){ self.read() }, this.getInterval());
	this.setTid(tid);
}

filePoller.prototype.stop = function() {
	clearInterval(this.getTid());
	this.setTid(null);
}
