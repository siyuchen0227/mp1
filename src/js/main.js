/* Your JS here. */

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
let isScrolling = false;


document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeModals();
    initializeCarousel();


     // Initialize first slide
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

   
})

// Mobile Menu Functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}


// Open Modal
 function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        // Small delay to ensure display is set before adding class
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}


// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        setTimeout(() => {
          
        }, 100); // Match animation duration
    }
}

// Close All Modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
        modal.style.display = 'none';
    });
}

// Modal Functionality
function initializeModals() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}


// Carousel Functionality
function initializeCarousel() {
    // Auto-play carousel
    setInterval(function() {
        changeSlide(1);
    }, 5000);
}

// Change carousel slide
function changeSlide(direction) {
    if (slides.length === 0) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Calculate next slide index
    currentSlide += direction;
    
    // Handle wrap-around
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
}



// 在文件末尾添加
window.openModal = openModal;
window.closeModal = closeModal;
window.closeAllModals = closeAllModals;
window.changeSlide = changeSlide;


