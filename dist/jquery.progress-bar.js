/*
* progressBar - jQuery framework extensions
*
* Version: 0.0.1a
* Copyright 2011 Alex Tkachev
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: Mon Jul 4 16:59:27 2011 +0300
*/

(function($) {

  /**
   * Progress bar class api
   */
  var ProgressBarClass = function() {
    this.initialize.apply(this, arguments);
  };
  $.extend(ProgressBarClass.prototype, {

    initialize: function(el, config) {
      $.extend(this, config);
      this.el = el.toggleClass('rtl', this.rtl);
      this.cssRange = createCssRangeArray(this.cssRange);
      this.setValue(this.start);
    },

    setValue: function(newValue) {
      this.value = newValue % (this.total + 1);
      this.syncUI();
    },

    setTotal: function(newTotal) {
      this.total = newTotal;
      this.setValue(this.value);
    },

    syncUI: function() {
      var percent = Math.round(this.value / this.total * 100);
      if (jQuery.isNaN(percent)){
        percent = 0;
      }
      //move bar
      var height = this.el.height();
      var totalWidth = this.el.width();
      var barWidth = Math.round(percent / 100 * totalWidth);

      $('.bar', this.el).width(barWidth).height(height);

      var divPercent = $('.percent', this.el);
      divPercent.html(percent+'%').height(height).css({'line-height': height + 'px'});
      var pos = barWidth - divPercent.outerWidth(true);
      if (pos < 0){
        pos = 0;
      }
      divPercent.css(this.rtl ? {right: pos+'px'} : {left: pos+'px'});

      for (var i = 0; i < this.cssRange.length; i++) {
        var item = this.cssRange[i];
        this.el.toggleClass(item.css, item.to >= percent && item.from <= percent);
      }
    }
  });

  /** helper functions */
  function createUI(target) {
    return $(
      '<div class="progress-bar-container">' +
        '<div class="bar"/>' +
        '<div class="percent"/>' +
      '</div>'
    ).appendTo(target);
  }

  function createCssRangeArray(cssRangeObject) {
    var arr = [];
    for (var from in cssRangeObject) {
      arr.push({from: parseInt(from, 10), css: cssRangeObject[from]});
    }
    arr.sort(function(a,b){
      a = a.from; b = b.from;
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
    if (options) { //create new progress bar widgets
      this.each(function() {
        var target = $(this);
        var config = $.extend($.fn.progressBar.defaults, options);
        config.rtl = target.css('direction') == 'rtl';
        target.data('api', new ProgressBarClass(createUI(target), config));
      });
      return this;
    } else { //return existing instance api
      return $(this).data('api');
    }
  };

  $.fn.progressBar.defaults = {
    start: 0,
    total: 100,
    cssRange: {0: 'red', 30: 'orange', 75: 'green'},
    width: 200
  };

})(jQuery);