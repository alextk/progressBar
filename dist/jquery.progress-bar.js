/*
* progressBar - jQuery plugin for progress bar ui widget
*
* Version: 0.0.1
* Build: 30
* Copyright 2011 Alex Tkachev
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: 17 Dec 2011 14:31:01
*/

(function($) {

  /**
   * Progress bar class api
   */
  var ProgressBarClass = function() {
    this.initialize.apply(this, arguments);
  };

  $.extend(ProgressBarClass.prototype, {

    initialize: function(target, config) {
      this.rtl = target.css('direction') == 'rtl';
      this.el = createUI(target).toggleClass('rtl', this.rtl);
      this.cssRange = createCssRangeArray(config.cssRange);
      this._total = config.total;
      this._value = config.start;
      this.syncUI();
    },

    value: function(newValue) {
      var currValue = this._value;
      if (arguments.length === 0) return currValue; // getter
      else { //setter
        this._value = newValue % (this._total + 1);
        this.syncUI();
      }
      return this;
    },

    total: function(newValue) {
      var total = this._total;
      if (arguments.length === 0) return total;
      else { //setter
        this._total = newValue;
        this.value(this.value());
      }
      return this;
    },

    syncUI: function() {
      var percent = Math.round(this.value() / this.total() * 100);
      if (!jQuery.isNumeric(percent)) {
        percent = 0;
      }
      //move bar
      var height = this.el.height();
      var totalWidth = this.el.width();
      var barWidth = Math.round(percent / 100 * totalWidth);

      $('.bar', this.el).width(barWidth).height(height);

      var divPercent = $('.percent', this.el);
      divPercent.html(percent + '%').height(height).css({'line-height': height + 'px'});
      var pos = barWidth - divPercent.outerWidth(true);
      if (pos < 0) {
        pos = 0;
      }
      divPercent.css(this.rtl ? {right: pos + 'px'} : {left: pos + 'px'});

      for (var i = 0; i < this.cssRange.length; i++) {
        var item = this.cssRange[i];
        this.el.toggleClass(item.css, item.to >= percent && item.from <= percent);
      }
      this.el.toggleClass('tooSmallForRoundedCorners', barWidth > 0 && barWidth < 15);
    }
  });

  function createUI(target) {
    var el = $(
      '<div class="progress-bar-container">' +
        '<div class="bar"/>' +
        '<div class="percent"/>' +
      '</div>'
    );
    target.html(el);
    return el;
  }

  function createCssRangeArray(cssRangeObject) {
    var arr = [];
    for (var from in cssRangeObject) {
      arr.push({from: parseInt(from, 10), css: cssRangeObject[from]});
    }
    arr.sort(function(a, b) {
      a = a.from;
      b = b.from;
      return a < b ? -1 : a === b ? 0 : 1;
    });
    //calculate to value
    for (var i = 1; i < arr.length; i++) {
      var item = arr[i - 1];
      item.to = arr[i].from - 1;
    }
    arr[arr.length - 1].to = 100;
    return arr;
  }

  $.fn.progressBar = function(options) {
    if (options == 'api') {
      return this.data('api');
    } else {
      return this.each(function() {
        var target = $(this);
        if ($.type(options) === "object") {
          target.data('api', new ProgressBarClass(target, $.extend({}, $.fn.progressBar.defaults, options || {})));
        }
      });
    }
  };

  $.fn.progressBar.defaults = {
    start: 0,
    total: 100,
    cssRange: {0: 'red', 30: 'orange', 75: 'green'}
  };

  //in jquery 1.7 isNumeric is added, but prior 1.7 isNaN method present
  if($().jquery < "1.7") $.isNumeric = function(){ return !$.isNaN.apply($, arguments); };

})(jQuery);
