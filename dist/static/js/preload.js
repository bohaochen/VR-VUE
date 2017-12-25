var isLoadAllImgs = false;
var loader = new resLoader({
	resources: [
		"https://wx.nullexcept.com/s_static/img/photosphere-logo.gif",
		"static/img/ai_gs.jpg",
		"static/img/aiStoryText.png",
		"static/img/bg_gr.jpg",
		"static/img/bg.jpg",
		"static/img/btn_04.png",
		"static/img/btn_06.png",
		"static/img/cj_01.png",
		"static/img/cj_02.png",
		"static/img/cj_03.png",
		"static/img/cj_04.png",
		"static/img/cj_05.png",
		"static/img/cj_06.png",
		"static/img/cj_07.png",
		"static/img/cntu_bc.png",
		"static/img/guangyun.png",
		"static/img/guangyunbg.png",
		"static/img/gx_01.png",
		"static/img/houmianyougecaidan.png",
		"static/img/indextc.png",
		"static/img/jiantou.png",
		"static/img/jiejinxiansuo.png",
		"static/img/jiuzainiyanqian.png",
		"static/img/jt_04.png",
		"static/img/lijitiyan.png",
		"static/img/pn_logo_03.png",
		"static/img/qiu_gr.png",
		"static/img/qiu.png",
		"static/img/quan.png",
		"static/img/querenceshi.png",
		"static/img/redbtn.png",
		"static/img/renlianshibiekuangdengwu.png",
		"static/img/renlianshibierenlian.png",
		"static/img/saomiao.png",
		"static/img/share-it.png",
		"static/img/titlebg.png",
		"static/img/titlebg1.png",
		"static/img/tuoluoyi.png",
		"static/img/tuoluoyino.png",
		"static/img/wz_01_gr.png",
		"static/img/wz_01.png",
		"static/img/wz_02_gr.png",
		"static/img/wz_02.png",
		"static/img/wzh3j_01.png",
		"static/img/xingxing.png",
		"static/img/xinhao1.png",
		"static/img/xinhao2.png",
		"static/img/xinhao3.png",
		"static/img/xinhaodantanchuang.png",
		"static/img/xuanzhuan.png",
		"static/img/xuanzhuanno.png",
		"static/img/zhajixinxihao.png",
		"static/img/zj_01.png",
		"static/img/guangdian.png",
		"static/img/xiegang.png",
		"static/img/sbsb_1.png",
		"static/img/sbsb_2.png",
		"static/img/cj_gxn.png",
		"static/img/cj_hyh.png",
		"static/img/cntu_ewm.png",
		"https://wx.nullexcept.com/s_static/img/1.jpg",
		"https://wx.nullexcept.com/s_static/img/2.jpg",
		"https://wx.nullexcept.com/s_static/img/3.jpg",
		"https://wx.nullexcept.com/s_static/img/4.jpg",
	],
	onStart: function(total) {},
	onProgress: function(current, total) {
		if(!isLoadAllImgs) {
			document.getElementById('current').innerHTML = current;
			document.getElementById('total').innerHTML = total - 4;
		}
		if(this.resources.length - 4 == current) {
			isLoadAllImgs = true;
			document.getElementById('loadImg').remove();
		}
	},
	onComplete: function(total) {
		if(!isLoadAllImgs) {
			isLoadAllImgs = true;
			document.getElementById('loadImg').remove();
		}
	}
});