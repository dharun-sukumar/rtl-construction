// Main JavaScript functionality for BuildCraft website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initRTLToggle();
    initMobileMenu();
    initScrollAnimations();
    initProjectFilters();
    initFAQToggle();
    initContactForm();
    initDashboard();
    initCountdown();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
});

// RTL Toggle Functionality
function initRTLToggle() {
    const rtlToggle = document.getElementById('rtlToggle');

    if (rtlToggle) {
        rtlToggle.addEventListener('click', function() {
            const root = document.documentElement;
            const currentDir = root.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            root.setAttribute('dir', newDir);
            updateNavbarFlex(newDir);
            // Store preference in localStorage
            localStorage.setItem('textDirection', newDir);
            // Add visual feedback
            rtlToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                rtlToggle.style.transform = 'scale(1)';
            }, 150);
        });
        // Load saved preference
        const savedDir = localStorage.getItem('textDirection');
        if (savedDir) {
            document.documentElement.setAttribute('dir', savedDir);
            updateNavbarFlex(savedDir);
        }
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('mobile-menu-enter');
                setTimeout(() => {
                    mobileMenu.classList.remove('mobile-menu-enter');
                    mobileMenu.classList.add('mobile-menu-enter-active');
                }, 10);
                initMobileRTLToggle(); // Ensure RTL toggle is initialized when menu is shown
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu-enter-active');
            }
            
            // Toggle hamburger icon animation
            const icon = mobileMenuBtn.querySelector('svg');
            icon.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
        });
    }
}

// Mobile RTL Toggle
function initMobileRTLToggle() {
    const rtlToggleMobile = document.getElementById('rtlToggleMobile');

    if (rtlToggleMobile) {
        rtlToggleMobile.addEventListener('click', function() {
            const root = document.documentElement;
            const currentDir = root.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            root.setAttribute('dir', newDir);
            updateNavbarFlex(newDir);
            // Store preference in localStorage
            localStorage.setItem('textDirection', newDir);
            // Add visual feedback
            rtlToggleMobile.style.transform = 'scale(0.95)';
            setTimeout(() => {
                rtlToggleMobile.style.transform = 'scale(1)';
            }, 150);
            // Close the mobile menu after toggling RTL
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
            // Rotate the hamburger menu icon back to its original position
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('svg');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animateElements = document.querySelectorAll('.card-hover, .bg-white, .bg-gray-50');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Project Filter Functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length === 0 || projectItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
            });
            
            this.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300');
            this.classList.add('active', 'bg-primary', 'text-white');
            
            // Filter projects with animation
            projectItems.forEach(item => {
                const categories = item.classList;
                const shouldShow = filter === 'all' || categories.contains(filter);
                
                if (shouldShow) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    }, 150);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// FAQ Toggle Functionality
function initFAQToggle() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('span:last-child');
            
            if (content.classList.contains('hidden')) {
                // Open
                content.classList.remove('hidden');
                content.style.maxHeight = '0px';
                content.style.overflow = 'hidden';
                content.style.transition = 'max-height 0.3s ease-out';
                
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }, 10);
                
                icon.textContent = '−';
                icon.style.transform = 'rotate(180deg)';
            } else {
                // Close
                content.style.maxHeight = '0px';
                icon.textContent = '+';
                icon.style.transform = 'rotate(0deg)';
                
                setTimeout(() => {
                    content.classList.add('hidden');
                }, 300);
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.classList.remove('bg-primary', 'hover:bg-blue-700');
                submitButton.classList.add('bg-green-600');
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('bg-green-600');
                    submitButton.classList.add('bg-primary', 'hover:bg-blue-700');
                }, 3000);
            }, 2000);
        });
    }
}

// Admin Dashboard Functionality
function initDashboard() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    
    if (navLinks.length === 0) return;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const section = this.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active', 'bg-primary');
            });
            this.classList.add('active', 'bg-primary');
            
            // Show/hide content sections
            contentSections.forEach(contentSection => {
                if (contentSection.id === `${section}-section`) {
                    contentSection.classList.remove('hidden');
                } else {
                    contentSection.classList.add('hidden');
                }
            });
            
            // Update page title
            if (pageTitle) {
                const titles = {
                    'dashboard': 'Dashboard Overview',
                    'projects': 'Project Management',
                    'clients': 'Client Management', 
                    'team': 'Team Management',
                    'finances': 'Financial Overview',
                    'settings': 'Settings'
                };
                pageTitle.textContent = titles[section] || 'Dashboard';
            }
        });
    });
}

// Coming Soon Countdown
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl) return;
    
    // Set target date (30 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '0';
            minutesEl.textContent = '0';
            secondsEl.textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Animate number changes
        animateNumber(daysEl, days);
        animateNumber(hoursEl, hours);
        animateNumber(minutesEl, minutes);
        animateNumber(secondsEl, seconds);
    }
    
    function animateNumber(element, newValue) {
        const currentValue = parseInt(element.textContent);
        if (currentValue !== newValue) {
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.textContent = newValue.toString().padStart(2, '0');
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility Functions

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll event listener with debounce
window.addEventListener('scroll', debounce(function() {
    // Handle scroll-based animations
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.parallax');
    
    parallax.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10));

// Add resize event listener
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    const isMobile = window.innerWidth < 768;
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!isMobile && mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}, 250));

// Page Loading Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Add click ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button') || e.target.matches('.btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add CSS for ripple effect
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s linear';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS animation for ripple
const style = document.createElement('style');
style.textContent = `
@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Placeholder function for updateNavbarFlex
function updateNavbarFlex(direction) {
    // Add logic here if needed to update the navbar based on the direction
    console.log(`Navbar updated for direction: ${direction}`);
}