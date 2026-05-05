/**
 * Saugat | Portfolio Logic (Premium Version)
 * Smooth scroll, Horizontal Projects, and Dynamic UI
 */

const initPortfolio = () => {
    console.log("Portfolio: Initializing...");
    
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        console.error("Portfolio: Libraries missing. Retrying...");
        setTimeout(initPortfolio, 500);
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    class Portfolio {
        constructor() {
            this.initLenis();
            this.initHorizontalScroll();
            this.initScrollReveal();
            this.initTime();
            this.initMagneticButtons();
            this.initStackAnimations();
            this.initHiAnimation();
            
            setTimeout(() => ScrollTrigger.refresh(), 500);
            console.log("Portfolio: System Online.");
        }

        initHiAnimation() {
            const hi = document.querySelector('.hi-anim');
            if (!hi) return;

            gsap.to(hi, {
                rotate: 20,
                duration: 0.5,
                repeat: 5,
                yoyo: true,
                ease: "power1.inOut",
                delay: 1
            });
        }

        initLenis() {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smooth: true,
            });

            const raf = (time) => {
                lenis.raf(time);
                requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);

            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = this.getAttribute('href');
                    if (target) lenis.scrollTo(target);
                });
            });
        }

        initHorizontalScroll() {
            const container = document.querySelector('.projects-horizontal-container');
            const slider = document.querySelector('.projects-slider');
            if (!container || !slider) return;

            const mm = gsap.matchMedia();
            mm.add("(min-width: 1025px)", () => {
                const totalWidth = slider.scrollWidth;
                const windowWidth = window.innerWidth;
                const scrollDistance = totalWidth - (windowWidth * 0.8);

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
                    }
                });
            });

            mm.add("(max-width: 1024px)", () => {
                gsap.set(slider, { clearProps: "all" });
            });
        }

        initScrollReveal() {
            const revealElements = document.querySelectorAll('.hero h1, .hero-description, .hero-btns, .stack h2, .timeline h2, .contact-header, .social-card, .timeline-item, .flower-symbol');
            revealElements.forEach(el => {
                gsap.fromTo(el, 
                    { opacity: 0, y: 30 },
                    { 
                        opacity: 1, y: 0, duration: 1, ease: "power4.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });
        }

        initStackAnimations() {
            const bars = document.querySelectorAll('.bar-inner');
            bars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = "0%";
                gsap.to(bar, {
                    width: targetWidth, duration: 1.5, ease: "power4.out",
                    scrollTrigger: { trigger: bar, start: "top 90%" }
                });
            });
        }

        initTime() {
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

        initMagneticButtons() {
            const buttons = document.querySelectorAll('.btn-work, .btn-discord, .say-hi-btn');
            buttons.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
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

    new Portfolio();
};

window.addEventListener('load', initPortfolio);
