// ==================== WEBSITE JS ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('#websiteWrapper .nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});
function addToCart(name) {
    const toast = document.getElementById('toast');
    toast.textContent = '\u2713 ' + name + ' added to cart!';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending...'; btn.disabled = true;
    setTimeout(() => { btn.textContent = '\u2713 Sent!'; setTimeout(() => { btn.textContent = orig; btn.disabled = false; this.reset(); }, 2000); }, 1500);
});
document.querySelectorAll('#websiteWrapper a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.startsWith('javascript')) return;
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' }); }
    });
});