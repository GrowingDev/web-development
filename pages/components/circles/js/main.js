      const circles = document.querySelectorAll('.circle');
        const radius = 240;

        // Check if mobile
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Mobile: Simple fade-in animation in column
            circles.forEach((circle, index) => {
                gsap.set(circle, {
                    opacity: 0,
                    y: 30
                });

                gsap.to(circle, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "power2.out"
                });
            });
        } else {
            // Desktop: Radial expansion animation
            circles.forEach((circle, index) => {
                const startAngle = (index * 360) / circles.length;
                
                // Calculate final position
                const radians = (startAngle * Math.PI) / 180;
                const finalX = Math.cos(radians) * radius;
                const finalY = Math.sin(radians) * radius;
                
                // Set initial position at center
                gsap.set(circle, {
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0
                });

                // Animate from center to orbit position
                gsap.to(circle, {
                    x: finalX,
                    y: finalY,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    delay: index * 0.08,
                    ease: "back.out(1.7)"
                });
            });
        }

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                location.reload();
            }, 250);
        });