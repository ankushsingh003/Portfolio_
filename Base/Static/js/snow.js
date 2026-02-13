/**
 * 3D Falling Snow Effect
 * High-performance Canvas animation
 */

class Snowflake {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height - this.canvas.height;
        this.radius = Math.random() * 3 + 1; // Size for 3D depth
        this.speed = Math.random() * 1 + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
        
        // Depth simulation: smaller particles are slower and fainter
        this.z = Math.random() * 100; // 0 to 100 depth
        this.speed *= (1 - this.z / 150);
        this.opacity *= (1 - this.z / 150);
        this.radius *= (1 - this.z / 150);
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;

        if (this.y > this.canvas.height) {
            this.reset();
            this.y = -10;
        }

        if (this.x > this.canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = this.canvas.width;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

class SnowEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.snowflakes = [];
        this.count = 150; // Total snowflakes

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        for (let i = 0; i < this.count; i++) {
            this.snowflakes.push(new Snowflake(this.canvas));
        }

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw(this.ctx);
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SnowEffect('snow-canvas');
});
