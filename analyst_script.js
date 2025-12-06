document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Visual Generation ---
    const vizContainer = document.getElementById('heroViz');
    if (vizContainer) {
        const barCount = 20;

        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.classList.add('viz-bar');

            // Random initial height
            const height = Math.floor(Math.random() * 80) + 20; // 20% to 100%
            bar.style.height = `${height}%`;

            // Random animation delay for "alive" feel
            bar.style.transition = `height ${Math.random() * 0.5 + 0.5}s ease-in-out`;

            vizContainer.appendChild(bar);
        }

        // Animate bars periodically to simulate live data
        setInterval(() => {
            const bars = document.querySelectorAll('.viz-bar');
            bars.forEach(bar => {
                if (Math.random() > 0.7) { // Only update some bars
                    const newHeight = Math.floor(Math.random() * 80) + 20;
                    bar.style.height = `${newHeight}%`;
                }
            });
        }, 800);
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Active Link Update
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Fade in sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Animate Progress Bars on scroll
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.progress-fill');
                const width = fill.style.width;
                fill.style.width = '0'; // Reset to 0
                setTimeout(() => {
                    fill.style.width = width; // Animate to target
                }, 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar').forEach(bar => {
        skillObserver.observe(bar);
    });
});
