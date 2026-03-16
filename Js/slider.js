document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const items = document.querySelectorAll('.slider-item');
    
    if (!track || !nextBtn || !prevBtn || items.length === 0) return;

    let currentIndex = 0;

    const updateSlider = () => {
        const itemWidth = items[0].getBoundingClientRect().width;
        const gap = 20; // Matches CSS gap
        track.style.transform = `translateX(-${(itemWidth + gap) * currentIndex}px)`;
    };

    nextBtn.addEventListener('click', () => {
        const itemsVisible = getItemsVisible();
        if (currentIndex < items.length - itemsVisible) {
            currentIndex++;
            updateSlider();
        } else {
            // Loop back to start
            currentIndex = 0;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        } else {
            // Loop to end
            const itemsVisible = getItemsVisible();
            currentIndex = Math.max(0, items.length - itemsVisible);
            updateSlider();
        }
    });

    const getItemsVisible = () => {
        const width = window.innerWidth;
        if (width > 1024) return 4;
        if (width > 768) return 3;
        if (width > 480) return 2;
        return 1;
    };

    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateSlider();
    });
});
