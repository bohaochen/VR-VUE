export const toast = () => {
	var isToast = false;
	var num = 0;
	var toast = document.getElementById('toast');
	return function(msg) {
		if(isToast) {
			return false;
		}
		isToast = true;
		toast.innerHTML = msg;
		toast.classList.add("toast-ain");
		toast.addEventListener('webkitAnimationEnd', function() {
			num += 1;
			if(num == 1) {
				let interval = setInterval(() => {
					toast.classList.add("toast-out");
					clearInterval(interval);
				}, 1500);

			} else {
				toast.classList.remove("toast-out");
				toast.classList.remove("toast-ain");
				isToast = false;
				num = 0;
			}
		}, false);
	}
}
export const MA = (_node, callback) => {
	_node.addEventListener('webkitAnimationEnd', function() {
		if(callback) {
			callback();
		}
	}, false);
}

export const timeToNow = (time) => {
	const t = parseFloat(new Date - new Date(time)) / 1000;
	let str;
	if(t) {
		if(t > 60 && t < 3600) {
			str = `${parseInt(t / 60.0, 10)}分钟前`;
		} else if(t >= 3600 && t < 86400) {
			str = `${parseInt(t / 3600.0, 10)}小时前`;
		} else if(t >= 86400 && t < 86400 * 30) {
			str = `${parseInt(t / 86400.0, 10)}天前`;
		} else if(t >= 86400 * 30 && t < 86400 * 365) {
			str = `${parseInt(t / (86400.0 * 30), 10)}个月前`;
		} else if(t >= 86400 * 365) {
			str = `${parseInt(t / (86400.0 * 365), 10)}年前`;
		} else {
			str = `${parseInt(t, 10)}秒前`;
		}
	}
	return str;
};

/*
 *处理json字符串，转为json格式
 */
export const isLogin = (code, _this) => {
	try {
		if(code == 8888) {
			console.log("请登录！")
			window.localStorage.removeItem('userInfo')
			_this.$router.replace('/login');
		}
	} catch(e) {

	}
}

/*
 *处理json字符串，转为json格式
 */
export const jsonFormat = (val) => {
	try {
		return JSON.parse(val)
	} catch(e) {
		return val;

	}
}

/**
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   "yyyy-MM-dd hh:mm:ss.S" ==> 2006-07-02 08:09:04.423
 *   "yyyy-M-d h:m:s.S"      ==> 2006-7-2 8:9:4.18 
 */
export const dateFormat = (date, format) => {
	if(date == '' || typeof(date) == "undefined") {
		return ''
	}

	date = Number(date);
	date = new Date(date);

	var map = {
		"M": date.getMonth() + 1, //月份 
		"d": date.getDate(), //日 
		"h": date.getHours(), //小时 
		"m": date.getMinutes(), //分 
		"s": date.getSeconds(), //秒 
		"q": Math.floor((date.getMonth() + 3) / 3), //季度 
		"S": date.getMilliseconds() //毫秒 
	};
	format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
		var v = map[t];
		if(v !== undefined) {
			if(all.length > 1) {
				v = '0' + v;
				v = v.substr(v.length - 2);
			}
			return v;
		} else if(t === 'y') {
			return(date.getFullYear() + '').substr(4 - all.length);
		}
		return all;
	});
	if(format == 'NaN-aN-aN aN:aN:aN' || format == '1970-01-01 08:00:00') {
		return ''
	}
	return format;
};

//倒计时补齐2位,如果是1位则前边添加0
export const countFormat = (time) => {
	if(time < 10) {
		time = "0" + time;
	} else {
		time = "" + time;
	}

	return time.substr(0, 2);
};

export const numberinteger = (value) => {
	if(!value) return

	return Number.parseFloat(value).toFixed(2);
}