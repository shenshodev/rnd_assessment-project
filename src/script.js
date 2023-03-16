
$(document).ready(function () {
    $('.promotions-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:'<button class="fa fa-angle-left" type="button"></button>',
        nextArrow:'<button class="fa fa-angle-right" type="button"></button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                },
            }
        ],
    });

    $('.logos-slider').slick({
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true,
        asNavFor: '.navigator',
        fade: true
    });

    $('.motorcycles-slider').slick({
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.navigator',
        adaptiveHeight: true
    });

    $('.youtube-slider').slick({
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true,
        asNavFor: '.navigator',
        fade: true
    });

    $('.navigator').slick({
        slidesToScroll: 1,
        slidesToShow: 4,
        arrows: false,
        adaptiveHeight: true,
        centerMode: true,
        focusOnSelect: true,
        asNavFor: '.to-navigator',
        vertical: true,
        centerMode: true
    });
});