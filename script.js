document.addEventListener('DOMContentLoaded', () => {

    // --- DYNAMIC CURSOR GLOW AURA ---
    if (window.matchMedia('(pointer: fine)').matches) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;
        const speed = 0.08;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * speed;
            glowY += (mouseY - glowY) * speed;
            glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate3d(-50%, -50%, 0)`;
            requestAnimationFrame(animateGlow);
        }
        animateGlow();

        // Hover expansions for premium interactive feeling
        const hoverTargets = document.querySelectorAll(
            'a, button, .btn, .project-card, .cert-card, .skill-card, .contact-card, .social-icons a, .logo, #menu-icon'
        );

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => glow.classList.add('expand'));
            target.addEventListener('mouseleave', () => glow.classList.remove('expand'));
        });
    }

    // --- MOBILE MENU TOGGLE ---
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x'); // Toggles icon to cross
            navbar.classList.toggle('active'); // Toggles display of links
        });
    }

    // --- STICKY NAV HEADER & SCROLL SPY ACTIVE LINKS ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const top = window.scrollY;

        // Sticky Header styling trigger
        if (header) {
            if (top > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }

        // Active Section Scroll Highlight (Scroll Spy)
        sections.forEach(sec => {
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');

                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Close mobile menu when scrolling
        if (menuIcon && navbar && navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuIcon && navbar) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            }
        });
    });

    // --- MOCK CONTACT FORM SUBMISSION ---
    const contactForm = document.querySelector('#portfolio-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const name = document.querySelector('#contact-name').value;
            const email = document.querySelector('#contact-email').value;
            const subject = document.querySelector('#contact-subject').value;
            const message = document.querySelector('#contact-message').value;

            // Log values or do alert
            console.log('Feedback submitted:', {
                name, email, subject, message
            });

            // Display a custom modal/alert
            alert(`Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`);

            // Reset form
            contactForm.reset();
        });
    }

    // --- TYPING ANIMATION ---
    const words = [
        "Full Stack Developer",
        "Frontend Developer",
        "Backend Developer",
        "Laravel Developer",
        "React.js Developer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpan = document.querySelector('.typing-text');

    function typeEffect() {
        if (!typingSpan) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 45 : 95;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1800; // Pause at the end of the typed word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pause before typing the next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // --- SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animate is complete
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});