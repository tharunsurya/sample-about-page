document.addEventListener('DOMContentLoaded', function () {
    // Options for IntersectionObserver
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
    };

    // IntersectionObserver for timeline items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 0.5; // Add delay for each item (slower)
                entry.target.style.animationDelay = `${delay}s`;
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach((item) => {
        observer.observe(item);
    });

    // Scroll-triggered animations for cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const card = entry.target;
            const cardText = card.querySelector('.card-text');

            if (entry.isIntersecting) {
                // Add 'visible' class to card when in the viewport
                card.classList.add('visible');

                // Ensure text inside card animates in
                if (cardText) {
                    cardText.classList.remove('reverse');
                }
            } else {
                // Remove 'visible' class when card exits the viewport
                card.classList.remove('visible');

                // Reverse text animation when card exits viewport
                if (cardText) {
                    cardText.classList.add('reverse');
                }
            }
        });
    });

    // Observe all cards
    document.querySelectorAll('.card').forEach((card) => {
        cardObserver.observe(card);
    });

    // Intro text animation on page load
    const introText = document.querySelectorAll('.intro-text span');
    introText.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.1}s`; // Staggered animation for each word
        span.style.opacity = 1; // Ensure visibility
        span.style.transform = 'translateY(0)';
    });
});
