/*! JS RANDOM MODULE (JavaScript Library) @yama-dev/js-random-module Version 0.5.0 Repository https://github.com/yama-dev/js-random-module Copyright yama-dev Licensed MIT */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.RANDOM_MODULE=e():t.RANDOM_MODULE=e()}(window,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(){return(o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(null,arguments)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,s(i.key),i)}}function s(t){var e=function(t,e){if("object"!=i(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,e||"default");if("object"!=i(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==i(e)?e:e+""}n.r(e),n.d(e,"default",(function(){return l}));var l=function(){function t(e){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r(this,t);var a={elemWrap:"body",elemItems:e||".js-bg-item",durationX2:2e3,interval:1e3,intervalDeflection:0,preStartCount:0,addClassName:["js-active"],autoStart:!0,repeat:!0,leaveStop:!0,positionRandom:!0,rotateRandom:!1,rotateRandomRange:180,afterTheDecimalPoint:2,isDebug:!1};this.Config=o(a,i),Array.isArray(this.Config.addClassName)||(this.Config.addClassName=new Array(this.Config.addClassName)),this.Config.interval<=30&&(this.Config.interval=30),this.Config.preStartCount<=0&&(this.Config.preStartCount=0),this.Version="0.5.0",this.State={ActionCount:0,DecisionCount:0,DecisionCountLimit:10,flg:{running:!1,blur:!1}},"complete"==document.readyState||"interactive"==document.readyState?this.SetModule():(document.addEventListener("DOMContentLoaded",(function(){n.SetModule()})),window.addEventListener("load",(function(){})))}return function(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}(t,[{key:"SetModule",value:function(){var t=this;if(this.SetDom(),this.SetDomStyle(),this.elemItemsLength<=0&&this.Config.isDebug)throw new Error("Not Found Elements.");if(this.Config.preStartCount)for(var e=0;e<this.Config.preStartCount;++e)this.Config.autoStart&&this.Decision();this.Config.autoStart&&(this.StartAction(),this.State.flg.running=!0),window.addEventListener("focus",(function(){t.State.flg.blur=!1,t.Config.autoStart&&t.Start()})),window.addEventListener("blur",(function(){t.State.flg.blur=!0,t.Config.leaveStop&&t.StopAction()}))}},{key:"SetDom",value:function(){this.elemWrap=document.querySelector(this.Config.elemWrap),this.elemItems=Array.prototype.slice.call(document.querySelectorAll(this.Config.elemWrap+" "+this.Config.elemItems)),this.elemItemsLength=this.elemItems.length,this.checkElemList=[];for(var t=0;t<this.elemItemsLength;t++)this.checkElemList[t]=!0}},{key:"SetDomStyle",value:function(){var t=this;Array.prototype.forEach.call(this.elemItems,(function(e){var n=t.Round(t.elemWrap.clientHeight*t.Random()),i=t.Round(t.elemWrap.clientWidth*t.Random());t.Config.positionRandom&&(e.style.top=n+"px",e.style.left=i+"px")}))}},{key:"Random",value:function(){return Math.random()}},{key:"Round",value:function(t){return Math.round(t*Math.pow(10,this.Config.afterTheDecimalPoint))/Math.pow(10,this.Config.afterTheDecimalPoint)}},{key:"RandomSelect",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return Math.floor(Math.random()*(e+1-t)+t)}},{key:"ChoiceClassName",value:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=this.Config.addClassName,i=[],o=[],r=n.length,a=e<r?e:r;a-- >0;){var s=Math.random()*r|0;o[a]=i[s]||n[s],--r,i[s]=i[r]||n[r]}return o}},{key:"RemoveClassName",value:function(t){this.Config.addClassName.map((function(e){t.classList.remove(e)}))}},{key:"StartAction",value:function(){var t=this,e=0;this.Config.intervalDeflection&&(e=Math.ceil(this.Config.intervalDeflection*this.Random()-.5*this.Config.intervalDeflection));var n=this.Config.interval+e;n<=0&&(n=0),this.Interval=setTimeout((function(){t.Decision(),t.State.flg.running&&t.StartAction()}),n)}},{key:"StopAction",value:function(){this.State.flg.running=!1,clearTimeout(this.Interval)}},{key:"Start",value:function(){if(1==this.State.flg.running)return!1;this.State.flg.running=!0,this.StartAction()}},{key:"Stop",value:function(){this.StopAction()}},{key:"Update",value:function(){if(this.StopAction(),this.State.ActionCount=0,this.SetDom(),this.SetDomStyle(),this.elemItemsLength<=0)throw new Error("Not Found Elements.");this.Config.autoStart&&this.StartAction()}},{key:"Decision",value:function(){if(!this.Config.repeat&&this.elemItemsLength<this.State.ActionCount)return this.StopAction(),!1;var t=this.RandomSelect(0,this.elemItemsLength);this.checkElemList[t]?(this.State.ActionCount++,this.checkElemList[t]=!1,this.Action(t),this.State.DecisionCount=0):(this.State.DecisionCount++,this.State.DecisionCount<this.State.DecisionCountLimit&&this.Decision())}},{key:"Action",value:function(t){var e=this;this.Motion(t),this.Config.repeat&&setTimeout((function(){e.RemoveClassName(e.elemItems[t]),e.plugins&&e.plugins.map((function(n){n.between&&n.between(t,e.elemItems[t],e)}))}),.5*this.Config.durationX2),this.Config.repeat&&setTimeout((function(){e.checkElemList[t]=!0,e.plugins&&e.plugins.map((function(n){n.end&&n.end(t,e.elemItems[t],e)}))}),this.Config.durationX2)}},{key:"Motion",value:function(t){var e=this;if(this.Config.positionRandom){var n=this.Round(this.elemWrap.clientHeight*this.Random()),i=this.Round(this.elemWrap.clientWidth*this.Random()),o=.5*this.elemItems[t].clientWidth,r=.5*this.elemItems[t].clientHeight;this.elemItems[t].style.top=n-r+"px",this.elemItems[t].style.left=i-o+"px"}if(this.Config.rotateRandom){var a=this.Round(this.Config.rotateRandomRange*this.Random())-.5*this.Config.rotateRandomRange;this.elemItems[t].style.webkitTransform="rotate("+a+"deg)",this.elemItems[t].style.transfrom="rotate("+a+"deg)"}this.elemItems[t].classList.add(this.ChoiceClassName()),this.plugins&&this.plugins.map((function(n){n.start&&n.start(t,e.elemItems[t],e)}))}}],[{key:"use",value:function(e){if(t.prototype.plugins||(t.prototype.plugins=[]),"function"==typeof e.install)t.prototype.plugins.push(o({},e.install(this)));else{if("function"!=typeof e)throw new Error("Not Install Plugin.");t.prototype.plugins.push(o({},e(this)))}}}])}()}]).default}));