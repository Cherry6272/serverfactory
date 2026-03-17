document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const items = document.querySelectorAll('.slider-item');
    
    if (!track || !nextBtn || !prevBtn || items.length === 0) return;

    let currentIndex = 0;

    let autoSlideInterval;

    const updateSlider = () => {
        if (items.length === 0) return;
        const itemWidth = items[0].getBoundingClientRect().width;
        const gap = 20; // Matches CSS gap
        track.style.transform = `translateX(-${(itemWidth + gap) * currentIndex}px)`;
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            const itemsVisible = getItemsVisible();
            if (currentIndex < items.length - itemsVisible) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 2500); // 2.5 seconds as requested
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    nextBtn.addEventListener('click', () => {
        const itemsVisible = getItemsVisible();
        if (currentIndex < items.length - itemsVisible) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            const itemsVisible = getItemsVisible();
            currentIndex = Math.max(0, items.length - itemsVisible);
        }
        updateSlider();
        stopAutoSlide();
        startAutoSlide();
    });

    const getItemsVisible = () => {
        const width = window.innerWidth;
        if (width > 1200) return 4;
        if (width > 992) return 3;
        if (width > 768) return 2;
        return 1;
    };

    // Pause on hover
    const tray = document.querySelector('.featured-slider-container');
    tray.addEventListener('mouseenter', stopAutoSlide);
    tray.addEventListener('mouseleave', startAutoSlide);

    window.addEventListener('resize', () => {
        // Just recalculate the position without jumping back to start
        updateSlider();
    });

    // Initialize
    setTimeout(updateSlider, 100); // Slight delay to ensure dimensions are ready
    startAutoSlide();
});
