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

// Category filter dropdown
const trigger = document.getElementById('filter-trigger');
const menu = document.getElementById('filter-menu');
const filterLabel = document.getElementById('filter-label');
const options = document.querySelectorAll('.filter-option');
const groups = document.querySelectorAll('.doc-group');

trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
});

options.forEach(option => {
    option.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        filterLabel.textContent = option.dataset.label;

        const filter = option.dataset.filter;
        groups.forEach(group => {
            group.hidden = filter !== 'all' && group.dataset.category !== filter;
        });

        menu.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
    });
});

document.addEventListener('click', (e) => {
    if (!trigger.contains(e.target) && !menu.contains(e.target)) {
        menu.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
    }
});

// Fade-in groups on scroll
const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    }),
    { threshold: 0.05 }
);

groups.forEach((group, i) => {
    group.style.opacity = '0';
    group.style.transform = 'translateY(16px)';
    group.style.transition = `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms`;
    observer.observe(group);
});
