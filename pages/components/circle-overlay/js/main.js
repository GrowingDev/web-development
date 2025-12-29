    const circles = document.querySelectorAll('.circle');
    const radius = 240;

    // Check if mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: Simple fade-in animation in column
      circles.forEach((circle, index) => {
        gsap.set(circle, {
          opacity: 0,
          y: 30,
        });

        gsap.to(circle, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out',
        });
      });
    } else {
      // Desktop: Radial expansion animation - stay in place
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
          scale: 0,
        });

        // Animate from center to orbit position and stay there
        gsap.to(circle, {
          x: finalX,
          y: finalY,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: index * 0.08,
          ease: 'back.out(1.7)',
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

    // Add click handlers to circles
    let isAnimating = false;

    circles.forEach((circle) => {
      circle.addEventListener('click', (e) => {
        if (!circle.classList.contains('expanded') && !isAnimating) {
          isAnimating = true;

          // Get current position
          const rect = circle.getBoundingClientRect();
          const currentWidth = rect.width;
          const currentHeight = rect.height;
          const currentLeft = rect.left;
          const currentTop = rect.top;

          // Add expanding class to prevent clicks during animation
          circle.classList.add('expanding');

          // Set initial state for animation
          gsap.set(circle, {
            position: 'fixed',
            left: currentLeft,
            top: currentTop,
            width: currentWidth,
            height: currentHeight,
            x: 0,
            y: 0,
            margin: 0,
            borderRadius: '50%',
          });

          // Add expanded class
          circle.classList.add('expanded');

          // Create timeline for synchronized animation
          const tl = gsap.timeline({
            onComplete: () => {
              circle.classList.remove('expanding');
              isAnimating = false;
            },
          });

          // Animate to fullscreen with optimized properties
          tl.to(
            circle,
            {
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              borderRadius: '0%',
              duration: 0.6,
              ease: 'power2.inOut',
            },
            0
          );

          // Animate icon and label
          const icon = circle.querySelector('.circle-icon');
          const label = circle.querySelector('.circle-label');
          tl.to(
            icon,
            {
              fontSize: isMobile ? '100px' : '120px',
              duration: 0.6,
              ease: 'power2.inOut',
            },
            0
          );
          tl.to(
            label,
            {
              fontSize: isMobile ? '36px' : '48px',
              duration: 0.6,
              ease: 'power2.inOut',
            },
            0
          );
        }
      });

      // Close button handler
      const closeBtn = circle.querySelector('.close-button');
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (isAnimating) return;
        isAnimating = true;

        // Get the target position for the circle
        const index = Array.from(circles).indexOf(circle);
        const startAngle = (index * 360) / circles.length;
        const radians = (startAngle * Math.PI) / 180;

        let targetLeft, targetTop, targetSize;

        if (isMobile) {
          targetLeft = (window.innerWidth - 340) / 2;
          targetTop = 40 + index * 380;
          targetSize = '340px';
        } else {
          const targetX = Math.cos(radians) * radius;
          const targetY = Math.sin(radians) * radius;
          targetLeft = window.innerWidth / 2 + targetX - 70;
          targetTop = window.innerHeight / 2 + targetY - 70;
          targetSize = '140px';
        }

        // Create timeline for closing animation
        const tl = gsap.timeline({
          onComplete: () => {
            circle.classList.remove('expanded');
            // Reset to original positioning
            if (isMobile) {
              gsap.set(circle, {
                position: 'relative',
                left: 'auto',
                top: 'auto',
                margin: '20px 0',
              });
            } else {
              const targetX = Math.cos(radians) * radius;
              const targetY = Math.sin(radians) * radius;
              gsap.set(circle, {
                position: 'absolute',
                left: '50%',
                top: '50%',
                x: targetX,
                y: targetY,
                width: targetSize,
                height: targetSize,
              });
            }
            isAnimating = false;
          },
        });

        // Animate back with optimized properties
        tl.to(
          circle,
          {
            left: targetLeft,
            top: targetTop,
            width: targetSize,
            height: targetSize,
            borderRadius: '50%',
            duration: 0.6,
            ease: 'power2.inOut',
          },
          0
        );

        // Animate icon and label back
        const icon = circle.querySelector('.circle-icon');
        const label = circle.querySelector('.circle-label');
        tl.to(
          icon,
          {
            fontSize: isMobile ? '80px' : '40px',
            duration: 0.6,
            ease: 'power2.inOut',
          },
          0
        );
        tl.to(
          label,
          {
            fontSize: isMobile ? '24px' : '14px',
            duration: 0.6,
            ease: 'power2.inOut',
          },
          0
        );
      });
    });