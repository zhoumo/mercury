var BaseJob = require('./baseJob').BaseJob;

WorkerJob = BaseJob.extend({
	constructor: function() {},
	send: function(message) {
		process.send(message);
	},
	listening: function() {
		process.on('message', this.receive);
	}
});

exports.WorkerJob = WorkerJob;