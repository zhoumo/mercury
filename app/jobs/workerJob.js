var WorkerJob = require('../core/workerJob').WorkerJob;
var logger = require('../log/logger');

Job = WorkerJob.extend({
	constructor: function() {
		this.url = '/worker';
	},
	receive: function(message) {
		logger.debug('[worker ' + process.pid + '] ' + message);
	},
	doJob: function(request, response) {
		this.send('message from worker ' + process.pid);
		response.end();
	}
});

exports.Job = Job;