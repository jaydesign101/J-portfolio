/* ==========================================================================
   DESIGNER JH PORTFOLIO - JAVASCRIPT CODE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initLicenceFilter();
    initScrollToTop();
    initJooEyesTracking();
    initGnbScrollSync();
});

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
                    // Show matching cards with transition
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide non-matching cards
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 100); // match CSS transition duration
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
 */
function initJooEyesTracking() {
    const jooFace = document.getElementById('joo-face');
    const jooEyes = document.querySelector('.joo-eyes');

    if (jooFace && jooEyes) {
        document.addEventListener('mousemove', (e) => {
            const rect = jooFace.getBoundingClientRect();
            // Center position of the eye container on screen
            const faceCenterX = rect.left + rect.width / 2;
            const faceCenterY = rect.top + rect.height / 2;
            
            // Distance from cursor to center
            const deltaX = e.clientX - faceCenterX;
            const deltaY = e.clientY - faceCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // Max offset distance (eyes won't go out of eye sockets)
            const maxOffset = 30; 
            
            // Calc angle
            const angle = Math.atan2(deltaY, deltaX);
            
            // Offset coordinates based on distance (closer = less shift)
            const offsetX = Math.cos(angle) * Math.min(maxOffset, distance * 0.03);
            const offsetY = Math.sin(angle) * Math.min(maxOffset, distance * 0.03);
            
            // Apply slight translate transform to simulate pupil movement
            jooEyes.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    }
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
