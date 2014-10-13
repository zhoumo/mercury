var MasterJob = require('../core/masterJob').MasterJob;

Job = MasterJob.extend({
	constructor: function() {
		this.url = '/write';
	},
	doJob: function(request, response) {
		var data = this.readFile('test.json');
		console.info(data);
		data = JSON.parse(data);
		data.message = 'zhoumo';
		this.writeFile('test.json', JSON.stringify(data, null, "	"));
		response.end();
	}
});

exports.Job = Job;