    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!reducedMotion) {
      gsap.from('[data-animate]', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.section',
          start: 'top 70%',
        },
      });
    }