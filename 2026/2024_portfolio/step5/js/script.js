/* ==========================================================================
   DESIGNER JH PORTFOLIO - JAVASCRIPT CODE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initLicenceFilter();
    initScrollToTop();
    initJooEyesTracking();
    initGnbScrollSync();
    initSplitChars();
    initScrollReveal();
});

/**
 * Split [data-split-chars] text into per-character reveal spans
 */
function initSplitChars() {
    const containers = document.querySelectorAll('[data-split-chars]');
    if (!containers.length) return;

    containers.forEach((container) => {
        const baseDelay = Number(container.getAttribute('data-reveal-delay') || 0);
        let charIndex = 0;

        const wrapTextNode = (textNode) => {
            const text = textNode.textContent;
            if (!text) return;

            const frag = document.createDocumentFragment();
            for (const char of text) {
                if (char === '\n') continue;

                const span = document.createElement('span');
                span.className = char === ' ' ? 'char char-space' : 'char';
                span.setAttribute('data-reveal', 'fade-up');
                span.setAttribute('data-reveal-delay', String(baseDelay + charIndex));
                span.setAttribute('aria-hidden', 'true');
                span.textContent = char === ' ' ? '\u00A0' : char;
                frag.appendChild(span);
                charIndex += 1;
            }

            textNode.parentNode.replaceChild(frag, textNode);
        };

        const walk = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                wrapTextNode(node);
                return;
            }

            if (node.nodeType !== Node.ELEMENT_NODE || node.tagName === 'BR') return;

            Array.from(node.childNodes).forEach((child) => walk(child));
        };

        const target = container.querySelector('h2') || container;
        const accessibleLabel = target.textContent.replace(/\s+/g, ' ').trim();
        target.setAttribute('aria-label', accessibleLabel);
        Array.from(target.childNodes).forEach((child) => walk(child));

        // Align following block reveals after the last character (char step 35ms, block step 90ms)
        const charDelayStep = 35;
        const delayStep = 90;
        const lastCharTime = (baseDelay + Math.max(charIndex - 1, 0)) * charDelayStep;
        const followBaseIndex = Math.ceil(lastCharTime / delayStep) + 1;
        let followOffset = 0;

        let sibling = container.nextElementSibling;
        while (sibling) {
            if (sibling.hasAttribute('data-reveal')) {
                sibling.setAttribute('data-reveal-delay', String(followBaseIndex + followOffset));
                followOffset += 2;
            }
            sibling = sibling.nextElementSibling;
        }

        container.removeAttribute('data-split-chars');
        container.removeAttribute('data-reveal-delay');
    });
}

/**
 * 1. Mobile Hamburger Menu Toggle
 */
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle-btn');
    const gnb = document.querySelector('.gnb');
    const menuLinks = document.querySelectorAll('.gnb .menu-item, .dropdown-link');

    if (toggleBtn && gnb) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            gnb.classList.toggle('open');
            toggleBtn.classList.toggle('active');
            
            // Toggle hamburger animation state
            const spans = toggleBtn.querySelectorAll('span');
            if (gnb.classList.contains('open')) {
                toggleBtn.setAttribute('aria-label', '메뉴 닫기');
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                toggleBtn.setAttribute('aria-label', '메뉴 열기');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (gnb.classList.contains('open') && !gnb.contains(e.target) && !toggleBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu when clicking links
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    function closeMenu() {
        gnb.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-label', '메뉴 열기');
        const spans = toggleBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

/**
 * 2. Licence Grid Category Filtering
 */
function initLicenceFilter() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.licence-card-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to current
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '';
                    card.style.transform = '';
                    requestAnimationFrame(() => {
                        card.classList.add('is-revealed');
                    });
                } else {
                    card.classList.remove('is-revealed');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                        card.style.opacity = '';
                        card.style.transform = '';
                    }, 100);
                }
            });
        });
    });
}

