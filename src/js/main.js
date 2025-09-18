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




// Portfolio Modal Functionality
 document.addEventListener('DOMContentLoaded', function() {
            // get all portfolio cards and modal elements
            const portfolioCards = document.querySelectorAll('.portfolio_list-card');
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            const captionText = document.getElementById('imageCaption');
            const closeModal = document.getElementById('closeModal');
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');
            
            let currentImageIndex = 0;
            const images = [];
            
            // get all portfolio cards and modal elements
            portfolioCards.forEach((card, index) => {
                const img = card.querySelector('img');
                images.push({
                    src: img.src,
                    alt: img.alt
                });
                
                // add click event to each card

                card.addEventListener('click', () => {
                    openModal(index);
                });
            });
            
            // open modal

            function openModal(index) {
                currentImageIndex = index;
                updateModalContent();
                modal.style.display = 'block';
                
                // add active class to trigger animation
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                
                // disable page scroll when modal is open
                document.body.style.overflow = 'hidden';
            }
            
            // close modal
            function closeModalFunc() {
                modal.classList.remove('active');
                
                // wait for animation to complete before hiding modal
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
            
            // update modal content
            function updateModalContent() {
                const currentImage = images[currentImageIndex];
                modalImage.src = currentImage.src;
                captionText.innerHTML = currentImage.alt;
            }
            
            // switch to next image
            
            function nextImage() {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateModalContent();
            }
            
            //  switch to previous image
            function prevImage() {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateModalContent();
            }
            
            // event listeners
            closeModal.addEventListener('click', closeModalFunc);
            nextButton.addEventListener('click', nextImage);
            prevButton.addEventListener('click', prevImage);
            
            // click outside modal content to close 
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModalFunc();
                }
            });
            
            // keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (modal.style.display === 'block') {
                    if (e.key === 'Escape') {
                        closeModalFunc();
                    } else if (e.key === 'ArrowRight') {
                        nextImage();
                    } else if (e.key === 'ArrowLeft') {
                        prevImage();
                    }
                }
            });
            
            // touch swipe support (mobile devices)
            let touchStartX = 0;
            let touchEndX = 0;
            
            modal.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            modal.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const minSwipeDistance = 50;
                
                if (touchEndX < touchStartX && touchStartX - touchEndX > minSwipeDistance) {
                    nextImage();
                }
                
                if (touchEndX > touchStartX && touchEndX - touchStartX > minSwipeDistance) {
                    prevImage();
                }
            }
        });

// Expose functions to global scope for inline HTML usage
window.openModal = openModal;
window.closeModal = closeModal;
window.closeAllModals = closeAllModals;
window.changeSlide = changeSlide;


