;(function ( $, window, document, undefined ) {

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
        ignoreNavHeightHighlight: false,
        ignoreNavHeightScroll: false,
				animationTime: 300
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
          console.log(this.settings);
          //Set our important items
          var navSyncSelection = $(this.element);
          var animationTime = this.settings.animationTime ? this.settings.animationTime : this._defaults.animationTime;
          var headerOffset = this.settings.ignoreNavHeightHighlight ? 0 : navSyncSelection.height();
          var scrollOffset = this.settings.ignoreNavHeightScroll ? 0 : navSyncSelection.height();
          var highlightClass = this.settings.highlightClass ? this.settings.highlightClass : this._defaults.highlightClass;
          var watchedDivs = [];
          
          //Find our links
          navSyncSelection.find("a").each(function() {
            
            var hrefString = $(this).attr("href");
            
            if (hrefString.charAt(0) === "#") {
              var anchor = $($(this).attr("href"));
             
              watchedDivs.push([anchor, anchor.offset().top, anchor.offset().top + anchor.outerHeight(true), this]); 
            }
            
          }).click(function(e) { //Handle presses
            
            e.preventDefault();
            
            //Scroll to element
            $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top-scrollOffset+6
            }, animationTime);
            
            console.log($($(this).attr("href")).offset().top);
          });
          
          //Highlight our first div
          $(watchedDivs[0][3]).addClass(highlightClass);
          
          //Scroll hook, check where we're at and determine highlight           
          $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            var i = 0;

            for (i=0; i<watchedDivs.length; i++) {
              if (scrollTop < watchedDivs[i][2]-headerOffset && scrollTop+headerOffset >= watchedDivs[i][1]) {
                $(watchedDivs[i][3]).addClass(highlightClass);

              } else {
                $(watchedDivs[i][3]).removeClass(highlightClass);
              }
            }
          });
          
        
          
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};
  

})( jQuery, window, document );