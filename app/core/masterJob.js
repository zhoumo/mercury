var BaseJob = require('./baseJob').BaseJob;

MasterJob = BaseJob.extend({
	constructor: function() {},
	send: function(message) {
		for (var id in this.cluster.workers) {
			this.cluster.workers[id].send(message);
		}
	},
	listening: function() {
		for (var id in this.cluster.workers) {
			this.cluster.workers[id].on('message', this.receive);
		}
	}
});

exports.MasterJob = MasterJob;