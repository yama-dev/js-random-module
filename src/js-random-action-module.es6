/*!
 * @license
 *
 * JS RANDOM ACTION MODULE
 *
 * https://github.com/yama-dev/js-random-action-module
 * versoin 0.0.3
 * Copyright yama-dev
 * Licensed under the MIT license.
 *
 * Instance
 *   new JS_RANDOM_ACTION_MODULE( elemet ,{ options });
 *
 * Options Params.
 *   elemWrap     | str | default 'body'   | ex. 'body'
 *   durationX2   | int | default 2000     | ex. 2000
 *   interval     | int | default 1000     | ex. 1000
 *   addClassName | str | default 'active' | ex. 'active'
*/

class JS_RANDOM_ACTION_MODULE {

  constructor(elemItems,options={}){

    // Set Configs.
    this.CONFIG = {
      elemWrap: options.elemWrap         || 'body',
      elemItems: elemItems               || '.bg__item',
      durationX2: options.durationX2     || 2000,
      interval: options.interval         || 1000,
      addClassName: options.addClassName || 'active',
      autoStart: options.autoStart == false ? false : true,
      positionRandom: options.positionRandom == false ? false : true,
    };

    // Set Elements.
    this.elemWrap  = document.querySelector(this.CONFIG.elemWrap);
    this.elemItems = Array.prototype.slice.call(document.querySelectorAll(this.CONFIG.elemWrap + ' ' + this.CONFIG.elemItems));

    // Set Elements Length.
    this.elemItemsLenght = this.elemItems.length - 1;

    // Generate empty array for judgment.
    this.checkElemList = [];
    for (var i = 0; i <= this.elemItemsLenght; i++) {
      this.checkElemList[i] = true;
    }

    // Set Initialize Event-Listener.
    window.addEventListener('load', (event) => {
      this.Initialize();
    });

  }

  Random(){
    return Math.random();
  }

  Round(num) {
    return Math.round(num * 100) / 100;
  }

  RandomSelect(min=0,max=10) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  Initialize() {
    // Set initial position of element.
    Array.prototype.forEach.call(this.elemItems, (elem, i) =>  {
      var randomTop  = this.Round(this.elemWrap.clientHeight * this.Random());
      var randomLeft = this.Round(this.elemWrap.clientWidth * this.Random());

      if(this.CONFIG.positionRandom){
        elem.style.top  = randomTop + 'px';
        elem.style.left = randomLeft + 'px';
      }
    });

    if(this.CONFIG.autoStart) this.StartAction();
  }

  StartAction(){
    setInterval( () => {
      this.Decision();
    }, this.CONFIG.interval);
  }

  Decision() {
    var targetIndex = this.RandomSelect(0, this.elemItemsLenght);
    if (this.checkElemList[targetIndex]) {
      this.checkElemList[targetIndex] = false;
      this.Action(targetIndex);
    }
  }

  Action(targetIndex) {
    this.Motion(targetIndex);

    setTimeout( () => {
      this.elemItems[targetIndex].classList.remove(this.CONFIG.addClassName);
    }, this.CONFIG.durationX2 * 0.5);

    setTimeout( () => {
      this.Decision();
      this.checkElemList[targetIndex] = true;
    }, this.CONFIG.durationX2);
  }

  Motion(targetIndex) {
    var randomTop  = this.Round(this.elemWrap.clientHeight * this.Random());
    var randomLeft = this.Round(this.elemWrap.clientWidth * this.Random());

    var targetElemWidthPar2  = this.elemItems[targetIndex].clientWidth * 0.5;
    var targetElemHeightPar2 = this.elemItems[targetIndex].clientHeight * 0.5;

    if(this.CONFIG.positionRandom){
      this.elemItems[targetIndex].style.top  = (randomTop - targetElemHeightPar2) + 'px';
      this.elemItems[targetIndex].style.left = (randomLeft - targetElemWidthPar2) + 'px';
    }
    this.elemItems[targetIndex].classList.add(this.CONFIG.addClassName);
  }

}
