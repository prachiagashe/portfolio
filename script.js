document.addEventListener('DOMContentLoaded', () => {

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
});