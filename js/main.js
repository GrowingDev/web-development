        // Smooth scroll to sections
        function smoothScroll(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (sectionId === 'top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Update active state
            updateActiveNav(sectionId);

            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('open');
            }
        }

        // Update active navigation link
        function updateActiveNav(sectionId) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }

        // Toggle sidebar on mobile
        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('open');
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.querySelector('.sidebar-toggle');

            if (window.innerWidth <= 768 &&
                !sidebar.contains(e.target) &&
                !toggle.contains(e.target) &&
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });

        // Highlight active section on scroll
        window.addEventListener('scroll', () => {
            const sections = ['fundamentals', 'layout', 'typography', 'components', 'animations', 'javascript'];
            let currentSection = '';

            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = sectionId;
                    }
                }
            });

            if (currentSection) {
                updateActiveNav(currentSection);
            }
        });

        // Set initial active state
        window.addEventListener('load', () => {
            updateActiveNav('fundamentals');
        });
