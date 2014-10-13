var fs = require('fs');
var path = require('path');
var cluster = require('cluster');

var Base = require('../lib/base').Base;

var BaseJob = Base.extend({
	url: null,
	cluster: cluster,
	constructor: function() {},
	getUrl: function() {
		return this.url;
	},
	doJob: function(request, response) {
		console.log('[doJob] ' + message);
	},
	listening: function() {
		console.log('[listening] ' + message);
	},
	send: function(message) {
		console.log('[send] ' + message);
	},
	receive: function(message) {
		console.log('[receive] ' + message);
	},
	writeFile: function(filePath, data) {
		filePath = path.join(global.APP_ROOT, filePath);
		fs.writeFileSync(filePath, data, 'utf-8');
	},
	readFile: function(filePath) {
		filePath = path.join(global.APP_ROOT, filePath);
		return fs.readFileSync(filePath, 'utf-8');
	},
	watchFile: function(filePath) {
		filePath = path.join(global.APP_ROOT, filePath);
		var this_ = this;
		fs.watchFile(filePath, function(current, previous) {
			var data = fs.readFileSync(filePath, 'utf-8');
			var message = (new Buffer(data)).toString('utf-8');
			this_.send(message);
		});
	}
});

exports.BaseJob = BaseJob;