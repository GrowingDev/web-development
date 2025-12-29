  const circle = document.getElementById('growingCircle');
        const textReveal = document.getElementById('textReveal');
        const scrollIndicator = document.getElementById('scrollIndicator');
        const mainHeader = document.querySelector('.main-header');

        window.addEventListener('scroll', () => {
            const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

            // Fade out header as you start scrolling
            if (window.scrollY > 100) {
                mainHeader.classList.add('fade-out');
                scrollIndicator.style.opacity = '0';
            } else {
                mainHeader.classList.remove('fade-out');
                scrollIndicator.style.opacity = '0.7';
            }

            // Calculate circle size (grows as you scroll)
            const maxSize = Math.max(window.innerWidth, window.innerHeight) * 2.5;
            const circleSize = scrollPercentage * maxSize;

            circle.style.width = `${circleSize}px`;
            circle.style.height = `${circleSize}px`;

            // Show/hide text based on scroll position
            if (scrollPercentage > 0.8) {
                textReveal.classList.add('active');
            } else {
                textReveal.classList.remove('active');
            }
        });