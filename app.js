document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#navbar a');
    const cards = document.querySelectorAll('.card');
    const scrollToTopButton = document.querySelector('.footer-iconTop');

    let originalIndices = Array.from(cards).map(card => card.style.getPropertyValue('--index') || 1);
    let lastBroughtToFront = null;

    navLinks.forEach((link) => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (isElementInViewport(targetElement)) {
                if (lastBroughtToFront === targetElement) {
                    resetIndices();
                    lastBroughtToFront = null;
                } else {
                    bringToFront(targetElement);
                    lastBroughtToFront = targetElement;
                }
            }
        });
    });

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function bringToFront(el) {
        // Find the maximum current --index value
        let maxIndex = 1;
        cards.forEach(card => {
            const currentIndex = parseInt(card.style.getPropertyValue('--index')) || 1;
            if (currentIndex > maxIndex) {
                maxIndex = currentIndex;
            }
        });

        // Set the target element's --index to be one more than the maximum
        el.style.setProperty('--index', maxIndex + 1);
    }

    function resetIndices() {
        cards.forEach((card, index) => {
            card.style.setProperty('--index', originalIndices[index]);
        });
    }

    window.addEventListener('scroll', function() {
        resetIndices();
        lastBroughtToFront = null;
    });

    scrollToTopButton.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});