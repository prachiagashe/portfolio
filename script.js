document.addEventListener('DOMContentLoaded', () => {

    // --- COSMIC SPACE BACKGROUND ---
    const cosmicCanvas = document.getElementById('cosmic-canvas');
    const ctx = cosmicCanvas.getContext('2d');
    let animationId;
    let stars = [];
    let particles = [];

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
        cosmicCanvas.width = window.innerWidth;
        cosmicCanvas.height = window.innerHeight;
    }

    // Star colors: cyan, blue, magenta, yellow, white, purple
    const starColors = [
        'rgba(0, 255, 255,',    // cyan
        'rgba(0, 100, 255,',    // blue
        'rgba(255, 0, 255,',    // magenta
        'rgba(255, 255, 0,',    // yellow
        'rgba(255, 255, 255,',  // white
        'rgba(147, 51, 234,'    // purple
    ];

    // Create stars
    function createStars() {
        stars = [];
        const starCount = Math.min(300, Math.floor((cosmicCanvas.width * cosmicCanvas.height) / 4000));
        
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * cosmicCanvas.width,
                y: Math.random() * cosmicCanvas.height,
                radius: Math.random() * 1.5 + 0.5,
                color: starColors[Math.floor(Math.random() * starColors.length)],
                opacity: Math.random(),
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleDirection: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    // Create slow-moving particles for depth
    function createParticles() {
        particles = [];
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * cosmicCanvas.width,
                y: Math.random() * cosmicCanvas.height,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? 'rgba(0, 255, 255,' : 'rgba(0, 100, 255,', // cyan or blue
                opacity: Math.random() * 0.5 + 0.2,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3
            });
        }
    }

    function drawStars() {
        stars.forEach(star => {
            // Twinkle effect
            star.opacity += star.twinkleSpeed * star.twinkleDirection;
            
            if (star.opacity >= 1 || star.opacity <= 0.2) {
                star.twinkleDirection *= -1;
            }
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color + star.opacity + ')';
            ctx.fill();
        });
    }

    function drawParticles() {
        particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = cosmicCanvas.width;
            if (particle.x > cosmicCanvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = cosmicCanvas.height;
            if (particle.y > cosmicCanvas.height) particle.y = 0;
            
            // Draw glow effect
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 3
            );
            gradient.addColorStop(0, particle.color + particle.opacity + ')');
            gradient.addColorStop(1, particle.color + '0)');
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        });
    }

    function animate() {
        // Clear canvas with pure black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, cosmicCanvas.width, cosmicCanvas.height);
        
        drawStars();
        drawParticles();
        
        if (!prefersReducedMotion) {
            animationId = requestAnimationFrame(animate);
        }
    }

    function initCosmicBackground() {
        if (!cosmicCanvas) return;
        
        resizeCanvas();
        createStars();
        createParticles();
        
        if (!prefersReducedMotion) {
            animate();
        } else {
            // For reduced motion, just draw once
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, cosmicCanvas.width, cosmicCanvas.height);
            drawStars();
            drawParticles();
        }
    }

    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars();
        createParticles();
        if (prefersReducedMotion) {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, cosmicCanvas.width, cosmicCanvas.height);
            drawStars();
            drawParticles();
        }
    });

    // Initialize cosmic background
    initCosmicBackground();

    // --- COPY TO CLIPBOARD FUNCTION ---
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            // Optional: Show a brief notification
            const notification = document.createElement('div');
            notification.textContent = 'Copied to clipboard!';
            notification.style.cssText = `
                position: fixed;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                background: var(--gradient-primary);
                color: white;
                padding: 1rem 2rem;
                border-radius: 1rem;
                font-size: 1.4rem;
                z-index: 1000;
                animation: fadeInOut 2s ease;
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

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

    // --- CONTACT FORM SUBMISSION ---
    const contactForm = document.querySelector('#portfolio-contact-form');
    const formMessage = document.querySelector('#form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Extract values
            const name = document.querySelector('#contact-name').value;
            const email = document.querySelector('#contact-email').value;
            const subject = document.querySelector('#contact-subject').value;
            const message = document.querySelector('#contact-message').value;
            const submitBtn = document.querySelector('#contact-submit-btn');

            // Save original button text and show loading
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Hide previous messages
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, subject, message })
                });
                
                const data = await response.json();

                if (response.ok) {
                    // Success
                    formMessage.textContent = 'Message sent successfully!';
                    formMessage.classList.add('success');
                    formMessage.style.display = 'block';
                    contactForm.reset();
                } else {
                    // Error from server
                    formMessage.textContent = data.message || 'Oops! There was a problem submitting your form.';
                    formMessage.classList.add('error');
                    formMessage.style.display = 'block';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formMessage.textContent = 'Oops! There was a network error. Please try again later.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- TYPING ANIMATION ---
    const words = [
        "Product Management",
        "AI-Assisted Prototyping",
        "Business Analysis",
        "Product Analytics"
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
    const timelineItems = document.querySelectorAll('.timeline-item');

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

    // Timeline items reveal animation
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});