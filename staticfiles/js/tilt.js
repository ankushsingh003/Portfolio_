/**
 * 3D Tilt Effect
 * Makes elements rotate in 3D space based on mouse position.
 */

class TiltCard {
    constructor(element) {
        this.element = element;
        this.inner = element.querySelector('.card-inner') || element;
        this.maxTilt = 15; // Max degrees
        this.perspective = 1000;

        this.init();
    }

    init() {
        this.element.style.perspective = `${this.perspective}px`;
        this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.onMouseLeave());
        this.element.addEventListener('mouseenter', () => this.onMouseEnter());
    }

    onMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate tilt based on cursor position relative to center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = (y - centerY) / centerY * this.maxTilt;
        const tiltY = (centerX - x) / centerX * this.maxTilt;

        this.inner.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    onMouseEnter() {
        this.inner.style.transition = "transform 0.1s ease";
    }

    onMouseLeave() {
        this.inner.style.transition = "transform 0.5s ease";
        this.inner.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
}

// Initialize for all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => new TiltCard(card));
});
