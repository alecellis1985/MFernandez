(function () {

  "use strict";

  var Home = {

    initialized: false,

    initialize: function () {

      if (this.initialized)
        return;
      this.initialized = true;

      this.build();

      this.menu();
      this.carousel();
    },

    build: function (options) {


      // Home Slider#1
      // Revolution Slider Initialize

      $(".home-slider-1 .tp-banner").each(function () {

        var slider = $(this);

        var defaults = {
          delay: 9000,
          startheight: 750,
          startwidth: 960,

          hideThumbs: 10,

          thumbWidth: 100,
          thumbHeight: 50,
          thumbAmount: 5,

          navigationType: "both",
          navigationArrows: "verticalcentered",
          navigationStyle: "preview1",

          touchenabled: "on",
          onHoverStop: "on",

          navOffsetHorizontal: 0,
          navOffsetVertical: 20,

          stopAtSlide: 0,
          stopAfterLoops: -1,

          shadow: 0,
          fullWidth: "on",
          //forceFullWidth:"off",
          videoJsPath: "vendor/rs-plugin/videojs/"
        }

        var config = $.extend({}, defaults, options, slider.data("plugin-options"));

        // Initialize Slider
        var sliderApi = slider.revolution(config).addClass("slider-init");


      });


    },

    menu: function () {
      $("#myTopnav li a, #jx-main-menu li a").click(function (e) {
        e.preventDefault();
        var $thisBlock = $($(this).attr('href'));
        if ($thisBlock) {
          $('html, body').animate({
            scrollTop: $thisBlock.offset().top
          }, 1000);
        }
        return false;
      });
    },
    carousel: function () {
      /*var $item = $('.carousel .item');
      var $wHeight = $(window).height();
      $item.eq(0).addClass('active');
      $item.height($wHeight);
      $item.addClass('full-screen');*/
/*
      $('.carousel img').each(function () {
        var $src = $(this).attr('src');
        var $color = $(this).attr('data-color');
        $(this).parent().css({
          'background-image': 'url(' + $src + ')',
          'background-color': $color
        });
        $(this).remove();
      });*/
/*
      $(window).on('resize', function () {
        $wHeight = $(window).height();
        $item.height($wHeight);
      });*/
      /*
       $('.carousel').carousel({
       interval: 6000,
       pause: "false"
       });*/
    }
  };

  Home.initialize();
})();

