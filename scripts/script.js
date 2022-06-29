
$(document).ready(function () {
    $('.promotions__slider').slick({
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
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true,
        asNavFor: '.to-navigator',
        fade: true
    });

    $('.motorcycles-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.to-navigator',
        adaptiveHeight: true
    });
    $('.youtube-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true,
        asNavFor: '.to-navigator',
        fade: true
    });

    $('.navigator').slick({
        slidesToShow: 4,
        arrows: false,
        adaptiveHeight: true,
        focusOnSelect: true,
        asNavFor: '.to-navigator',
        vertical: true
    });
});