/**
 * 3. Back to Top Button Behavior
 */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-to-top');

    if (scrollTopBtn) {
        // Show/hide based on scroll offset
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Click handler to smooth scroll to top
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 4. Interactive "JOO" Face Eyes Tracking Cursor Movement
 * Desktop (>1200px): mouse tracking / Tablet & Mobile: CSS auto animation
 */
function initJooEyesTracking() {
    const jooFace = document.getElementById('joo-face');
    const jooEyes = document.querySelector('.joo-eyes');
    const desktopQuery = window.matchMedia('(min-width: 1201px)');

    if (!jooFace || !jooEyes) return;

    const onMouseMove = (e) => {
        const rect = jooFace.getBoundingClientRect();
        const faceCenterX = rect.left + rect.width / 2;
        const faceCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - faceCenterX;
        const deltaY = e.clientY - faceCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const maxOffset = 30;
        const angle = Math.atan2(deltaY, deltaX);
        const offsetX = Math.cos(angle) * Math.min(maxOffset, distance * 0.03);
        const offsetY = Math.sin(angle) * Math.min(maxOffset, distance * 0.03);

        jooEyes.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    const syncEyesMode = () => {
        if (desktopQuery.matches) {
            document.addEventListener('mousemove', onMouseMove);
        } else {
            document.removeEventListener('mousemove', onMouseMove);
            // Clear inline transform so CSS auto animation can take over
            jooEyes.style.transform = '';
        }
    };

    syncEyesMode();
    desktopQuery.addEventListener('change', syncEyesMode);
}

/**
 * 5. Sync GNB Active State with Page Scroll Sections
 */
function initGnbScrollSync() {
    const sections = document.querySelectorAll('section[id]');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    const resumeBtn = document.getElementById('menu-resume-btn');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset header height
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            // Update dropdown links
            dropdownLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
            
            // Resume item is active if we are on visual, introduce, licence, or education
            const resumeSections = ['visual', 'introduce', 'licence', 'education'];
            if (resumeBtn) {
                if (resumeSections.includes(currentSectionId)) {
                    resumeBtn.classList.add('active');
                } else {
                    resumeBtn.classList.remove('active');
                }
            }
        }
    });
}

/**
 * 6. Scroll Reveal Interactions
 * - Animate only while scrolling downward
 * - Keep elements visible while scrolling upward
 * - Silently reset only after leaving the viewport, so next down-scroll replays
 */
function initScrollReveal() {
    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!revealEls.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealEls.forEach((el) => el.classList.add('is-revealed'));
        return;
    }

    const delayStep = 90;
    const charDelayStep = 35;
    const visibleEls = new Set();
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';
    let ticking = false;

    revealEls.forEach((el) => {
        const delayIndex = Number(el.getAttribute('data-reveal-delay') || 0);
        const step = el.classList.contains('char') ? charDelayStep : delayStep;
        el.style.setProperty('--reveal-delay', `${delayIndex * step}ms`);
    });

    const revealElement = (el) => {
        if (el.classList.contains('is-revealed')) return;
        el.classList.remove('is-resetting');
        void el.offsetWidth;
        el.classList.add('is-revealed');
    };

    const showImmediate = (el) => {
        // Show without animation (used while scrolling up)
        if (el.classList.contains('is-revealed')) return;
        el.classList.add('is-resetting');
        el.classList.add('is-revealed');
        void el.offsetWidth;
        el.classList.remove('is-resetting');
    };

    const resetElementSilent = (el) => {
        if (!el.classList.contains('is-revealed')) return;
        // Instant hide only after leaving viewport (user never sees reverse motion)
        el.classList.add('is-resetting');
        el.classList.remove('is-revealed');
        void el.offsetWidth;
        el.classList.remove('is-resetting');
    };

    const isInRevealZone = (el) => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < viewH * 0.92 && rect.bottom > viewH * 0.08;
    };

    const revealVisibleOnDownScroll = () => {
        visibleEls.forEach((el) => {
            if (isInRevealZone(el)) revealElement(el);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const el = entry.target;

                if (entry.isIntersecting) {
                    visibleEls.add(el);
                    if (scrollDirection === 'down') {
                        // Down-scroll: play entrance animation
                        revealElement(el);
                    } else {
                        // Up-scroll: keep/show visible, no animation
                        showImmediate(el);
                    }
                    return;
                }

                visibleEls.delete(el);
                // Reset only off-screen so the next down-scroll can replay
                resetElementSilent(el);
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -6% 0px'
        }
    );

    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const currentY = window.scrollY;
            if (currentY > lastScrollY + 1) {
                scrollDirection = 'down';
                revealVisibleOnDownScroll();
            } else if (currentY < lastScrollY - 1) {
                scrollDirection = 'up';
                // Visible elements stay as-is while scrolling up
            }
            lastScrollY = currentY;
            ticking = false;
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    scrollDirection = 'down';
    revealEls.forEach((el) => observer.observe(el));
    requestAnimationFrame(() => {
        revealEls.forEach((el) => {
            if (isInRevealZone(el)) {
                visibleEls.add(el);
                revealElement(el);
            }
        });
    });
}
