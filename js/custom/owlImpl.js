$(document).ready(function() {
    $('.slider').owlCarousel({
        margin: 10,
        loop: true,
        autoWidth: true,
        items: 4,
        autoplay: true,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
    });
});