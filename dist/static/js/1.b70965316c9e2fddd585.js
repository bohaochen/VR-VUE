webpackJsonp([1,6],{196:function(t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){return{phone:"",name:"",drawText:"",isInfoPage:!0,isLuckPage:!1,isSharePage:!1,isLuck:!0}},mounted:function(){},methods:{jieping:function(){console.log("什么鬼")},drawNum:function(t){var a=this;console.log(t);var o=parseInt(t);switch(o){case 0:a.isLuck=!1,a.drawText="您离iPhoneX只有一步之遥";break;case 1:a.drawText="获得勇于探索奖";break;case 2:a.drawText="获得勇于实践奖";break;case 3:a.drawText="获得开拓创新奖";break;case 4:a.drawText="获得眼光独到奖"}},checkPhone:function(t,a){var o=this;if(!/^1[34578]\d{9}$/.test(o.phone))return o.toast("请正确填写手机号码"),console.log("请正确填写手机号码"),!1;if(!/^[a-zA-Z ]{1,20}$/.test(o.name)&&!/^[\u4e00-\u9fa5]{1,10}$/.test(o.name))return this.toast("请正确填写姓名"),console.log("请正确填写姓名"),!1;var e=window.localStorage.getItem("openid");o.$http.post("v1/em?action=update_userinfo&uid="+e+"&phone="+o.phone+"&name="+o.name).then(function(t){console.log(t),200==t.status?o.$http.post("v1/em?action=draw&uid="+e).then(function(t){switch(console.log(t),t.data.code){case 100:o.toast("用户不存在");break;case 102:o.toast("没有录入用户信息");break;case 103:o.toast("还没做人脸对比");break;case 104:o.toast("你已经参与过活动,分享邀请好友一起参与吧"),o.drawNum(t.data.draw),o.goToLuckdraw();break;default:o.drawNum(t.data.draw),o.goToLuckdraw()}}).catch(function(t){console.log(t)}):console.log("接口返回错误")}).catch(function(t){console.log(t)})},goToLuckdraw:function(){var t=this;t.isInfoPage=!1,t.isLuckPage=!0},goToImagerecognition:function(){var t=this;t.$router.push({path:"imagerecognition",code:t.$route.query.code})},share:function(){this.isSharePage?this.isSharePage=!1:this.isSharePage=!0}}}},450:function(t,a,o){a=t.exports=o(49)(),a.push([t.id,'input[data-v-2c474bb1]::-webkit-input-placeholder{color:#16a5a3;opacity:1}.content[data-v-2c474bb1]{width:100%;height:100%;background-color:#000;overflow:auto;position:absolute;background:url(/static/img/bg.jpg) 50%/cover;animation:fuxian 1s;top:0}.content .logo[data-v-2c474bb1]{width:26%;position:fixed;top:2.5%;right:20px;z-index:2}.content .cjts[data-v-2c474bb1]{width:86%;position:relative;top:0;z-index:2;left:50%;margin-left:-43%;margin-top:18%}.content .join-box[data-v-2c474bb1]{position:relative;z-index:2;width:100%;top:0;margin-top:6%;margin-bottom:64px}.content .join-box .b-bg[data-v-2c474bb1]{width:100%}.content .join-box .put-text-ipone[data-v-2c474bb1]{top:13%}.content .join-box .put-text-ipone[data-v-2c474bb1],.content .join-box .put-text-name[data-v-2c474bb1]{width:72%;height:107px;position:absolute;left:50%;margin-left:-36%;color:#16a5a3;font-size:32px;outline:none;line-height:90px;border:0;background:url("/static/img/cj_03.png");background-size:100% 100%;padding:0 45px;box-sizing:border-box}.content .join-box .put-text-name[data-v-2c474bb1]{top:30%}.content .join-box .put-text-box[data-v-2c474bb1]{color:#16a5a3;font-size:24px;position:absolute;top:46%;width:72%;left:50%;margin-left:-36%;margin-top:32px}.content .join-box .btn[data-v-2c474bb1]{width:66%;position:absolute;bottom:14%;left:50%;margin-left:-33%;pointer-events:auto}.content1[data-v-2c474bb1]{width:100%;height:100%;background-color:#000;overflow:hidden;position:absolute;top:0;overflow:auto;animation:fuxian 1s}.content1 .share-it[data-v-2c474bb1]{width:100%;height:100%;position:fixed;z-index:9999;top:0;background:rgba(0,0,0,.7)}.content1 .share-it img[data-v-2c474bb1]{position:absolute;right:20px;top:20px}.content1 .bg[data-v-2c474bb1]{width:100%;height:100%;background:url(/static/img/bg.jpg) 50%/cover;position:fixed;top:0;z-index:1}.content1 .logo[data-v-2c474bb1]{width:26%;position:absolute;top:2.5%;right:20px;z-index:2}.content1 .hj-img-box[data-v-2c474bb1]{width:100%;position:relative}.content1 .hj-box[data-v-2c474bb1]{width:90%;position:relative;margin-left:5%;margin-top:14%;z-index:2}.content1 .hj-img[data-v-2c474bb1]{width:100%;position:relative}.content1 .hj-img-wz[data-v-2c474bb1]{width:100%;position:absolute;top:0}.content1 .hj-text[data-v-2c474bb1]{font-size:48px;color:#e46321;display:block;position:absolute;width:100%;font-weight:700;top:60%;margin-top:-20px;text-align:center}.content1 .ms-box[data-v-2c474bb1]{width:92%;margin-left:4%;margin-top:3%;top:30%;color:#28b1b7;z-index:2}.content1 h1[data-v-2c474bb1]{color:#35e8f1}.content1 ul[data-v-2c474bb1]{list-style-type:none;padding:10px 0}.content1 li[data-v-2c474bb1]{line-height:34px;font-size:19px;color:#5ab1b0}.content1 .bbColor[data-v-2c474bb1]{color:#c75c26}.content1 .jp-box[data-v-2c474bb1]{width:100%;color:#5ab1b0;border:1px solid #5ab1b0;overflow:hidden}.content1 .jp-box span[data-v-2c474bb1]{width:50%;display:block;float:left;text-align:center;line-height:34px;box-sizing:border-box;line-height:40px;border:1px solid #5ab1b0}.content1 .btns[data-v-2c474bb1]{width:100%;position:relative;z-index:2;margin-bottom:5%;top:3.5%}.content1 .btns .jiantou[data-v-2c474bb1]{position:absolute;width:7%;top:0;z-index:2;left:50%;margin-left:-3%;animation:fudong 5s linear infinite alternate;transform:translate3d(0,-100%,0);-moz-transform:translate3d(0,-100%,0);-webkit-transform:translate3d(0,-100%,0);-o-transform:translate3d(0,-100%,0)}.content1 .btns .btn1[data-v-2c474bb1],.content1 .btns .btn2[data-v-2c474bb1]{width:66%;display:block;margin:auto;pointer-events:auto}.huishe[data-v-2c474bb1]{color:#bdbdbd!important;font-size:42px!important}',""])},458:function(t,a,o){var e=o(450);"string"==typeof e&&(e=[[t.id,e,""]]);o(56)(e,{});e.locals&&(t.exports=e.locals)},475:function(t,a,o){var e,i;o(458),e=o(196);var n=o(480);i=e=e||{},"object"!=typeof e.default&&"function"!=typeof e.default||(i=e=e.default),"function"==typeof i&&(i=i.options),i.render=n.render,i.staticRenderFns=n.staticRenderFns,i._scopeId="data-v-2c474bb1",t.exports=e},480:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{staticClass:"content-father"},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.isInfoPage,expression:"isInfoPage"}],staticClass:"content"},[o("div",{staticClass:"bg"}),t._v(" "),o("img",{staticClass:"logo",attrs:{src:"/static/img/pn_logo_03.png"}}),t._v(" "),o("img",{staticClass:"cjts",attrs:{src:"/static/img/cj_01.png"}}),t._v(" "),o("div",{staticClass:"join-box"},[o("img",{staticClass:"b-bg",attrs:{src:"/static/img/cj_02.png"}}),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],staticClass:"put-text-ipone",attrs:{placeholder:"请输入你的手机号"},domProps:{value:t.phone},on:{input:function(a){a.target.composing||(t.phone=a.target.value)}}}),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"put-text-name",attrs:{placeholder:"请输入你的姓名"},domProps:{value:t.name},on:{input:function(a){a.target.composing||(t.name=a.target.value)}}}),t._v(" "),o("div",{staticClass:"put-text-box"},[t._v("\n\t\t\t\t请确保填写正确的手机号，以便中奖后工作人员与您取得联系。\n\t\t\t")]),t._v(" "),o("div",{staticClass:"btns"},[o("img",{staticClass:"btn",attrs:{src:"/static/img/cj_04.png"},on:{click:t.checkPhone}})])])]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.isLuckPage,expression:"isLuckPage"}],staticClass:"content1"},[o("div",{staticClass:"bg"}),t._v(" "),o("img",{staticClass:"logo",attrs:{src:"/static/img/pn_logo_03.png"}}),t._v(" "),o("div",{staticClass:"hj-box"},[o("div",{staticClass:"hj-img-box"},[o("img",{staticClass:"hj-img",attrs:{src:"/static/img/cj_05.png"}}),t._v(" "),o("img",{directives:[{name:"show",rawName:"v-show",value:t.isLuck,expression:"isLuck"}],staticClass:"hj-img-wz",attrs:{src:"/static/img/cj_gxn.png"}}),t._v(" "),o("img",{directives:[{name:"show",rawName:"v-show",value:!t.isLuck,expression:"!isLuck"}],staticClass:"hj-img-wz",attrs:{src:"/static/img/cj_hyh.png"}}),t._v(" "),o("span",{staticClass:"hj-text",class:{huishe:!t.isLuck}},[t._v("\n\t\t\t\t"+t._s(t.drawText)+"\n\t\t\t")])]),t._v(" "),t._m(0)]),t._v(" "),o("div",{staticClass:"btns"},[o("img",{staticClass:"btn1",attrs:{src:"/static/img/cj_06.png"},on:{click:t.goToImagerecognition}}),t._v(" "),o("img",{staticClass:"btn2",attrs:{src:"/static/img/cj_07.png"},on:{click:t.share}})]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.isSharePage,expression:"isSharePage"}],staticClass:"share-it",on:{click:t.share}},[o("img",{attrs:{src:"/static/img/share-it.png"}})])])])},staticRenderFns:[function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{staticClass:"ms-box"},[o("h1",[t._v("· 活动规则")]),t._v(" "),o("ul",[o("li",[t._v("1.每人仅有一次参与中奖机会;")]),t._v(" "),o("li",[t._v("2.中奖用户，我们会在活动结束后的5个工作日内与您联系;")]),t._v(" "),o("li",[t._v("3.中奖流量和手机话费，活动结束后10个工作日内充值至您的手机号码;")]),t._v(" "),o("li",[t._v("4.活动时间："),o("span",{staticClass:"bbColor"},[t._v("即日起——2018年1月10日")])]),t._v(" "),o("li",[t._v("5.本次活动实时动态会更新在平安脸谱微信公众号(PAtianxiatong);")]),t._v(" "),o("li",[t._v("6.活动禁止任何形式作弊，一经发现取消中奖资格;")]),t._v(" "),o("li",[t._v("7.本活动解释权归平安脸谱所有。")]),t._v(" "),o("li",[t._v("8.奖品设置")])]),t._v(" "),o("div",{staticClass:"jp-box"},[o("span",[t._v("黑科技奖")]),t._v(" "),o("span",[t._v("Apple Iphone X")]),t._v(" "),o("span",[t._v("勇于探索奖")]),t._v(" "),o("span",[t._v("小米摄像头小白智能摄像机")]),t._v(" "),o("span",[t._v("勇于实践奖")]),t._v(" "),o("span",[t._v("金士顿U盘")]),t._v(" "),o("span",[t._v("开拓创新奖")]),t._v(" "),o("span",[t._v("20元话费")]),t._v(" "),o("span",[t._v("眼光独到奖")]),t._v(" "),o("span",[t._v("流量20M")])])])}]}}});