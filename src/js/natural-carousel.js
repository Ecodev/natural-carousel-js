/**
 * Attach event when document is ready!
 */
(function($) {
    $(function() {

        var naturalCarouselPrefix = 'natural-carousel';
        var naturalCarouselOptions = {
            slideHeight: 450,
            paginationMargin: 55,
            autoplay: 2000,
            speed: 1000,
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            loop: true,
            freeMode: false,
            slidesPerView: 1,
            spaceBetween: 0,
            paginationClickable: true,
            keyboardControl: true,
            centeredSlides: true,
            grabCursor: true,
            preloadImages: true,
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            freeModeSticky: true,
            direction: 'horizontal',
            effect: 'coverflow',
            blur: true,
            side: 'left',
            showBullets: true
        };

        function initCarousel() {

            for (var i = 0; i < naturalCarousels.length; i++) {

                var gallery = naturalCarousels[i];
                var options = getOptions(gallery);

                gallery.rootElement = $($('.' + naturalCarouselPrefix).get(i));
                gallery.rootElement.append(getPagination(options));
                gallery.rootElement.append(getSlides(gallery.slides, options)); // important after pagination because of ":hover +" selector
                gallery.rootElement.append(getNextButton(options));
                gallery.rootElement.append(getPrevButton(options));

                if (options.blur) {
                    gallery.rootElement.addClass('natural-carousel-blur');
                }

                if (options.showBullets) {
                    options.paginationBulletRender = function(index, className) {
                        return renderBullets(gallery, index, className);
                    };
                }

                gallery.swiper = new Swiper(gallery.rootElement, options);
            }

        }

        function getOptions(gallery) {

            var finalOptions = naturalCarouselOptions;

            for (var propertyName in gallery.options) {
                finalOptions[propertyName] = gallery.options[propertyName];
            }

            return finalOptions;
        }

        function getPagination(options) {

            options.hoverPaginationMargin = options.slideHeight + 10 - 50;

            return $('<div></div>')
                .addClass("swiper-pagination")
                .css('margin-top', options.slideHeight + 10)
                .hover(function() {
                    $(this).css('margin-top', options.hoverPaginationMargin + 'px');
                }, function() {
                    $(this).css('margin-top',  (options.slideHeight + 10) + 'px');
                });
        }

        function getNextButton(options) {
            return $('<div></div>')
                .addClass("swiper-button-next")
                .html('<svg viewBox="0 0 12 7.41"><use xlink:href="#natural-carousel-arrow-top"></use></svg>')
                .height(options.slideHeight);
        }

        function getPrevButton(options) {
            return $('<div></div>')
                .addClass("swiper-button-prev")
                .html('<svg viewBox="0 0 12 7.41"><use xlink:href="#natural-carousel-arrow-top"></use></svg>')
                .height(options.slideHeight);
        }

        function getSlides(slides, options) {
            var container = $('<div></div>')
                .addClass("swiper-wrapper")
                .height(options.slideHeight);

            return appendSlides(container, slides, options);
        }

        function appendSlides(container, slides, options) {

            for (var j = 0; j < slides.length; j++) {
                var data = slides[j];
                var slide = getSlide(data, options);
                container.append(slide);
            }

            return container;
        }

        function getSlide(data, options) {

            var slide = $('<a></a>')
                .addClass('swiper-slide')
                .css('background-image', 'url(' + data.enlarged + ')');

            if (data.slideLink && data.slideLink != '') {
                slide.attr('href', data.slideLink);
            }

            // content to test
            var hasTitle = data.title && data.title != "";
            var hasText = data.desc && data.desc != "";
            var hasButton = data.buttonLabel && data.buttonLabel != "" && data.buttonLink && data.buttonLink != "";

            // test content and add
            if (hasTitle || hasText || hasButton) {

                var textZone = $('<div></div>')
                    .addClass(naturalCarouselPrefix + '-text-container')
                    .addClass(options.side + '-side');

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
                        .addClass(naturalCarouselPrefix + '-text-button')
                        .attr('href', data.buttonLink)
                        .text(data.buttonLabel);

                    textZone.append(button);
                }

                return slide;
            }
        }

        function renderBullets(gallery, index, className) {

            var bgContainer = $('<span></span>')
                .addClass('swiper-pagination-bullet-bg')
                .css('background-image', 'url(' + gallery.slides[index].thumbnail + ')');

            if (gallery.slides[index].title && gallery.slides[index].title != "") {
                var label = $('<span></span>')
                    .text(gallery.slides[index].title)
                    .addClass('swiper-pagination-bullet-label');
            }

            var bullet = $('<span></span>')
                .addClass(className)
                .append(bgContainer)
                .append(label);

            bullet = $('<div></div>').append(bullet).html();

            return bullet;
        }

        initCarousel();

    });
})(jQuery);
