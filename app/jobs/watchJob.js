var MasterJob = require('../core/masterJob').MasterJob;

Job = MasterJob.extend({
	constructor: function() {
		this.url = '/watch';
	},
	doJob: function(request, response) {
		this.watchFile('test.json');
		response.end();
	}
});

exports.Job = Job;