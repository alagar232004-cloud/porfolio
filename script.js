// ===== Slider + Animation Only =====
$(document).ready(function () {
    initSlider();
});

// Initialize Owl Carousel Slider
function initSlider() {
    if ($('.home-slider').length && typeof $.fn.owlCarousel !== 'undefined') {
        $('.home-slider').owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav: true,
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>'
            ],
            dots: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                768: {
                    items: 1,
                    nav: true
                }
            }
        });

        // Animate content when slide changes
        $('.home-slider').on('changed.owl.carousel', function () {
            $('.slider-item')
                .find('.tagline, .hero-title, .hero-desc, .hero-buttons')
                .css({
                    opacity: '0',
                    transform: 'translateY(30px)',
                    animation: 'none'
                });

            setTimeout(function () {
                animateSlideContent($('.owl-item.active .slider-item'));
            }, 100);
        });

        // First slide animation
        animateSlideContent($('.owl-item.active .slider-item'));
    }
}

// Animate Slide Text
function animateSlideContent(slide) {
    if (!slide.length) return;

    const elements = [
        slide.find('.tagline'),
        slide.find('.hero-title'),
        slide.find('.hero-desc'),
        slide.find('.hero-buttons')
    ];

    elements.forEach(function (el, index) {
        if (el.length) {
            el.css({
                animation: `fadeInUp 0.8s ease forwards ${(index * 0.2) + 0.3}s`
            });
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const skillBars = document.querySelectorAll(".skill-progress");

    // Set initial width to 0
    skillBars.forEach(bar => {
        bar.style.width = "0%";
    });

    function animateSkills() {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (barTop < windowHeight - 50 && !bar.classList.contains("animated")) {
                const targetWidth = bar.getAttribute("data-width");
                bar.style.width = targetWidth + "%";
                bar.classList.add("animated");
            }
        });
    }

    // Run on scroll
    window.addEventListener("scroll", animateSkills);

    // Run once on load
    animateSkills();
});

document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || filterValue === category) {
                    card.style.display = "block";
                    card.classList.remove("hide");
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    // ===== Active on Click =====
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // ===== Active on Scroll =====
    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
});
