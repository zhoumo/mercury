var fs = require('fs');
var url = require('url');
var path = require('path');
var logger = require('../log/logger');
var MasterJob = require('./masterJob').MasterJob;
var WorkerJob = require('./workerJob').WorkerJob;
var jobsMap = {};

function registerJobs() {
	var jobsRoot = path.join(global.APP_ROOT, 'jobs');
	var fileNames = fs.readdirSync(jobsRoot);
	if (fileNames.length > 0) {
		for (var index in fileNames) {
			var fileName = fileNames[index];
			var filePath = path.join(jobsRoot, fileName);
			var stat = fs.statSync(filePath);
			if (!stat.isDirectory() && fileName.match('^[A-Za-z0-9_]*Job.js$')) {
				Job = require(filePath).Job;
				var job = new Job();
				job.listening();
				jobsMap[job.getUrl()] = job;
			}
		}
	} else {
		logger.debug('No jobs');
	}
}

function doMasterJob(request, response) {
	var jobPath = url.parse(request.url).pathname;
	var job = jobsMap[jobPath];
	if (jobsMap[jobPath] && job instanceof MasterJob) {
		response.setHeader('Content-Type', 'text/html');
		try {
			response.statusCode = 200;
			job.doJob(request, response);
		} catch(error) {
			logger.error(error);
			response.statusCode = 500;
			response.end(error);
		}
	} else {
		response.writeHead(404, {
			'Content-Type': 'text/plain'
		});
		response.write('Not found.');
		response.end();
	}
}

function doWorkerJob(request, response) {
	var jobPath = url.parse(request.url).pathname;
	var job = jobsMap[jobPath];
	if (jobsMap[jobPath] && job instanceof WorkerJob) {
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/html');
		job.doJob(request, response);
	} else {
		response.writeHead(404, {
			'Content-Type': 'text/plain'
		});
		response.write('Not found.');
		response.end();
	}
}

exports.registerJobs = registerJobs;
exports.doMasterJob = doMasterJob;
exports.doWorkerJob = doWorkerJob;