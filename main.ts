/**
 * Saugat | Developer Portfolio Logic
 * Language: TypeScript
 */

interface Cursor {
    x: number;
    y: number;
}

class Portfolio {
    private cursor: HTMLElement | null;
    private follower: HTMLElement | null;
    private dot: Cursor = { x: 0, y: 0 };
    private followerPos: Cursor = { x: 0, y: 0 };

    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        
        this.initCursor();
        this.initTiltEffect();
        this.initScrollReveal();
        this.initGlitchEffect();
    }

    private initCursor(): void {
        if (!this.cursor || !this.follower) return;

        window.addEventListener('mousemove', (e: MouseEvent) => {
            this.dot.x = e.clientX;
            this.dot.y = e.clientY;
            
            this.cursor!.style.transform = `translate(${this.dot.x}px, ${this.dot.y}px)`;
        });

        const animateFollower = () => {
            this.followerPos.x += (this.dot.x - this.followerPos.x) * 0.1;
            this.followerPos.y += (this.dot.y - this.followerPos.y) * 0.1;

            if (this.follower) {
                this.follower.style.transform = `translate(${this.followerPos.x - 20}px, ${this.followerPos.y - 20}px)`;
            }
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Hover effects for links and buttons
        const interactables = document.querySelectorAll('a, .btn, .project-card, .social-links i');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.follower?.classList.add('active');
                if (this.follower) {
                    this.follower.style.transform += ' scale(1.5)';
                    this.follower.style.borderColor = 'var(--accent-color)';
                    this.follower.style.background = 'rgba(211, 47, 47, 0.1)';
                }
            });
            el.addEventListener('mouseleave', () => {
                this.follower?.classList.remove('active');
                if (this.follower) {
                    this.follower.style.transform = this.follower.style.transform.replace(' scale(1.5)', '');
                    this.follower.style.background = 'rgba(211, 47, 47, 0.05)';
                }
            });
        });
    }

    private initTiltEffect(): void {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e: any) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                (card as HTMLElement).style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
            });
        });
    }

    private initScrollReveal(): void {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .section-title, .hero-content, .contact-container').forEach(el => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
    }

    private initGlitchEffect(): void {
        const text = document.querySelector('.glitch-text');
        if (!text) return;

        // Randomly trigger extra glitch intensity
        setInterval(() => {
            if (Math.random() > 0.95) {
                text.classList.add('glitch-intense');
                setTimeout(() => text.classList.remove('glitch-intense'), 200);
            }
        }, 1000);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
