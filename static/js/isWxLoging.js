(function() {
	var href = window.location.href
	var queryString = function(name) {
		if(href.indexOf('?') >= 0) {
			href = href.split('?')[1].split('&')
			for(let i = 0; i < href.length; i++) {
				let paramName = href[i].split('=')[0]
				if(name == paramName) {
					if(typeof(href[i].split('=')[1]) != "undefined")
						return href[i].split('=')[1]
					else
						return null
				}
			}
		}
		return null;
	}
	var code = queryString("code");
	if(code == null || code == '' || !code) {
		
		//		if(href.indexOf('?') > -1) {
		//			href = href.split('?')[0];
		//		}
		//		let openid = queryString("openid")
		//		if(openid != null && openid != '' && openid != 'null') {
		//			
		//		}
		url = "https://wx.nullexcept.com";
		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42c67be9af7fa426&redirect_uri=' + encodeURIComponent(href) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
		window.stop(); //停止浏览器   继续加载
	}
})();