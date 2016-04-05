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

                    var slide = $('<a class="swiper-slide"></a>')
                        .css('background-image', 'url(' + data.enlarged + ')');

                    if (data.slideLink && data.slideLink != '') {
                        slide.attr('href', data.slideLink);
                    }

                    // content to test
                    var hasTitle = data.title && data.title != "";
                    var hasText = data.desc && data.desc != "";
                    var hasButton = data.buttonLabel && data.buttonLabel != "" && data.buttonLink && data.buttonLink != "" ;

                    // test content and add
                    if (hasTitle || hasText || hasButton) {

                        var side = data.side == 'left' || data.side == 'right' ? data.side : 'left';

                        var textZone = $('<div></div>')
                            .addClass('natural-carousel-text-container')
                            .addClass(side + '-side');

                        slide.append(textZone);

                        var title = $('<div></div>').addClass('title').text(data.title);
                        var desc = $('<div></div>').addClass('desc').html(data.desc);

                        if (hasTitle) {
                            textZone.append(title);
                        }

                        if (hasText) {
                            textZone.append(desc);
                        }

                        if (hasButton) {
                             var button = $('<a></a>')
                                 .addClass('natural-carousel-text-button')
                                 .attr('href', data.buttonLink)
                                 .text(data.buttonLabel);

                            textZone.append(button);
                        }

                    }

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
