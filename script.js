// ===== NEON WEBSITE JAVASCRIPT =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== MAIN INITIALIZATION =====
function initializeWebsite() {
    handleScrollEffects();
    handleSmoothScrolling();
    handleButtonInteractions();
    handleMobileMenu();
    handleAnimations();
    handleKeyboardNavigation();
}

// ===== SCROLL EFFECTS =====
function handleScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;
        
        // Add scrolled class when scrolling down
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// ===== SMOOTH SCROLLING =====
function handleSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== BUTTON INTERACTIONS =====
function handleButtonInteractions() {
    // Play Trailer buttons
    document.querySelectorAll('.btn').forEach(button => {
        if (button.textContent.includes('Play Trailer')) {
            button.addEventListener('click', function() {
                handleTrailerPlay(this);
            });
        }
        
        if (button.textContent.includes('Add to Wishlist')) {
            button.addEventListener('click', function() {
                handleWishlistAdd(this);
            });
        }
        
        if (button.textContent.includes('Pre-Order Now')) {
            button.addEventListener('click', function() {
                handlePreOrder(this);
            });
        }
    });
}

// ===== TRAILER FUNCTIONALITY =====
function handleTrailerPlay(button) {
    // Add loading state
    button.classList.add('loading');
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    
    // Simulate trailer loading
    setTimeout(() => {
        button.textContent = '▶ Playing...';
        button.style.background = '#28a745';
        button.style.borderColor = '#28a745';
        button.style.color = '#ffffff';
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.borderColor = '';
            button.style.color = '';
            button.classList.remove('loading');
        }, 3000);
    }, 1000);
    
    // Analytics tracking (placeholder)
    trackEvent('trailer_play', {
        movie: getMovieTitle(button)
    });
}

// ===== WISHLIST FUNCTIONALITY =====
function handleWishlistAdd(button) {
    const originalText = button.textContent;
    button.textContent = '✓ Added!';
    button.style.background = '#28a745';
    button.style.borderColor = '#28a745';
    button.style.color = '#ffffff';
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.borderColor = '';
        button.style.color = '';
    }, 2000);
    
    // Analytics tracking (placeholder)
    trackEvent('wishlist_add', {
        movie: getMovieTitle(button)
    });
}

// ===== PRE-ORDER FUNCTIONALITY =====
function handlePreOrder(button) {
    const originalText = button.textContent;
    button.textContent = 'Added to Cart!';
    button.style.background = '#007bff';
    button.style.borderColor = '#007bff';
    button.style.color = '#ffffff';
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.borderColor = '';
        button.style.color = '';
    }, 2000);
    
    // Analytics tracking (placeholder)
    trackEvent('preorder_click', {
        product: getProductName(button)
    });
}

// ===== MOBILE MENU =====
function handleMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
            this.textContent = navMenu.classList.contains('mobile-open') ? '✕' : '☰';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-open');
                mobileMenuBtn.textContent = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('mobile-open');
                mobileMenuBtn.textContent = '☰';
            }
        });
    }
}

// ===== ANIMATIONS =====
function handleAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.section, .product-card, .movie-card, .award-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Parallax effect for hero section (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }, { passive: true });
}

// ===== KEYBOARD NAVIGATION =====
function handleKeyboardNavigation() {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navMenu && navMenu.classList.contains('mobile-open')) {
                navMenu.classList.remove('mobile-open');
                if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
            }
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ===== UTILITY FUNCTIONS =====
function getMovieTitle(button) {
    const movieCard = button.closest('.movie-card, .featured-movie');
    const titleElement = movieCard ? movieCard.querySelector('.movie-title, .featured-title') : null;
    return titleElement ? titleElement.textContent : 'Unknown';
}

function getProductName(button) {
    const productCard = button.closest('.product-card');
    const nameElement = productCard ? productCard.querySelector('.product-name') : null;
    return nameElement ? nameElement.textContent : 'Unknown';
}

// ===== ANALYTICS TRACKING =====
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log(`Event: ${eventName}`, properties);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, properties);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, properties);
    
    // Example: Custom analytics
    // analytics.track(eventName, properties);
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can send error reports to your logging service here
});

// ===== MOBILE MENU STYLES (CSS-in-JS for dynamic behavior) =====
function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu.mobile-open {
                display: flex !important;
                position: fixed;
                top: 60px;
                left: 0;
                right: 0;
                background: rgba(10, 10, 10, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                z-index: 999;
            }
            
            .nav-menu.mobile-open .nav-link {
                padding: 12px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                text-align: center;
            }
            
            .nav-menu.mobile-open .nav-link:last-child {
                border-bottom: none;
            }
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid rgba(255, 255, 255, 0.8) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

// Add mobile menu styles
addMobileMenuStyles();

// ===== LAZY LOADING (if needed for images) =====
function handleLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== PRELOADER (optional) =====
function handlePreloader() {
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });
}

// ===== BROWSER COMPATIBILITY =====
function checkBrowserCompatibility() {
    // Check for required features
    const requiredFeatures = [
        'IntersectionObserver',
        'requestAnimationFrame',
        'addEventListener'
    ];
    
    const unsupportedFeatures = requiredFeatures.filter(feature => !(feature in window));
    
    if (unsupportedFeatures.length > 0) {
        console.warn('Unsupported features detected:', unsupportedFeatures);
        // You could show a browser update message here
    }
}

// Run compatibility check
checkBrowserCompatibility();

// ===== DEVELOPMENT HELPERS =====
if (process && process.env && process.env.NODE_ENV === 'development') {
    // Development only code
    console.log('NEON Website - Development Mode');
    
    // Add development helpers
    window.NEON_DEBUG = {
        trackEvent,
        getMovieTitle,
        getProductName
    };
}
