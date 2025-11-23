/**
 * NeoCity Loading Screen - Lightweight Particle System
 * Custom implementation for animated background particles
 */

(function() {
    'use strict';
    
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    let animationId = null;
    
    // Configuration - simplified with fewer nodes
    const config = {
        particleCount: 20,        // Reduced to 20 nodes for simplicity
        particleColor: '#00c8ff', // Teal/cyan
        lineColor: '#00c8ff',
        lineOpacity: 0.5,        // Higher opacity for more visible connections
        lineDistance: 250,       // Longer connection distance to compensate for fewer particles
        particleSpeed: 0.8,       // Fast movement
        particleSize: 4,         // Larger particles for better visibility
        mouseInteraction: true,
        mouseRadius: 150          // Mouse interaction area
    };
    
    // Resize canvas to fill viewport
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // More varied initial velocities for active movement
            this.vx = (Math.random() - 0.5) * config.particleSpeed * (0.5 + Math.random());
            this.vy = (Math.random() - 0.5) * config.particleSpeed * (0.5 + Math.random());
            this.size = config.particleSize;
        }
        
        update() {
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Mouse interaction (more active repulsion)
            if (config.mouseInteraction && mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.mouseRadius) {
                    const force = (config.mouseRadius - distance) / config.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    // Stronger mouse interaction for more active response
                    this.vx -= Math.cos(angle) * force * 0.05;
                    this.vy -= Math.sin(angle) * force * 0.05;
                }
            }
            
            // Boundary wrapping
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            // Less damping for more active movement
            this.vx *= 0.995;
            this.vy *= 0.995;
            
            // Add slight random variation for more organic movement
            if (Math.random() < 0.1) {
                this.vx += (Math.random() - 0.5) * 0.1;
                this.vy += (Math.random() - 0.5) * 0.1;
            }
        }
        
        draw() {
            // Enhanced glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = config.particleColor;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = config.particleColor;
            ctx.fill();
            
            // Reset shadow
            ctx.shadowBlur = 0;
        }
    }
    
    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw lines between nearby particles
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.lineDistance) {
                    const opacity = (1 - distance / config.lineDistance) * config.lineOpacity;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
                    ctx.lineWidth = 1.5; // Slightly thicker lines
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'rgba(0, 200, 255, 0.5)';
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connecting lines
        drawLines();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Mouse tracking
    function handleMouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
    
    function handleMouseLeave() {
        mouse.x = null;
        mouse.y = null;
    }
    
    // Initialize
    function init() {
        resizeCanvas();
        initParticles();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        
        if (config.mouseInteraction) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseleave', handleMouseLeave);
        }
        
        animate();
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Cleanup function (optional, for page transitions)
    window.cleanupParticles = function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
    };
})();

