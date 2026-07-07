// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form — async Formspree submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.form-submit');
        btn.disabled = true;
        btn.textContent = 'Sending…';

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' },
            });

            if (res.ok) {
                contactForm.hidden = true;
                document.getElementById('form-success').hidden = false;
            } else {
                document.getElementById('form-error').hidden = false;
                btn.disabled = false;
                btn.textContent = 'Send Message';
            }
        } catch {
            document.getElementById('form-error').hidden = false;
            btn.disabled = false;
            btn.textContent = 'Send Message';
        }
    });
}

// Fade-in project cards on scroll
const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    }),
    { threshold: 0.05 }
);

document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms`;
    observer.observe(card);
});
