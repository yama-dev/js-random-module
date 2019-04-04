/*eslint no-console: "off"*/

export default class RANDOM_MODULE {

  constructor(elemItems,options={}){

    // Set Configs.
    let configDefault = {
      elemWrap: 'body',
      elemItems: '.bg__item',
      durationX2: 2000,
      interval: 1000,
      addClassName: ['active'],
      autoStart: true,
      positionRandom: true,
      repeat: true,

      afterTheDecimalPoint: 2 // 少数点以下の桁数
    };

    // Merge Config Settings.
    this.Config = Object.assign(configDefault, options);

    // Set Version.
    this.Version = process.env.VERSION;

    this.State = {
      ActionCount: 0
    };

    // SetModule.
    if(document.readyState == 'complete'){
      this.SetModule();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this.SetModule();
      });
      window.addEventListener('load', () => {
      });
    }

  }

  SetModule(){
    this.SetDom();

    this.SetDomStyle();

    if(this.Config.autoStart) this.StartAction();
  }

  SetDom(){
    // Set Elements.
    this.elemWrap  = document.querySelector(this.Config.elemWrap);
    this.elemItems = Array.prototype.slice.call(document.querySelectorAll(this.Config.elemWrap + ' ' + this.Config.elemItems));

    // Set Elements Length.
    this.elemItemsLenght = this.elemItems.length - 1;

    // Generate empty array for judgment.
    this.checkElemList = [];
    for (let i = 0; i <= this.elemItemsLenght; i++) {
      this.checkElemList[i] = true;
    }
  }

  SetDomStyle(){
    // Set initial position of element.
    Array.prototype.forEach.call(this.elemItems, (elem) =>  {
      let randomTop  = this.Round(this.elemWrap.clientHeight * this.Random());
      let randomLeft = this.Round(this.elemWrap.clientWidth * this.Random());

      if(this.Config.positionRandom){
        elem.style.top  = randomTop + 'px';
        elem.style.left = randomLeft + 'px';
      }
    });
  }

  static use(plugin){
    if(!RANDOM_MODULE.prototype.plugins){
      RANDOM_MODULE.prototype.plugins = [];
    }
    if(typeof plugin.install == 'function'){
      RANDOM_MODULE.prototype.plugins.push(Object.assign({}, plugin.install(this)));
    } else if(typeof plugin == 'function'){
      RANDOM_MODULE.prototype.plugins.push(Object.assign({}, plugin(this)));
    } else {
      throw new Error('Not Install Plugin.');
    }
  }

  Random(){
    return Math.random();
  }

  Round(num) {
    return Math.round(num * (10 ** this.Config.afterTheDecimalPoint)) / (10 ** this.Config.afterTheDecimalPoint);
  }

  RandomSelect(min=0,max=10) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  ChoiceClassName(array, num = 1){
    var a = this.Config.addClassName;
    var t = [];
    var r = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
      var i = Math.random() * l | 0;
      r[n] = t[i] || a[i];
      --l;
      t[i] = t[l] || a[l];
    }
    return r;
  }

  RemoveClassName(targetItem){
    this.Config.addClassName.map((item)=>{
      targetItem.classList.remove(item);
    });
  }

  StartAction(){
    this.Interval = setInterval( () => {
      this.Decision();
    }, this.Config.interval);
  }

  StopAction(){
    clearInterval(this.Interval);
  }

  Decision() {
    if(!this.Config.repeat && this.elemItemsLenght < this.State.ActionCount){
      this.StopAction();
      return false;
    }
    let targetIndex = this.RandomSelect(0, this.elemItemsLenght);
    if (this.checkElemList[targetIndex]) {
      this.State.ActionCount++;
      this.checkElemList[targetIndex] = false;
      this.Action(targetIndex);
    } else {
      // 既にactiveの場合は再帰的に呼び出し
      this.Decision();
    }
  }

  // ターゲットに対しての処理
  Action(targetIndex) {

    // Start Motion.
    this.Motion(targetIndex);

    // Remove class-name.
    if(this.Config.repeat){
      setTimeout( () => {
        this.RemoveClassName(this.elemItems[targetIndex]);
        this.plugins.map((item)=>{
          if(item.end) item.end(targetIndex,this.elemItems[targetIndex],this);
        });
      }, this.Config.durationX2 * 0.5);
    }

    // Change check flg.
    if(this.Config.repeat){
      setTimeout( () => {
        this.checkElemList[targetIndex] = true;
        this.plugins.map((item)=>{
          if(item.reset) item.reset(targetIndex,this.elemItems[targetIndex],this);
        });
      }, this.Config.durationX2);
    }
  }

  // ターゲットの情報を書き換え
  Motion(targetIndex) {

    let randomTop  = this.Round(this.elemWrap.clientHeight * this.Random());
    let randomLeft = this.Round(this.elemWrap.clientWidth * this.Random());

    let targetElemWidthPar2  = this.elemItems[targetIndex].clientWidth * 0.5;
    let targetElemHeightPar2 = this.elemItems[targetIndex].clientHeight * 0.5;

    if(this.Config.positionRandom){
      this.elemItems[targetIndex].style.top  = (randomTop - targetElemHeightPar2) + 'px';
      this.elemItems[targetIndex].style.left = (randomLeft - targetElemWidthPar2) + 'px';
    }
    this.elemItems[targetIndex].classList.add(this.ChoiceClassName());

    this.plugins.map((item)=>{
      if(item.start) item.start(targetIndex,this.elemItems[targetIndex],this);
    });

  }

  Update(){
    this.StopAction();

    // Reset ActionCount.
    this.State.ActionCount = 0;

    // Reset Elements.
    this.elemWrap  = document.querySelector(this.Config.elemWrap);
    this.elemItems = Array.prototype.slice.call(document.querySelectorAll(this.Config.elemWrap + ' ' + this.Config.elemItems));

    // Reset Elements Length.
    this.elemItemsLenght = this.elemItems.length - 1;

    // Generate empty array for judgment.
    this.checkElemList = [];
    for (let i = 0; i <= this.elemItemsLenght; i++) {
      this.checkElemList[i] = true;
    }

    this.StartAction();
  }

}