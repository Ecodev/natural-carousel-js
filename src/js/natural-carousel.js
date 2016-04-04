/**
 * Attach event when document is ready!
 */
(function($) {
    $(function() {

        function initCarousel() {

            for (var i = 0; i < naturalCarousels.length; i++) {

                var gallery = naturalCarousels[i];

                gallery.selector = '#natural-carousel-' + i;
                gallery.rootElement = $(gallery.selector);
                gallery.bodyElement = gallery.rootElement.find('.swiper-wrapper');

                for (var j = 0; j < gallery.slidesData.length; j++) {
                    var data = gallery.slidesData[j];

                    var slide = $('<div class="swiper-slide"></div>')
                        .css('background-image', 'url(' + data.enlarged + ')');

                    gallery.bodyElement.append(slide);
                }

                gallery.swiper = new Swiper(gallery.rootElement.selector, {
                    pagination: '#swiper-pagination-' + gallery.id,
                    nextButton: '#swiper-button-next-' + gallery.id,
                    prevButton: '#swiper-button-prev-' + gallery.id,

                    paginationBulletRender: function (index, className) {

                        var bgContainer = $('<span></span>')
                            .addClass('swiper-pagination-bullet-bg')
                            .css('background-image', 'url(' + gallery.slidesData[index].thumbnail +')');

                        if (gallery.slidesData[index].title && gallery.slidesData[index].title != "") {
                            var label = $('<span></span>')
                                .text(gallery.slidesData[index].title)
                                .addClass('swiper-pagination-bullet-label');
                        }

                        var bullet = $('<span></span>')
                            .addClass(className)
                            .append(bgContainer)
                            .append(label);

                        bullet = $('<div></div>').append(bullet).html();

                        return bullet;
                    },

                    //direction: 'vertical',

                    //effect: 'cube',
                    effect: 'coverflow',

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
