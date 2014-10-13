var logFile = require('./logFile');
var date = require('../lib/date.js');

function LogClass(logRoot, config) {
	this.params = {
		root: logRoot,
		name: config.name,
		logFilePattern: config.logFilePattern,
		datePattern: config.datePattern,
		interval: config.interval * 1000,
		logFD: null,
		expectTime: 0
	};
}

LogClass.prototype.log = function(type, message) {
	var timestamp = logFile.getLogTimestamp(this.params.interval);
	var fileName = logFile.getLogFileName(this.params, timestamp);
	if (timestamp != this.params.expectTime) {
		this.params.expectTime = timestamp;
		if (this.params.logFD) {
			logFile.openLogFile(fileName, this.params);
		} else {
			logFile.syncOpenLogFile(fileName, this.params);
		}
	}
	message = '[' + type + '][' + new Date().format('yyyy-MM-dd hh:mm:ss') + '] ' + message;
	console.log(message);
	logFile.writeLog(message, this.params);
};

exports.LogClass = LogClass;