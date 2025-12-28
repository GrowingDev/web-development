const animatedElements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      anime({
        targets: entry.target,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        easing: 'easeOutCubic',
      });

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
  }
);

animatedElements.forEach((el) => observer.observe(el));
