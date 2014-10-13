Date.prototype.format = function(format) {
	var obj = {
		'M+': this.getMonth() + 1,
		'd+': this.getDate(),
		'h+': this.getHours(),
		'm+': this.getMinutes(),
		's+': this.getSeconds(),
		'q+': Math.floor((this.getMonth() + 3) / 3),
		'S': this.getMilliseconds()
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var key in obj) {
		if (new RegExp('(' + key + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? obj[key] : ('00' + obj[key]).substr(('' + obj[key]).length));
		}
	}
	return format;
};