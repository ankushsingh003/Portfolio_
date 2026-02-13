/**
 * Auto-Hide Navbar on Scroll
 * Hides on scroll down, shows on scroll up.
 */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 50; // Minimum scroll to trigger hide

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Determine scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Scrolling down - Hide Navbar
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up - Show Navbar
            navbar.classList.remove('navbar-hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
});
