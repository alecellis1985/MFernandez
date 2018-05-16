(function () {

  init();

  function init() {
    addNavClass();
    $(window).bind('scroll', function () {
      addNavClass();
    });
  }

  function addNavClass() {
    if ($(window).scrollTop() > 500) {
      $('.navbar-fixed-top').addClass('nav-up');
    } else
    {
      $('.navbar-fixed-top').removeClass('nav-up');
    }
  }
})();