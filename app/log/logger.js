var logConfig = require('./logger.json');
var LogClass = require('./logClass').LogClass;
var root = logConfig.root;
var logMap = {};

for (var index in logConfig.loggers) {
	var logger = logConfig.loggers[index];
	logMap[logger.name] = new LogClass(root, logger);
}

exports.debug = function(message) {
	logMap.debug.log('debug', message);
};

exports.info = function(message) {
	logMap.info.log('info', message);
};

exports.warn = function(message) {
	logMap.warn.log('warn', message);
};

exports.error = function(message) {
	logMap.error.log('error', message);
};