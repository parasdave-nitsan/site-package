document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('[data-slider]').forEach(function (slider) {

        const track = slider.querySelector('.modern-slider__track');
        const slides = slider.querySelectorAll('.modern-slider__slide');

        const dotsContainer =
            slider.querySelector('[data-slider-dots]');

        const previousButton =
            slider.querySelector('[data-slider-prev]');

        const nextButton =
            slider.querySelector('[data-slider-next]');

        const playButton =
            slider.querySelector('[data-slider-play]');

        /*
         * Stop if required elements are missing
         */
        if (!track || !slides.length) {
            return;
        }

        let current = 0;
        let autoplay = true;
        let timer = null;

        /*
         * Create navigation dots
         */
        if (dotsContainer) {

            slides.forEach(function (slide, index) {

                const dot = document.createElement('button');

                dot.type = 'button';
                dot.className = 'modern-slider__dot';

                dot.setAttribute(
                    'aria-label',
                    'Go to slide ' + (index + 1)
                );

                dot.setAttribute(
                    'aria-current',
                    index === 0 ? 'true' : 'false'
                );

                dot.addEventListener('click', function () {
                    goToSlide(index);
                    restartAutoplay();
                });

                dotsContainer.appendChild(dot);
            });
        }

        const dots = dotsContainer
            ? dotsContainer.querySelectorAll('.modern-slider__dot')
            : [];


        /*
         * Go to slide
         */
        function goToSlide(index) {

            if (!slides.length) {
                return;
            }

            current =
                (index + slides.length) % slides.length;

            /*
             * Move slider track
             */
            track.style.transform =
                'translate3d(-' +
                (current * 100) +
                '%, 0, 0)';


            /*
             * Update active slide
             */
            slides.forEach(function (slide, slideIndex) {

                slide.classList.toggle(
                    'is-active',
                    slideIndex === current
                );

            });


            /*
             * Update dots
             */
            dots.forEach(function (dot, dotIndex) {

                const isActive =
                    dotIndex === current;

                dot.classList.toggle(
                    'is-active',
                    isActive
                );

                dot.setAttribute(
                    'aria-current',
                    isActive ? 'true' : 'false'
                );

            });

        }


        /*
         * Next slide
         */
        function nextSlide() {

            goToSlide(current + 1);

        }


        /*
         * Previous slide
         */
        function previousSlide() {

            goToSlide(current - 1);

        }


        /*
         * Start autoplay
         */
        function startAutoplay() {

            clearInterval(timer);

            timer = null;

            if (
                !autoplay ||
                slides.length < 2
            ) {
                return;
            }

            timer = setInterval(function () {

                nextSlide();

            }, 5000);

        }


        /*
         * Restart autoplay
         */
        function restartAutoplay() {

            startAutoplay();

        }


        /*
         * Toggle play / pause
         */
        function toggleAutoplay() {

            autoplay = !autoplay;

            if (!playButton) {
                return;
            }

            const icon =
                playButton.querySelector('[data-play-icon]');


            if (autoplay) {

                if (icon) {
                    icon.textContent = 'Ⅱ';
                }

                playButton.setAttribute(
                    'aria-label',
                    'Pause slider'
                );

                playButton.setAttribute(
                    'aria-pressed',
                    'false'
                );

                startAutoplay();

            } else {

                clearInterval(timer);

                timer = null;

                if (icon) {
                    icon.textContent = '▶';
                }

                playButton.setAttribute(
                    'aria-label',
                    'Play slider'
                );

                playButton.setAttribute(
                    'aria-pressed',
                    'true'
                );

            }

        }


        /*
         * Previous button
         */
        if (previousButton) {

            previousButton.addEventListener(
                'click',
                function () {

                    previousSlide();
                    restartAutoplay();

                }
            );

        }


        /*
         * Next button
         */
        if (nextButton) {

            nextButton.addEventListener(
                'click',
                function () {

                    nextSlide();
                    restartAutoplay();

                }
            );

        }


        /*
         * Play / Pause button
         */
        if (playButton) {

            playButton.addEventListener(
                'click',
                function () {

                    toggleAutoplay();

                }
            );

            playButton.setAttribute(
                'aria-pressed',
                'false'
            );

        }


        /*
         * Pause autoplay while mouse is over slider
         */
        slider.addEventListener(
            'mouseenter',
            function () {

                clearInterval(timer);

            }
        );


        /*
         * Resume autoplay when mouse leaves slider
         */
        slider.addEventListener(
            'mouseleave',
            function () {

                if (autoplay) {
                    startAutoplay();
                }

            }
        );


        /*
         * Touch / swipe support
         */
        let touchStartX = 0;
        let touchEndX = 0;


        slider.addEventListener(
            'touchstart',
            function (event) {

                if (
                    event.changedTouches &&
                    event.changedTouches.length
                ) {

                    touchStartX =
                        event.changedTouches[0].screenX;

                }

                clearInterval(timer);

            },
            {
                passive: true
            }
        );


        slider.addEventListener(
            'touchend',
            function (event) {

                if (
                    !event.changedTouches ||
                    !event.changedTouches.length
                ) {
                    return;
                }

                touchEndX =
                    event.changedTouches[0].screenX;


                const distance =
                    touchStartX - touchEndX;


                /*
                 * Ignore very small movements
                 */
                if (Math.abs(distance) < 50) {

                    if (autoplay) {
                        startAutoplay();
                    }

                    return;

                }


                /*
                 * Swipe left
                 */
                if (distance > 0) {

                    nextSlide();

                /*
                 * Swipe right
                 */
                } else {

                    previousSlide();

                }


                restartAutoplay();

            },
            {
                passive: true
            }
        );


        /*
         * Keyboard navigation
         */
        slider.addEventListener(
            'keydown',
            function (event) {

                if (event.key === 'ArrowLeft') {

                    event.preventDefault();

                    previousSlide();
                    restartAutoplay();

                }


                if (event.key === 'ArrowRight') {

                    event.preventDefault();

                    nextSlide();
                    restartAutoplay();

                }

            }
        );


        /*
         * Make slider keyboard accessible
         */
        slider.setAttribute(
            'tabindex',
            '0'
        );


        /*
         * Initial state
         */
        goToSlide(0);

        startAutoplay();

    });

});
