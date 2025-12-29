        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation (on load)
        gsap.from("#heroTitle", {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: "power4.out"
        });

        gsap.from("#heroSubtitle", {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.3,
            ease: "power3.out"
        });

        gsap.from("#ctaButton", {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.6,
            ease: "power3.out"
        });

        // Feature 1
        gsap.from("#feature1Title", {
            scrollTrigger: {
                trigger: "#feature1Title",
                start: "top 80%"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });

        gsap.from("#feature1Desc", {
            scrollTrigger: {
                trigger: "#feature1Desc",
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });

        gsap.from("#image1", {
            scrollTrigger: {
                trigger: "#image1",
                start: "top 85%"
            },
            y: 80,
            opacity: 0,
            duration: 1.2,
            delay: 0.4,
            ease: "power3.out"
        });

        // Feature 2
        gsap.from("#feature2Title", {
            scrollTrigger: {
                trigger: "#feature2Title",
                start: "top 80%"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });

        gsap.from("#feature2Desc", {
            scrollTrigger: {
                trigger: "#feature2Desc",
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });

        gsap.from("#twoColumn .column", {
            scrollTrigger: {
                trigger: "#twoColumn",
                start: "top 85%"
            },
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            delay: 0.3,
            ease: "power3.out"
        });

        // Stats
        gsap.from("#statsTitle", {
            scrollTrigger: {
                trigger: "#statsTitle",
                start: "top 80%"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });

        function animateCounter(id, target) {
            gsap.from(id, {
                scrollTrigger: {
                    trigger: id,
                    start: "top 80%"
                },
                textContent: 0,
                duration: 2,
                ease: "power1.inOut",
                snap: { textContent: 1 },
                onUpdate: function() {
                    document.querySelector(id).textContent = Math.ceil(this.targets()[0].textContent);
                }
            });
            gsap.set(id, { textContent: target });
        }

        animateCounter("#stat1", 16);
        animateCounter("#stat2", 64);
        animateCounter("#stat3", 22);

        // Feature 3
        gsap.from("#feature3Title", {
            scrollTrigger: {
                trigger: "#feature3Title",
                start: "top 80%"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });

        gsap.from("#feature3Desc", {
            scrollTrigger: {
                trigger: "#feature3Desc",
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });

        gsap.from("#image2", {
            scrollTrigger: {
                trigger: "#image2",
                start: "top 85%"
            },
            y: 80,
            opacity: 0,
            duration: 1.2,
            delay: 0.4,
            ease: "power3.out"
        });

        // Testimonial
        gsap.from("#testimonial", {
            scrollTrigger: {
                trigger: "#testimonial",
                start: "top 80%"
            },
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        // Final Section
        gsap.from("#finalTitle", {
            scrollTrigger: {
                trigger: "#finalTitle",
                start: "top 80%"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });

        gsap.from("#finalDesc", {
            scrollTrigger: {
                trigger: "#finalDesc",
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            delay: 0.2,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from("#finalCta", {
            scrollTrigger: {
                trigger: "#finalCta",
                start: "top 85%"
            },
            y: 30,
            opacity: 0,
            delay: 0.4,
            duration: 1,
            ease: "power3.out"
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
