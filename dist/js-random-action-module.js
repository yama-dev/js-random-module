'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * @license
 *
 * JS RANDOM ACTION MODULE
 *
 * https://github.com/yama-dev/js-random-action-module
 * versoin 0.0.8
 * Copyright yama-dev
 * Licensed under the MIT license.
 *
 * Instance
 *   new JS_RANDOM_ACTION_MODULE( elemet ,{ options });
 *
 * Options Params.
 *   elemWrap       | str     | default 'body'   | ex. 'body'
 *   durationX2     | int     | default 2000     | ex. 2000
 *   interval       | int     | default 1000     | ex. 1000
 *   addClassName   | str     | default 'active' | ex. 'active'
 *   autoStart      | boolean | default true     | ex. false
 *   positionRandom | boolean | default true     | ex. false
 *   repeat         | boolean | default true     | ex. false
*/

var JS_RANDOM_ACTION_MODULE = function () {
  function JS_RANDOM_ACTION_MODULE(elemItems) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, JS_RANDOM_ACTION_MODULE);

    // Set Configs.
    this.CONFIG = {
      elemWrap: options.elemWrap || 'body',
      elemItems: elemItems || '.bg__item',
      durationX2: options.durationX2 || 2000,
      interval: options.interval || 1000,
      addClassName: options.addClassName || 'active',
      autoStart: options.autoStart == false ? false : true,
      positionRandom: options.positionRandom == false ? false : true,
      repeat: options.repeat == false ? false : true
    };

    this.ActionCount = 0;

    // Set Elements.
    this.elemWrap = document.querySelector(this.CONFIG.elemWrap);
    this.elemItems = Array.prototype.slice.call(document.querySelectorAll(this.CONFIG.elemWrap + ' ' + this.CONFIG.elemItems));

    // Set Elements Length.
    this.elemItemsLenght = this.elemItems.length - 1;

    // Generate empty array for judgment.
    this.checkElemList = [];
    for (var i = 0; i <= this.elemItemsLenght; i++) {
      this.checkElemList[i] = true;
    }

    // Set Initialize Event-Listener.
    window.addEventListener('load', function (event) {
      _this.Initialize();
    });
  }

  _createClass(JS_RANDOM_ACTION_MODULE, [{
    key: 'Random',
    value: function Random() {
      return Math.random();
    }
  }, {
    key: 'Round',
    value: function Round(num) {
      return Math.round(num * 100) / 100;
    }
  }, {
    key: 'RandomSelect',
    value: function RandomSelect() {
      var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

      return Math.floor(Math.random() * (max + 1 - min) + min);
    }
  }, {
    key: 'Initialize',
    value: function Initialize() {
      var _this2 = this;

      // Set initial position of element.
      Array.prototype.forEach.call(this.elemItems, function (elem, i) {
        var randomTop = _this2.Round(_this2.elemWrap.clientHeight * _this2.Random());
        var randomLeft = _this2.Round(_this2.elemWrap.clientWidth * _this2.Random());

        if (_this2.CONFIG.positionRandom) {
          elem.style.top = randomTop + 'px';
          elem.style.left = randomLeft + 'px';
        }
      });

      if (this.CONFIG.autoStart) this.StartAction();
    }
  }, {
    key: 'StartAction',
    value: function StartAction() {
      var _this3 = this;

      this.Interval = setInterval(function () {
        _this3.Decision();
      }, this.CONFIG.interval);
    }
  }, {
    key: 'StopAction',
    value: function StopAction() {
      clearInterval(this.Interval);
    }
  }, {
    key: 'Decision',
    value: function Decision() {
      if (!this.CONFIG.repeat && this.elemItemsLenght < this.ActionCount) {
        this.StopAction();
        return false;
      } else {}
      var targetIndex = this.RandomSelect(0, this.elemItemsLenght);
      if (this.checkElemList[targetIndex]) {
        this.ActionCount++;
        this.checkElemList[targetIndex] = false;
        this.Action(targetIndex);
      } else {
        // 既にactiveの場合は再帰的に呼び出し
        this.Decision();
      }
    }
  }, {
    key: 'Action',
    value: function Action(targetIndex) {
      var _this4 = this;

      // Start Motion.
      this.Motion(targetIndex);

      // Remove class-name.
      if (this.CONFIG.repeat) {
        setTimeout(function () {
          _this4.elemItems[targetIndex].classList.remove(_this4.CONFIG.addClassName);
        }, this.CONFIG.durationX2 * 0.5);
      }

      // Change check flg.
      if (this.CONFIG.repeat) {
        setTimeout(function () {
          _this4.checkElemList[targetIndex] = true;
        }, this.CONFIG.durationX2);
      }
    }
  }, {
    key: 'Motion',
    value: function Motion(targetIndex) {
      var randomTop = this.Round(this.elemWrap.clientHeight * this.Random());
      var randomLeft = this.Round(this.elemWrap.clientWidth * this.Random());

      var targetElemWidthPar2 = this.elemItems[targetIndex].clientWidth * 0.5;
      var targetElemHeightPar2 = this.elemItems[targetIndex].clientHeight * 0.5;

      if (this.CONFIG.positionRandom) {
        this.elemItems[targetIndex].style.top = randomTop - targetElemHeightPar2 + 'px';
        this.elemItems[targetIndex].style.left = randomLeft - targetElemWidthPar2 + 'px';
      }
      this.elemItems[targetIndex].classList.add(this.CONFIG.addClassName);
    }
  }, {
    key: 'Update',
    value: function Update() {
      this.StopAction();

      // Reset ActionCount.
      this.ActionCount = 0;

      // Reset Elements.
      this.elemWrap = document.querySelector(this.CONFIG.elemWrap);
      this.elemItems = Array.prototype.slice.call(document.querySelectorAll(this.CONFIG.elemWrap + ' ' + this.CONFIG.elemItems));

      // Reset Elements Length.
      this.elemItemsLenght = this.elemItems.length - 1;

      // Generate empty array for judgment.
      this.checkElemList = [];
      for (var i = 0; i <= this.elemItemsLenght; i++) {
        this.checkElemList[i] = true;
      }

      this.StartAction();
    }
  }]);

  return JS_RANDOM_ACTION_MODULE;
}();