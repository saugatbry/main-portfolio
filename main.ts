/**
 * Saugat | Portfolio Logic (TypeScript)
 * Smooth scroll, Horizontal Projects, and Dynamic UI
 */

declare const gsap: any;
declare const ScrollTrigger: any;
declare const Lenis: any;

class Portfolio {
    constructor() {
        console.log("Portfolio: Initializing...");
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error("Portfolio: GSAP or ScrollTrigger not found!");
            return;
        }
        
        gsap.registerPlugin(ScrollTrigger);
        console.log("Portfolio: ScrollTrigger registered.");
        
        this.initLenis();
        this.initHorizontalScroll();
        this.initScrollReveal();
        this.initTime();
        this.initMagneticButtons();
        this.initStackAnimations();
        console.log("Portfolio: All modules initialized.");
    }

    private initLenis(): void {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Link Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time: number) => {
            lenis.raf(time * 1000);
        });

        // Smooth anchor scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
                e.preventDefault();
                const target = this.getAttribute('href');
                if (target) lenis.scrollTo(target);
            });
        });
    }

    private initHorizontalScroll(): void {
        const container = document.querySelector('.projects-horizontal-container');
        const slider = document.querySelector('.projects-slider') as HTMLElement;
        if (!container || !slider) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
            const totalWidth = slider.scrollWidth;
            const windowWidth = window.innerWidth;
            const scrollDistance = totalWidth - (windowWidth * 0.84);

            gsap.to(slider, {
                x: -scrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => "+=" + scrollDistance,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                }
            });
        });

        // Mobile fallback
        mm.add("(max-width: 1024px)", () => {
            gsap.set(slider, { clearProps: "all" });
        });
    }

    private initScrollReveal(): void {
        const revealElements = document.querySelectorAll('.hero h1, .hero-description, .hero-btns, .stack h2, .timeline h2, .contact-header, .social-card, .timeline-item');
        
        revealElements.forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }

    private initStackAnimations(): void {
        const bars = document.querySelectorAll('.bar-inner') as NodeListOf<HTMLElement>;
        bars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = "0%";
            
            gsap.to(bar, {
                width: targetWidth,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 90%",
                }
            });
        });
    }

    private initTime(): void {
        const timeSpan = document.getElementById('live-time');
        if (!timeSpan) return;

        const update = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            timeSpan.innerText = `SK • ${hours}:${minutes}`;
        };

        update();
        setInterval(update, 60000);
    }

    private initMagneticButtons(): void {
        const buttons = document.querySelectorAll('.btn-work, .btn-discord, .say-hi-btn') as NodeListOf<HTMLElement>;
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
