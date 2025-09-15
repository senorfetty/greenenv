// Smooth scroll and active link highlighting
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

function setActiveLink() {
    const scrollY = window.scrollY + 120;
    let activeIndex = 0;
    sections.forEach((sec, i) => {
        if (sec.offsetTop <= scrollY) activeIndex = i;
    });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === activeIndex));
}

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', setActiveLink);

// Smooth scroll for nav links (works across browsers)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
navToggle?.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
});
document.getElementById('nav-list')?.addEventListener('click', (e) => {
    if (e.target.closest('a')) document.body.classList.remove('nav-open');
});

// Scroll reveal
const revealEls = Array.from(document.querySelectorAll('.reveal-up'));
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Counters
function animateCount(el) {
    const target = Number(el.getAttribute('data-target') || '0');
    const duration = 1600;
    const start = performance.now();
    const startValue = 0;
    el.dataset.running = 'true';
    function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(startValue + (target - startValue) * eased);
        el.textContent = value.toLocaleString();
        if (p < 1) {
            requestAnimationFrame(tick);
        } else {
            el.dataset.running = 'false';
            el.dataset.lastRun = String(Date.now());
        }
    }
    requestAnimationFrame(tick);
}

document.querySelectorAll('.count').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (el.dataset.running === 'true') return;
                const last = Number(el.dataset.lastRun || '0');
                const now = Date.now();
                if (now - last < 500) return; // debounce re-run
                el.textContent = '0';
                animateCount(el);
            }
        });
    }, { threshold: 0.6 });
    observer.observe(el);
});

// Contact form (demo-only)
const form = document.querySelector('.contact-form');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    status.textContent = 'Sending...';
    setTimeout(() => {
        status.textContent = 'Thank you! We will get back to you soon.';
        form.reset();
    }, 900);
});

// Back to top keyboard access improvement
document.querySelector('.back-to-top')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Floating back-to-top arrow show/hide
const floatTopBtn = document.querySelector('.floating-back-to-top');
window.addEventListener('scroll', () => {
    if (!floatTopBtn) return;
    if (window.scrollY > 200) {
        floatTopBtn.classList.add('visible');
    } else {
        floatTopBtn.classList.remove('visible');
    }
});

// Set year
document.getElementById('year').textContent = new Date().getFullYear();

// Gallery slider
(function(){
    const slider = document.querySelector('.slider');
    if (!slider) return;
    const track = slider.querySelector('.slider-track');
    const originalSlides = Array.from(slider.querySelectorAll('.slide'));
    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');
    const dotsWrap = slider.querySelector('.slider-dots');
    // Clone for seamless loop
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
    track.insertBefore(lastClone, track.firstChild);
    track.appendChild(firstClone);
    const allSlides = Array.from(track.querySelectorAll('.slide'));
    let index = 1; // start on first real slide
    let autoplayId = null;
    const autoplayMs = 4000;
    // Continuous scroll mode
    const continuous = false;
    let positionPx = 0;
    let lastTs = 0;
    const pxPerMs = 0.12; // unused when continuous=false
    let isHover = false;
    let dir = 1; // 1 forward, -1 backward

    function update(animate = true) {
        const offset = -index * slider.clientWidth;
        if (!animate) track.style.transition = 'none';
        track.style.transform = `translateX(${offset}px)`;
        if (!animate) requestAnimationFrame(() => { track.style.transition = ''; });
        const activeDot = (index - 1 + originalSlides.length) % originalSlides.length;
        dotsWrap.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-selected', String(i === activeDot)));
    }

    function go(delta) {
        const max = originalSlides.length;
        index += delta;
        if (index < 1) { index = 1; dir = 1; }
        if (index > max) { index = max; dir = -1; }
        update(true);
    }

    // Dots
    originalSlides.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Go to slide ${i+1}`);
        b.addEventListener('click', () => { index = i + 1; update(true); restartAutoplay(); });
        dotsWrap.appendChild(b);
    });

    prev?.addEventListener('click', () => { dir = -1; go(-1); restartAutoplay(); });
    next?.addEventListener('click', () => { dir = 1; go(1); restartAutoplay(); });

    // Resize
    window.addEventListener('resize', () => {
        if (continuous) positionPx = -index * slider.clientWidth;
        update(false);
    });

    // Handle seamless snap when reaching clones
    track.addEventListener('transitionend', () => {
        if (index === 0) {
            index = originalSlides.length; // jump to last real
            update(false);
        } else if (index === originalSlides.length + 1) {
            index = 1; // jump to first real
            update(false);
        }
    });

    // Drag / touch
    let startX = 0, currentX = 0, dragging = false;
    function onDown(x){ dragging = true; startX = x; currentX = x; track.style.transition = 'none'; }
    function onMove(x){ if(!dragging) return; currentX = x; const dx = currentX - startX; track.style.transform = `translateX(${-index * slider.clientWidth + dx}px)`; }
    function onUp(){ if(!dragging) return; dragging = false; const dx = currentX - startX; track.style.transition = ''; if (Math.abs(dx) > slider.clientWidth * 0.2) { go(dx < 0 ? 1 : -1); } else { update(true); } restartAutoplay(); }
    track.addEventListener('mousedown', e => onDown(e.clientX));
    window.addEventListener('mousemove', e => onMove(e.clientX));
    window.addEventListener('mouseup', onUp);
    track.addEventListener('touchstart', e => onDown(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchmove', e => onMove(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchend', onUp);

    // Autoplay with pause on hover
    function startAutoplay(){ if (continuous) return; if (autoplayId) return; autoplayId = setInterval(() => {
        const max = originalSlides.length;
        if (index === max && dir === 1) dir = -1;
        else if (index === 1 && dir === -1) dir = 1;
        go(dir);
    }, autoplayMs); }
    function stopAutoplay(){ if (autoplayId) clearInterval(autoplayId); autoplayId = null; }
    function restartAutoplay(){ stopAutoplay(); startAutoplay(); }
    slider.addEventListener('mouseenter', () => { isHover = true; stopAutoplay(); });
    slider.addEventListener('mouseleave', () => { isHover = false; startAutoplay(); });

    // Init
    update(false);
    positionPx = -index * slider.clientWidth;
    // Continuous animation loop
    function raf(ts){
        if (!lastTs) lastTs = ts;
        const dt = ts - lastTs;
        lastTs = ts;
        if (continuous && !isHover && !dragging) {
            positionPx -= pxPerMs * dt;
            const width = slider.clientWidth;
            // When we pass the end clone, wrap forward seamlessly
            const minPos = -(originalSlides.length + 1) * width;
            if (positionPx <= minPos) positionPx += originalSlides.length * width;
            track.style.transition = 'none';
            track.style.transform = `translateX(${positionPx}px)`;
            // Update dot based on virtual index
            const virtual = Math.abs(positionPx / width);
            const activeDot = Math.floor((virtual - 0.5 + originalSlides.length) % originalSlides.length);
            dotsWrap.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-selected', String(i === activeDot)));
        }
        requestAnimationFrame(raf);
    }
    if (continuous) requestAnimationFrame(raf);
    startAutoplay();
})();

