/* ==========================================================================
   PORTFOLIO v3 — Perfected JavaScript (Performance-Optimized)
   ========================================================================== */

(function () {
    'use strict';

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isMobile = window.matchMedia('(max-width: 768px)').matches;

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];

    const dom = {};

    // Tracer state — kept outside for performance
    const tracer = {
        ready: false,
        totalLength: 0,
        points: [],       // Pre-computed points sampled along the path
        pointCount: 200,   // Number of samples (200 = every 0.5%)
    };

    // Scroll state — rAF gated
    let scrollTicking = false;

    function cacheDom() {
        dom.preloader = $('#preloader');
        dom.preloaderCount = $('#preloader-count');
        dom.preloaderBarFill = $('#preloader-bar-fill');
        dom.cursorDot = $('#cursor-dot');
        dom.cursorRing = $('#cursor-ring');
        dom.cursorText = $('#cursor-text');
        dom.scrollBar = $('#scroll-progress-bar');
        dom.header = $('#header');
        dom.menuToggle = $('#menu-toggle');
        dom.mobileMenu = $('#mobile-menu');
        dom.sectionDots = $$('.section-dot');
        dom.tracerSvg = $('#scroll-tracer');
        dom.tracerRail = $('#tracer-rail');
        dom.tracerActive = $('#tracer-active');
        dom.tracerDotSvg = $('#tracer-dot');
        dom.tracerDotHtml = $('#tracer-dot-html');
    }

    /* ======================================================================
       PRELOADER
       ====================================================================== */
    function initPreloader() {
        let count = 0;
        const duration = isMobile ? 600 : 1400;
        const start = performance.now();

        document.body.style.overflow = 'hidden';

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            count = Math.round(eased * 100);

            if (dom.preloaderCount) dom.preloaderCount.textContent = count;
            if (dom.preloaderBarFill) dom.preloaderBarFill.style.width = count + '%';

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(() => {
                    if (dom.preloader) dom.preloader.classList.add('done');
                    document.body.style.overflow = '';
                    setTimeout(() => {
                        initTracer();
                        if (dom.preloader) dom.preloader.style.display = 'none';
                    }, 900);
                }, 200);
            }
        }

        requestAnimationFrame(tick);
    }

    /* ======================================================================
       CUSTOM CURSOR
       ====================================================================== */
    function initCursor() {
        if (isMobile) return;

        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });

        (function animateCursor() {
            cursorPos.x += (mouse.x - cursorPos.x) * 0.12;
            cursorPos.y += (mouse.y - cursorPos.y) * 0.12;

            if (dom.cursorDot) {
                dom.cursorDot.style.transform =
                    `translate3d(${mouse.x - 4}px, ${mouse.y - 4}px, 0)`;
            }
            if (dom.cursorRing) {
                dom.cursorRing.style.transform =
                    `translate3d(${cursorPos.x - 20}px, ${cursorPos.y - 20}px, 0)`;
            }

            requestAnimationFrame(animateCursor);
        })();

        // Cursor states via data-cursor
        $$('[data-cursor]').forEach((el) => {
            const type = el.dataset.cursor;
            el.addEventListener('mouseenter', () => {
                setCursorState(type);
                if (type === 'view' && dom.cursorText) dom.cursorText.textContent = 'View';
            });
            el.addEventListener('mouseleave', clearCursorState);
        });

        // Generic interactive
        $$('a:not([data-cursor]), button:not([data-cursor])').forEach((el) => {
            el.addEventListener('mouseenter', () => setCursorState('link'));
            el.addEventListener('mouseleave', clearCursorState);
        });

        document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
        document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));
    }

    function setCursorState(state) {
        document.body.className = document.body.className.replace(/cursor-\w+/g, '').trim();
        document.body.classList.add('cursor-' + state);
    }

    function clearCursorState() {
        document.body.className = document.body.className.replace(/cursor-\w+/g, '').trim();
        if (dom.cursorText) dom.cursorText.textContent = '';
    }

    /* ======================================================================
       MAGNETIC BUTTONS
       ====================================================================== */
    function initMagnetic() {
        if (isMobile) return;

        $$('.magnetic').forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transition = 'none';
                el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.transform = '';
            });
        });
    }

    /* ======================================================================
       SCROLL TRACER — Pre-computed, rAF-gated, GPU-composited
       ====================================================================== */
    function initTracer() {
        if (isMobile || !dom.tracerSvg) return;

        const pageHeight = document.documentElement.scrollHeight;
        const pageWidth = window.innerWidth;

        // Generate serpentine bezier
        const amplitude = Math.min(pageWidth * 0.25, 320);
        const centerX = pageWidth * 0.5;
        const segmentHeight = 750;
        const segments = Math.ceil(pageHeight / segmentHeight);

        let d = `M ${centerX} 0`;
        for (let i = 0; i < segments; i++) {
            const y0 = i * segmentHeight;
            const y1 = y0 + segmentHeight;
            const dir = i % 2 === 0 ? 1 : -1;
            const cp = amplitude * dir;
            d += ` C ${centerX + cp} ${y0 + segmentHeight * 0.33}, ${centerX - cp} ${y0 + segmentHeight * 0.66}, ${centerX} ${y1}`;
        }

        dom.tracerSvg.setAttribute('viewBox', `0 0 ${pageWidth} ${pageHeight}`);
        dom.tracerSvg.style.height = pageHeight + 'px';
        dom.tracerRail.setAttribute('d', d);
        dom.tracerActive.setAttribute('d', d);

        const totalLength = dom.tracerRail.getTotalLength();
        tracer.totalLength = totalLength;

        // Set dash arrays
        dom.tracerActive.style.strokeDasharray = totalLength;
        dom.tracerActive.style.strokeDashoffset = totalLength;

        // ── PRE-COMPUTE POINTS ──
        // Sample positions along the path so we never call getPointAtLength during scroll
        tracer.points = new Array(tracer.pointCount + 1);
        for (let i = 0; i <= tracer.pointCount; i++) {
            const len = (i / tracer.pointCount) * totalLength;
            const pt = dom.tracerRail.getPointAtLength(len);
            tracer.points[i] = { x: pt.x, y: pt.y };
        }

        tracer.ready = true;

        // Show the HTML dot
        if (dom.tracerDotHtml) dom.tracerDotHtml.classList.add('visible');
        // Hide SVG dot (we use the HTML one for performance)
        if (dom.tracerDotSvg) dom.tracerDotSvg.style.display = 'none';

        // Initial draw
        updateTracerImmediate();
    }

    function updateTracerImmediate() {
        if (!tracer.ready) return;

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

        // Update dash offset
        const offset = tracer.totalLength * (1 - progress);
        dom.tracerActive.style.strokeDashoffset = offset;

        // Look up pre-computed dot position (no getPointAtLength!)
        const idx = Math.round(progress * tracer.pointCount);
        const pt = tracer.points[Math.min(idx, tracer.pointCount)];

        if (pt && dom.tracerDotHtml) {
            dom.tracerDotHtml.style.transform =
                `translate3d(${pt.x - 6}px, ${pt.y - 6}px, 0)`;
        }
    }

    /* ======================================================================
       UNIFIED SCROLL HANDLER — rAF-gated, never blocks main thread
       ====================================================================== */
    function initScroll() {
        const heroTitle = !isMobile ? $('.hero-title') : null;
        const heroLabel = !isMobile ? $('.hero-label') : null;

        function onScroll() {
            if (scrollTicking) return;
            scrollTicking = true;

            requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

                // Scroll bar
                if (dom.scrollBar) dom.scrollBar.style.height = progress + '%';

                // Header
                if (dom.header) dom.header.classList.toggle('scrolled', scrollTop > 50);

                // Tracer
                updateTracerImmediate();

                // Hero parallax (only when hero is visible)
                if (heroTitle && scrollTop < window.innerHeight) {
                    const factor = scrollTop / (window.innerHeight * 0.8);
                    heroTitle.style.transform = `translateY(${scrollTop * 0.12}px)`;
                    heroTitle.style.opacity = Math.max(1 - factor, 0);
                }
                if (heroLabel && scrollTop < window.innerHeight) {
                    heroLabel.style.transform = `translateY(${scrollTop * 0.06}px)`;
                }

                scrollTicking = false;
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ======================================================================
       SECTION DOT NAV
       ====================================================================== */
    function initSectionNav() {
        const sections = $$('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        dom.sectionDots.forEach((dot) => {
                            dot.classList.toggle('active', dot.getAttribute('href') === '#' + id);
                        });
                    }
                });
            },
            { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' }
        );
        sections.forEach((s) => observer.observe(s));
    }

    /* ======================================================================
       REVEAL ON SCROLL
       ====================================================================== */
    function initReveal() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
        );
        $$('.reveal-up').forEach((item) => observer.observe(item));
    }

    /* ======================================================================
       COUNTER ANIMATION
       ====================================================================== */
    function initCounters() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        $$('[data-count]').forEach((c) => observer.observe(c));
    }

    function animateCount(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        }
        requestAnimationFrame(tick);
    }

    /* ======================================================================
       MOBILE MENU
       ====================================================================== */
    function initMobileMenu() {
        if (!dom.menuToggle) return;

        dom.menuToggle.addEventListener('click', () => {
            const active = dom.menuToggle.classList.toggle('active');
            dom.mobileMenu.classList.toggle('active', active);
            document.body.style.overflow = active ? 'hidden' : '';
        });

        $$('.mobile-menu-link').forEach((link) => {
            link.addEventListener('click', () => {
                dom.menuToggle.classList.remove('active');
                dom.mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* ======================================================================
       SMOOTH SCROLL
       ====================================================================== */
    function initSmoothScroll() {
        $$('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const id = anchor.getAttribute('href');
                if (id === '#') return;
                const target = $(id);
                if (!target) return;
                const h = dom.header ? dom.header.offsetHeight : 0;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - h - 20,
                    behavior: 'smooth'
                });
            });
        });
    }

    /* ======================================================================
       SERVICE ACCORDION
       ====================================================================== */
    function initServiceAccordion() {
        $$('.service-header').forEach((header) => {
            header.addEventListener('click', () => {
                const item = header.closest('.service-item');
                const wasOpen = item.classList.contains('open');
                $$('.service-item.open').forEach((o) => o.classList.remove('open'));
                if (!wasOpen) item.classList.add('open');
            });
        });
        const first = $('.service-item');
        if (first) first.classList.add('open');
    }

    /* ======================================================================
       RESIZE — debounced, regenerates tracer
       ====================================================================== */
    function initResize() {
        let timer;
        window.addEventListener('resize', () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                isMobile = window.matchMedia('(max-width: 768px)').matches;
                if (!isMobile) initTracer();
            }, 300);
        });
    }

    /* ======================================================================
       INIT
       ====================================================================== */
    function init() {
        cacheDom();
        initPreloader();
        initCursor();
        initMagnetic();
        initScroll();
        initSectionNav();
        initReveal();
        initCounters();
        initMobileMenu();
        initSmoothScroll();
        initServiceAccordion();
        initResize();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
