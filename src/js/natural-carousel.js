/**
 * Attach event when document is ready!
 */
(function($) {
    $(function() {

        function initCarousel() {

            for (var i = 0; i < naturalCarousels.length; i++) {

                var gallery = naturalCarousels[i];

                gallery.selector = '#naturalCarousel-' + i;
                gallery.rootElement = $(gallery.selector);
                gallery.bodyElement = gallery.rootElement.find('.swiper-wrapper');

                //for (var j = 0; j < gallery.images.length; j++) {
                //    var slide = $('<div class="swiper-slide swiper-lazy"></div>')
                //        .attr('data-background', gallery.images[j].enlarged)
                //        .append('<div class="swiper-lazy-preloader"></div>');
                //
                //    gallery.bodyElement.append(slide);
                //}

                gallery.swiper = new Swiper(gallery.rootElement.selector, {
                    pagination: '#swiper-pagination-' + gallery.id,
                    nextButton: '#swiper-button-next-' + gallery.id,
                    prevButton: '#swiper-button-prev-' + gallery.id,
                    scrollbar: '#swiper-scrollbar-' + gallery.id,

                    loop: gallery.loop,
                    speed: gallery.transitionTime,
                    autoplay: gallery.waitTime, // @todo : implement gallery.autoplay setting
                    autoplayDisableOnInteraction: gallery.autoReplay,
                    slidesPerView: gallery.slidesPerView,

                    spaceBetween: gallery.margin,
                    paginationClickable: true,
                    keyboardControl: true,
                    centeredSlides: true,
                    grabCursor: true,

                    preloadImages: false,
                    lazyLoading: true,
                    lazyLoadingInPrevNext: true,

                    freeMode: gallery.freeMode,
                    freeModeSticky: true
                });

            }

        }

        initCarousel();

    });
})(jQuery);
