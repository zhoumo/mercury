global.APP_ROOT = __dirname;

var cluster = require('cluster');
var connect = require('connect');
var numCPUs = require('os').cpus().length;

var logger = require('./log/logger');
var controller = require('./core/controller');

if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('listening', function(worker, address) {
		logger.debug('listening: worker ' + worker.process.pid + ', Address: ' + address.address + ':' + address.port);
	});
	cluster.on('exit', function(worker, code, signal) {
		logger.debug('worker ' + worker.process.pid + ' died');
	});
	controller.registerJobs();
	var app = connect();
	app.use(connect.cookieParser());
	app.use(connect.query());
	app.use(connect.compress());
	app.use(connect.urlencoded());
	app.use(controller.doMasterJob);
	app.listen(3001);
} else {
	controller.registerJobs();
	var app = connect();
	app.use(connect.cookieParser());
	app.use(connect.query());
	app.use(connect.compress());
	app.use(connect.urlencoded());
	app.use(controller.doWorkerJob);
	app.listen(3000);
}