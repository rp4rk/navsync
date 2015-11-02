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

    // Our init function
    init: function () {

      // Set our target nav element, highlight class, header height
      var navSyncSelection = $(this.element);
      this.highlightClass = this.settings.highlightClass ? this.settings.highlightClass : this._defaults.highlightClass;
      this.initHeaderHeight(navSyncSelection);

      // Re-initialize due to window resize
      $(window).resize(function() {

        this.initHeaderHeight(navSyncSelection);
        this.watchedDivs = this.buildWatchedDivs(navSyncSelection);
        this.checkForHighlight(this.watchedDivs);

        // Clear our anchor bindings
        this.watchedDivs.forEach( function (anchor) {
          anchor[3].unbind("click");
        });

        // Reset
        this.initClickBinding();

      }.bind(this));

      // Construct our watched divs
      this.watchedDivs = this.buildWatchedDivs(navSyncSelection);

      // Handle Menu Clicks
      this.initClickBinding();

      // Initial highlight
      this.checkForHighlight(this.watchedDivs);

      // Initial scroll hook
      $(window).bind("scroll",  function() { this.scrollFunc(); }.bind(this) );


    },
    // Sets our header height
    initHeaderHeight: function(element) {

      this.headerHeight = this.settings.ignoreNavHeightScroll ? 0 : element.height();

    },
    // Applies appropriate highlight each frame
    scrollFunc: function() {

      window.requestAnimationFrame(function() {
        this.checkForHighlight(this.watchedDivs);
      }.bind(this));

    },
    // Applies approrpriate highlight
    checkForHighlight: function(arrDivs) {

      arrDivs.forEach(function(anchor) {
        if (this.isInView(anchor[1], anchor[2])) {
          anchor[3].addClass(this.highlightClass);
        } else {
          anchor[3].removeClass(this.highlightClass);
        }
      }.bind(this));

    },
    // Returns an array of anchors in the specified element
    getAnchors: function(element) {

      var arrAnchor = [];
      element.find("a").each(function(n, ele) { arrAnchor.push($(ele)); });
      return arrAnchor;

    },
    // Returns an array with each div we care about
    // [targetDiv, targetDivTop, targetDivBottom, targetDivLink]
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
    // Checks if the coordinates supplied are within the field of view
    // In this case the field of view is in the middle of the screen
    isInView: function(top, bottom) {

      var vp_threshold = $(window).scrollTop() + $(window).height()/2;
      return (top <= vp_threshold && bottom >= vp_threshold);

    },
    // Checks if the link supplied is an anchor on the current page
    // Returns boolean
    isAnchor: function(link) {

      var href_string = link.attr("href").replace("/","");
      return href_string.charAt(0) === "#";

    },
    // Scrolls to the supplied Y coordinate with the given time.
    scrollTo: function(y, animationTime, headerHeight) {

      $("html, body").animate({
        scrollTop: y - headerHeight - (this.settings.offset || 0)
      }, animationTime, function() {
        $(window).bind("scroll",  function() { this.scrollFunc(); }.bind(this) );
        this.checkForHighlight(this.watchedDivs);
      }.bind(this));

    },
    // Manages click binds
    initClickBinding: function() {

      this.watchedDivs.forEach(function(anchor) {

        anchor[3].click(function (e) {

          // Unbind our scroll
          $(window).unbind("scroll");

          // Prevent Default Action and scrollTo
          e.preventDefault();
          this.scrollTo(anchor[1], 500, this.headerHeight);

        }.bind(this));
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
