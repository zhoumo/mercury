var fs = require('fs');
var path = require('path');
var util = require('util');
var date = require('../lib/date.js');

function syncOpenLogFile(fileName, params) {
	try {
		params.logFD = fs.openSync(fileName, 'a', '664');
	} catch(error) {
		throw error;
	}
}

function openLogFile(fileName, params) {
	fs.open(fileName, 'a', '664', function(error, fd) {
		if (error) throw error;
		var tmpFD = params.logFD;
		params.logFD = fd;
		if (tmpFD) {
			fs.close(tmpFD, function(error) {
				if (error) throw error;
			});
		}
	});
}

function writeLog(message, params) {
	var buffer = new Buffer(message + '\n');
	fs.write(params.logFD, buffer, 0, buffer.length, null, function(error) {
		if (error) throw error;
	});
}

function getLogFileName(params, timestamp) {
	var date = (timestamp === null ? new Date() : new Date(timestamp));
	return path.join(params.root, util.format(params.logFilePattern, date.format(params.datePattern)));
}

function getLogTimestamp(interval, time) {
	var date = new Date();
	var timestamp = date.getTime();
	timestamp -= date.getTimezoneOffset() * 60 * 1000;
	timestamp = parseInt((timestamp / interval), 10) * interval;
	timestamp += date.getTimezoneOffset() * 60 * 1000;
	return timestamp;
}

exports.syncOpenLogFile = syncOpenLogFile;
exports.openLogFile = openLogFile;
exports.writeLog = writeLog;
exports.getLogFileName = getLogFileName;
exports.getLogTimestamp = getLogTimestamp;