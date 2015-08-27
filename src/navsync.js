;(function ($, window, document, undefined) {

  "use strict";

  // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn't really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  // can no longer be modified.

  // window and document are passed through as local variable rather than global
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).

  // Create the defaults once
  var pluginName = "navSync",
    defaults = {
      highlightClass: "navsync-menu-highlight",
      ignoreNavHeightScroll: false,
      animationTime: 500
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      //Set our important items
      var navSyncSelection = $(this.element);
      this.highlightClass = this.settings.highlightClass ? this.settings.highlightClass : this._defaults.highlightClass;
      this.headerHeight = this.settings.ignoreNavHeightScroll ? 0 : navSyncSelection.height();
      
      //Construct our watched divs
      this.watchedDivs = this.buildWatchedDivs(navSyncSelection);
      
      //Handle Menu Clicks
      this.watchedDivs.forEach(function(anchor) {
        anchor[3].click(function (e) {
          
          //Unbind our scroll
          $(window).unbind("scroll");
          
          //Prevent Default Action
          e.preventDefault();
          this.scrollTo(anchor[1], 500, this.headerHeight);
          
        }.bind(this));
      }.bind(this));
      
      
      //Highlight our first div
      this.checkForHighlight(this.watchedDivs);

      //Scroll hook       
      $(window).bind("scroll",  function() { this.scrollFunc(); }.bind(this) );
      
    },
    scrollFunc: function() {
      window.requestAnimationFrame(function() {

        this.checkForHighlight(this.watchedDivs);

      }.bind(this));
    },
    checkForHighlight: function(arrDivs) {
      
      
      arrDivs.forEach(function(anchor) {
        if (this.isInView(anchor[1], anchor[2])) {
          anchor[3].addClass(this.highlightClass);
        } else {
          anchor[3].removeClass(this.highlightClass);
        }
      }.bind(this));
    },
    getAnchors: function(element) {
      var arrAnchor = [];
      
      element.find("a").each(function(n, ele) { arrAnchor.push($(ele)); });
    
      return arrAnchor;
    },
    buildWatchedDivs: function(element) {
      var divList = this.getAnchors(element)
        .filter(function(item) {  
          return this.isAnchor(item);
        }.bind(this))
        .map(function(item) {
          var targetDiv = $(item.attr("href").replace("/", ""));
          return [targetDiv, targetDiv.offset().top, targetDiv.offset().top + targetDiv.outerHeight(true), item];
        }.bind(this));
      
      return divList;
    },
    isInView: function(top, bottom) {
      var vp_threshold = $(window).scrollTop() + $(window).height()/2;
      
      return (top <= vp_threshold && bottom >= vp_threshold);
    },
    isAnchor: function(link) {
      var href_string = link.attr("href").replace("/","");
      
      return href_string.charAt(0) === "#";
    },
    scrollTo: function(y, animationTime, headerHeight) {
      $("html, body").animate({
        scrollTop: y - headerHeight
      }, animationTime, function() {
        $(window).bind("scroll",  function() { this.scrollFunc(); }.bind(this) );
        this.checkForHighlight(this.watchedDivs);
      }.bind(this));
    }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };


})(jQuery, window, document);