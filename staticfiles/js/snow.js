class Snowflake {
    constructor(canvas, layer = 1) {
        this.canvas = canvas;
        this.layer = layer; // 1: Foreground (Large), 2: Mid, 3: Background (Small)
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height - this.canvas.height;

        // Settings based on layer
        if (this.layer === 1) { // Foreground
            this.radius = Math.random() * 2 + 3;
            this.speed = Math.random() * 2 + 1.5;
            this.opacity = Math.random() * 0.4 + 0.5;
            this.blur = 1;
        } else if (this.layer === 2) { // Midground
            this.radius = Math.random() * 1.5 + 1.5;
            this.speed = Math.random() * 1 + 0.8;
            this.opacity = Math.random() * 0.3 + 0.3;
            this.blur = 0;
        } else { // Background
            this.radius = Math.random() * 1 + 0.5;
            this.speed = Math.random() * 0.5 + 0.3;
            this.opacity = Math.random() * 0.2 + 0.2;
            this.blur = 0;
        }

        this.wind = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind + Math.sin(this.y / 50) * 0.2; // Subtle drift

        if (this.y > this.canvas.height) {
            this.reset();
            this.y = -10;
        }

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
    }

    draw(ctx) {
        ctx.beginPath();
        if (this.layer === 1 && this.blur > 0) {
            // Very subtle blur for foreground
            ctx.shadowBlur = this.blur;
            ctx.shadowColor = "white";
        } else {
            ctx.shadowBlur = 0;
        }
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

        // Distribution for 3D effect
        this.layers = [
            { count: 30, type: 1 },  // Foreground (Few, large)
            { count: 70, type: 2 },  // Midground
            { count: 120, type: 3 }  // Background (Many, small)
        ];

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.layers.forEach(layer => {
            for (let i = 0; i < layer.count; i++) {
                this.snowflakes.push(new Snowflake(this.canvas, layer.type));
            }
        });

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Sort by layer so background renders first (important if many)
        this.snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw(this.ctx);
        });

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SnowEffect('snow-canvas');
});
