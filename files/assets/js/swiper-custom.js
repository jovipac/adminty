"use strict";
$(document).ready(function() {
var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 5,
        paginationClickable: true,
        spaceBetween: 20,
        loop: true,
        breakpoints: {
                // when window width is <= 576px
                576: {
                        slidesPerView: 1
                },
                // when window width is <= 992px
                992: {
                        slidesPerView: 2
                },
                // when window width is <= 1200px
                1200: {
                        slidesPerView: 3
                }
        }
    });
});