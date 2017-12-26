webpackJsonp([0,6],{197:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=o(207),s=i(n);e.default=(0,s.default)({data:function(){return{isGyroscope:!1,isRotate:!1,PSV:null,index:0,vrImgs:["https://wx.nullexcept.com/s_static/img/1.jpg","https://wx.nullexcept.com/s_static/img/2.jpg","https://wx.nullexcept.com/s_static/img/3.jpg","https://wx.nullexcept.com/s_static/img/4.jpg"],vrMarkers:[]}},methods:{isRotate:function(){var t=this;if(null!=t.PSV)return console.log(t.PSV.isAutorotateEnabled()),t.PSV.isAutorotateEnabled()}},mounted:function(){var t=this;t.loadQj(),t.$refs.photosphere.addEventListener("touchstart",function(){null!=t.PSV&&(t.isRotate=t.PSV.isAutorotateEnabled())},!1)}},"methods",{loadQj:function(){var t=this;t.PSV=new PhotoSphereViewer({panorama:"https://wx.nullexcept.com/s_static/img/1.jpg",container:"photosphere",loading_img:"https://wx.nullexcept.com/s_static/img/photosphere-logo.gif",navbar:!1,default_fov:100,default_long:5.6,default_lat:.13,tilt_up_max:Math.PI/2,move_speed:3,mousewheel:!1,gyroscope:!0,time_anim:!1,transition:{duration:1500,loader:!0},markers:[{id:"xiaoxi1",longitude:3.198,latitude:-.1,image:"/static/img/xinhao1.png",width:364,height:172,anchor:"bottom center"},{id:"quan1",longitude:3.198,latitude:-.105,image:"/static/img/quan.png",width:124,height:72,anchor:"top center"},{id:"jiantou1",longitude:3.198,latitude:-.115,image:"/static/img/jiantou.png",width:111,height:142,className:"psv-marker-jiantou",anchor:"top center"},{id:"xiaoxi2",longitude:3.698,latitude:-.1,image:"/static/img/jiejinxiansuo.png",width:364,height:172,anchor:"bottom center",visible:!1},{id:"quan2",longitude:3.698,latitude:-.105,image:"/static/img/quan.png",width:124,height:72,anchor:"top center",visible:!1},{id:"jiantou2",longitude:3.698,latitude:-.115,image:"/static/img/jiantou.png",width:111,height:142,className:"psv-marker-jiantou",anchor:"top center",visible:!1},{id:"xiaoxi3",longitude:2.95,latitude:-6.32,image:"/static/img/xinhao2.png",width:364,height:172,anchor:"bottom center",visible:!1},{id:"quan3",longitude:2.95,latitude:-6.32,image:"/static/img/quan.png",width:124,height:72,anchor:"top center",visible:!1},{id:"jiantou3",longitude:2.95,latitude:-6.32,image:"/static/img/jiantou.png",width:111,height:142,className:"psv-marker-jiantou",anchor:"top center",visible:!1},{id:"xiaoxi31",longitude:2.506,latitude:-6.32,image:"/static/img/zhajixinxihao.png",width:242,height:281,anchor:"bottom left",visible:!1},{id:"xiaoxi4",longitude:.1,latitude:-.1,image:"/static/img/xinhao3.png",width:364,height:172,anchor:"bottom center",visible:!1},{id:"quan4",longitude:.1,latitude:-.105,image:"/static/img/quan.png",width:124,height:72,anchor:"top center",visible:!1},{id:"jiantou4",longitude:.1,latitude:-.115,image:"/static/img/jiantou.png",width:111,height:142,className:"psv-marker-jiantou",anchor:"top center",visible:!1}]}),t.PSV.on("ready",function(){t.clickEvtManage(),t.PSV.animate({longitude:3.17,latitude:.13},2e3)})},showIndex:function(t){var e=this;t>=e.vrImgs.length&&(t=e.vrImgs.length-1),e.index=t;var o=e.vrImgs[t];switch(e.PSV.setPanorama(o),e.vrMarkers.forEach(function(t,o){t.forEach(function(t,o){e.PSV.hideMarker(t)})}),e.vrMarkers[t].forEach(function(t,o){e.PSV.showMarker(t)}),t){case 0:break;case 1:e.PSV.animate({longitude:3.698,latitude:.13},2e3),setTimeout(function(){e.isGyroscope&&!e.PSV.isGyroscopeEnabled()&&(e.PSV.startGyroscopeControl(),e.isGyroscope=e.PSV.isGyroscopeEnabled())},50);break;case 2:e.PSV.animate({longitude:2.82,latitude:.13},2e3),setTimeout(function(){e.isGyroscope&&!e.PSV.isGyroscopeEnabled()&&(e.PSV.startGyroscopeControl(),e.isGyroscope=e.PSV.isGyroscopeEnabled())},50);break;case 3:e.PSV.animate({longitude:.1,latitude:.13},2e3),setTimeout(function(){e.isGyroscope&&!e.PSV.isGyroscopeEnabled()&&(e.PSV.startGyroscopeControl(),e.isGyroscope=e.PSV.isGyroscopeEnabled())},50)}},clickEvtManage:function(){var t=this,e=t.PSV.getMarker("xiaoxi1"),o=t.PSV.getMarker("quan1"),i=t.PSV.getMarker("jiantou1");e.$el.onclick=function(){t.showIndex(1)},o.$el.onclick=function(){t.showIndex(1)},i.$el.onclick=function(){t.showIndex(1)},t.vrMarkers.push([e,o,i]);var n=t.PSV.getMarker("xiaoxi2"),s=t.PSV.getMarker("quan2"),a=t.PSV.getMarker("jiantou2");n.$el.onclick=function(){t.showIndex(2)},s.$el.onclick=function(){t.showIndex(2)},a.$el.onclick=function(){t.showIndex(2)},t.vrMarkers.push([n,s,a]);var r=t.PSV.getMarker("xiaoxi31"),p=t.PSV.getMarker("xiaoxi3"),l=t.PSV.getMarker("quan3"),f=t.PSV.getMarker("jiantou3");p.$el.onclick=function(){t.showIndex(3)},l.$el.onclick=function(){t.showIndex(3)},f.$el.onclick=function(){t.showIndex(3)},r.$el.onclick=function(){t.showIndex(3)},t.vrMarkers.push([p,l,f,r]);var c=t.PSV.getMarker("xiaoxi4"),x=t.PSV.getMarker("quan4"),d=t.PSV.getMarker("jiantou4");c.$el.onclick=function(){t.goToEyes()},x.$el.onclick=function(){t.goToEyes()},d.$el.onclick=function(){t.goToEyes()},t.vrMarkers.push([c,x,d])},goToEyes:function(){this.$router.push({path:"eyes",query:{code:this.$route.query.code}})},toggleGyroscope:function(){var t=this;t.isRotate=!1,t.isGyroscope=!t.isGyroscope,t.isGyroscope?(t.PSV.startGyroscopeControl(),t.PSV.stopAutorotate()):t.PSV.stopGyroscopeControl()},toggleRotate:function(){var t=this;t.isGyroscope=!1,t.isRotate=!t.isRotate,t.isRotate?(t.PSV.startAutorotate(),t.PSV.stopGyroscopeControl()):t.PSV.stopAutorotate()},destroy:function(){var t=this;t.PSV.destroy()},zoonAnimate:function(t){var e=t.getZoomLevel(),o=e+18,i=setInterval(function(){t.zoom(e),e<o?e++:clearInterval(i)},24)}})},205:function(t,e,o){t.exports={default:o(210),__esModule:!0}},207:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var n=o(205),s=i(n);e.default=function(t,e,o){return e in t?(0,s.default)(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}},210:function(t,e,o){o(242);var i=o(36).Object;t.exports=function(t,e,o){return i.defineProperty(t,e,o)}},242:function(t,e,o){var i=o(37);i(i.S+i.F*!o(50),"Object",{defineProperty:o(59).f})},452:function(t,e,o){e=t.exports=o(49)(),e.i(o(454),""),e.push([t.id,".content[data-v-e9904448]{width:100%;height:100%;overflow:hidden}.content .btns[data-v-e9904448]{position:fixed;bottom:32px;right:32px;z-index:999;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;font-size:16px}.content .btns .skip[data-v-e9904448]{width:72px;height:72px}.content .btns .gyroscope-off[data-v-e9904448]{width:72px;height:72px;padding-left:22px;background:url(/static/img/tuoluoyino.png) no-repeat 50%;background-size:64px 64px}.content .btns .gyroscope-on[data-v-e9904448]{background:url(/static/img/tuoluoyi.png) no-repeat 50%;background-size:64px 64px}.content .btns .rotate-off[data-v-e9904448]{width:72px;height:72px;background:url(/static/img/xuanzhuanno.png) no-repeat 50%;padding-left:22px;background-size:64px 64px}.content .btns .rotate-on[data-v-e9904448]{background:url(/static/img/xuanzhuan.png) no-repeat 50%;background-size:64px 64px}",""])},454:function(t,e,o){e=t.exports=o(49)(),e.push([t.id,'/*!\r\n * Photo Sphere Viewer 3.2.3\r\n * Copyright (c) 2014-2015 Jérémy Heleine\r\n * Copyright (c) 2015-2017 Damien "Mistic" Sorel\r\n * Licensed under MIT (http://opensource.org/licenses/MIT)\r\n */.psv-loader:before,.psv-markers-list-item:before,.psv-panel-resizer:before{content:""}.psv-hud,.psv-panel-content--no-interaction{-webkit-touch-callout:none;-khtml-user-select:none}.psv-container{width:100%;height:100%;margin:0;padding:0;position:relative;background:radial-gradient(#fff,#fdfdfd 16%,#fbfbfb 33%,#f8f8f8 49%,#efefef 66%,#dfdfdf 82%,#bfbfbf 100%);overflow:hidden}.psv-canvas-container{position:absolute;top:0;left:0;z-index:0;transition:opacity .1s linear}.psv-canvas{display:block}.psv-loader-container{display:-webkit-box;display:-webkit-flex;display:-moz-flex;display:-ms-flexbox;display:flex;align-items:center;justify-content:center;position:absolute;top:0;left:0;width:100%;height:100%;z-index:100}.psv-loader,.psv-loader-image,.psv-loader-text,.psv-loader:before{display:inline-block;vertical-align:middle}.psv-loader{position:relative;text-align:center;color:rgba(61,61,61,.7);width:150px;height:150px;border:10px solid transparent}.psv-button,.psv-caption{color:hsla(0,0%,100%,.7)}.psv-loader:before{height:100%}.psv-loader-canvas{position:absolute;top:0;left:0}.psv-loader-text{font:14px sans-serif}.psv-navbar{display:-webkit-box;display:-webkit-flex;display:-moz-flex;display:-ms-flexbox;display:flex;position:absolute;z-index:90;bottom:-40px;left:0;width:100%;height:40px;background:rgba(61,61,61,.5);transition:bottom .1s ease-in-out}.psv-navbar--open{bottom:0}.psv-navbar,.psv-navbar *{box-sizing:content-box}.psv-caption{-webkit-box-flex:10;-webkit-flex-grow:10;-moz-flex-grow:10;-ms-flex-positive:10;flex-grow:10;margin:10px;white-space:nowrap;overflow:hidden;text-align:center;font-family:sans-serif}@media (max-width:800px){.psv-caption{visibility:hidden}}.psv-spacer--weight-1{-webkit-box-flex:1;-webkit-flex-grow:1;-moz-flex-grow:1;-ms-flex-positive:1;flex-grow:1}.psv-spacer--weight-2{-webkit-box-flex:2;-webkit-flex-grow:2;-moz-flex-grow:2;-ms-flex-positive:2;flex-grow:2}.psv-spacer--weight-3{-webkit-box-flex:3;-webkit-flex-grow:3;-moz-flex-grow:3;-ms-flex-positive:3;flex-grow:3}.psv-spacer--weight-4{-webkit-box-flex:4;-webkit-flex-grow:4;-moz-flex-grow:4;-ms-flex-positive:4;flex-grow:4}.psv-spacer--weight-5{-webkit-box-flex:5;-webkit-flex-grow:5;-moz-flex-grow:5;-ms-flex-positive:5;flex-grow:5}.psv-spacer--weight-6{-webkit-box-flex:6;-webkit-flex-grow:6;-moz-flex-grow:6;-ms-flex-positive:6;flex-grow:6}.psv-spacer--weight-7{-webkit-box-flex:7;-webkit-flex-grow:7;-moz-flex-grow:7;-ms-flex-positive:7;flex-grow:7}.psv-spacer--weight-8{-webkit-box-flex:8;-webkit-flex-grow:8;-moz-flex-grow:8;-ms-flex-positive:8;flex-grow:8}.psv-spacer--weight-9{-webkit-box-flex:9;-webkit-flex-grow:9;-moz-flex-grow:9;-ms-flex-positive:9;flex-grow:9}.psv-spacer--weight-10{-webkit-box-flex:10;-webkit-flex-grow:10;-moz-flex-grow:10;-ms-flex-positive:10;flex-grow:10}.psv-button{-webkit-box-flex:0;-webkit-flex-grow:0;-moz-flex-grow:0;-ms-flex-positive:0;flex-grow:0;-webkit-flex-shrink:0;-moz-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;padding:10px;position:relative;cursor:pointer;height:20px;width:20px;background:0 0}.psv-button--active{background:hsla(0,0%,100%,.1)}.psv-button--disabled{pointer-events:none;opacity:.5}.psv-button .psv-button-svg{width:100%;transform:scale(1);transition:transform .3s ease}.psv-button .psv-button-svg *{fill:hsla(0,0%,100%,.7)}.psv-button--hover-scale:not(.psv-button--disabled):hover .psv-button .psv-button-svg{transform:scale(1.2)}.psv-autorotate-button{width:25px;height:25px;padding:7.5px}.psv-zoom-button{cursor:default;width:128px}.psv-zoom-button-minus,.psv-zoom-button-plus{float:left;position:relative;cursor:pointer;width:16px;height:16px}.psv-zoom-button-minus .psv-button-svg,.psv-zoom-button-plus .psv-button-svg{position:relative;top:20%}.psv-zoom-button-range{float:left;padding:9.5px 8px}.psv-zoom-button-line{position:relative;cursor:pointer;width:80px;height:1px;background:hsla(0,0%,100%,.7);transition:all .3s ease}.psv-zoom-button-handle{position:absolute;border-radius:50%;top:-3px;width:7px;height:7px;background:hsla(0,0%,100%,.7);transform:scale(1);transition:transform .3s ease}.psv-zoom-button:not(.psv-button--disabled):hover .psv-zoom-button-line{box-shadow:0 0 2px hsla(0,0%,100%,.7)}.psv-zoom-button:not(.psv-button--disabled):hover .psv-zoom-button-handle{transform:scale(1.3)}@media (max-width:600px){.psv-zoom-button{width:auto;padding:0}.psv-zoom-button-range{display:none}.psv-zoom-button-minus,.psv-zoom-button-plus{width:20px;height:20px;padding:10px}.psv-zoom-button-minus .psv-button-svg,.psv-zoom-button-plus .psv-button-svg{top:0}}.psv-markers-list-title{font:24px sans-serif;margin:1em 0;text-align:center;text-shadow:2px 1px #000}.psv-markers-list{list-style:none;margin:0;padding:0;overflow:hidden}.psv-markers-list-item{clear:both;min-height:20px;padding:.5em 1em;cursor:pointer;transform:translateX(0);transition:transform .3s ease-in-out}.psv-markers-list-item:before{position:absolute;top:0;left:0;height:100%;width:10px;margin-left:-10px}.psv-markers-list-item:nth-child(odd),.psv-markers-list-item:nth-child(odd):before{background:hsla(0,0%,100%,.1)}.psv-markers-list-item:nth-child(2n),.psv-markers-list-item:nth-child(2n):before{background:0 0}.psv-markers-list-item:hover{transform:translateX(10px);transition:transform .1s ease-in-out}.psv-markers-list-image{float:left;width:20px}.psv-hud,.psv-hud-svg-container{width:100%;height:100%;position:absolute}.psv-markers-list-name{margin:0;padding:0}.psv-markers-list-image+.psv-markers-list-name{padding-left:calc(20px + .5em)}.psv-hud{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10}.psv-hud-svg-container{top:0;left:0;z-index:20}.psv-marker{cursor:pointer;display:none}.psv-marker--normal{position:absolute;top:0;left:0;z-index:30;background-size:contain;background-repeat:no-repeat}.psv-marker--transparent{display:block;opacity:0}.psv-marker--visible{display:block}.psv-panel{position:absolute;z-index:90;right:0;height:100%;width:400px;max-width:calc(100% - 24px);background:hsla(0,0%,4%,.7);transform:translate3d(100%,0,0);opacity:0;transition-property:opacity,transform;transition-timing-function:ease-in-out;transition-duration:.1s;cursor:default;margin-left:9px}.psv-container--has-navbar .psv-panel{height:calc(100% - 40px)}.psv-panel-close-button{display:none;position:absolute;top:0;left:-24px;width:24px;height:24px;background:rgba(0,0,0,.9)}.psv-panel-close-button:after,.psv-panel-close-button:before{content:"";position:absolute;top:50%;left:4px;width:15px;height:1px;background-color:#fff;transition:.2s ease-in-out;transition-property:width,left,transform}.psv-panel-close-button:before{transform:rotate(45deg)}.psv-panel-close-button:after{transform:rotate(-45deg)}.psv-panel-close-button:hover:after,.psv-panel-close-button:hover:before{left:0;width:23px}.psv-panel-close-button:hover:before{transform:rotate(135deg)}.psv-panel-close-button:hover:after{transform:rotate(45deg)}.psv-panel-resizer{display:none;position:absolute;top:0;left:-9px;width:9px;height:100%;background-color:rgba(0,0,0,.9);cursor:col-resize}.psv-panel-resizer:before{position:absolute;top:50%;left:1px;margin-top:-14.5px;width:1px;height:1px;box-shadow:1px 0 #fff,3px 0 #fff,5px 0 #fff,1px 2px #fff,3px 2px #fff,5px 2px #fff,1px 4px #fff,3px 4px #fff,5px 4px #fff,1px 6px #fff,3px 6px #fff,5px 6px #fff,1px 8px #fff,3px 8px #fff,5px 8px #fff,1px 10px #fff,3px 10px #fff,5px 10px #fff,1px 12px #fff,3px 12px #fff,5px 12px #fff,1px 14px #fff,3px 14px #fff,5px 14px #fff,1px 16px #fff,3px 16px #fff,5px 16px #fff,1px 18px #fff,3px 18px #fff,5px 18px #fff,1px 20px #fff,3px 20px #fff,5px 20px #fff,1px 22px #fff,3px 22px #fff,5px 22px #fff,1px 24px #fff,3px 24px #fff,5px 24px #fff,1px 26px #fff,3px 26px #fff,5px 26px #fff,1px 28px #fff,3px 28px #fff,5px 28px #fff;background:0 0}.psv-panel-content{width:100%;height:100%;box-sizing:border-box;color:#dcdcdc;font:16px sans-serif;overflow:auto}.psv-panel-content:not(.psv-panel-content--no-margin){padding:1em}.psv-panel-content--no-interaction{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}.psv-panel--open{transform:translateZ(0);opacity:1;transition-duration:.2s}.psv-panel--open .psv-panel-close-button,.psv-panel--open .psv-panel-resizer{display:block}.psv-tooltip{position:absolute;z-index:50;box-sizing:border-box;max-width:200px;background-color:rgba(61,61,61,.8);border-radius:4px;padding:.5em 1em;opacity:0;transition-property:opacity;transition-timing-function:ease-in-out;transition-duration:.1s}.psv-tooltip--bottom-center,.psv-tooltip--bottom-left,.psv-tooltip--center-left,.psv-tooltip--center-right,.psv-tooltip--top-center{transition-property:opacity,transform}.psv-tooltip-content{color:#fff;font:14px sans-serif;text-shadow:0 1px #000}.psv-tooltip-arrow{position:absolute;height:0;width:0;border:7px solid transparent}.psv-tooltip--bottom-center .psv-tooltip-arrow,.psv-tooltip--bottom-left .psv-tooltip-arrow,.psv-tooltip--bottom-right .psv-tooltip-arrow{border-bottom-color:rgba(61,61,61,.8)}.psv-tooltip--top-center .psv-tooltip-arrow,.psv-tooltip--top-left .psv-tooltip-arrow,.psv-tooltip--top-right .psv-tooltip-arrow{border-top-color:rgba(61,61,61,.8)}.psv-tooltip--bottom-center{box-shadow:0 3px 0 rgba(90,90,90,.7);transform:translate3d(0,-5px,0)}.psv-tooltip--center-left{box-shadow:-3px 0 0 rgba(90,90,90,.7);transform:translate3d(5px,0,0)}.psv-tooltip--center-left .psv-tooltip-arrow{border-left-color:rgba(61,61,61,.8)}.psv-tooltip--top-center{box-shadow:0 -3px 0 rgba(90,90,90,.7);transform:translate3d(0,5px,0)}.psv-tooltip--center-right{box-shadow:3px 0 0 rgba(90,90,90,.7);transform:translate3d(-5px,0,0)}.psv-tooltip--center-right .psv-tooltip-arrow{border-right-color:rgba(61,61,61,.8)}.psv-tooltip--bottom-left{box-shadow:-3px 3px 0 rgba(90,90,90,.7);transform:translate3d(0,-5px,0)}.psv-tooltip--bottom-right{box-shadow:3px 3px 0 rgba(90,90,90,.7);transform:translate3d(0,-5px,0);transition-property:opacity,transform}.psv-tooltip--top-left,.psv-tooltip--top-right{transform:translate3d(0,5px,0);transition-property:opacity,transform}.psv-tooltip--top-left{box-shadow:-3px -3px 0 rgba(90,90,90,.7)}.psv-tooltip--top-right{box-shadow:3px -3px 0 rgba(90,90,90,.7)}.psv-tooltip--visible{transform:translateZ(0);opacity:1;transition-duration:.1s}',""])},461:function(t,e,o){var i=o(452);"string"==typeof i&&(i=[[t.id,i,""]]);o(56)(i,{});i.locals&&(t.exports=i.locals)},476:function(t,e,o){var i,n;o(461),i=o(197);var s=o(484);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,n._scopeId="data-v-e9904448",t.exports=i},484:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"content"},[o("div",{ref:"photosphere",staticClass:"content",attrs:{id:"photosphere"}}),t._v(" "),o("div",{staticClass:"btns"},[o("div",{staticClass:"gyroscope-off",class:{"gyroscope-on":t.isGyroscope},on:{click:t.toggleGyroscope}}),t._v(" "),o("div",{staticClass:"rotate-off",class:{"rotate-on":t.isRotate},on:{click:t.toggleRotate}})])])},staticRenderFns:[]}}});