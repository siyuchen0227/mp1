/* Your JS here. */

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
let isScrolling = false;

document.addEventListener("DOMContentLoaded", function () {
  initializeMobileMenu();
  initializeModals();
  initializeCarousel();
  initializeSmoothScrolling();

  // Initialize first slide
  if (slides.length > 0) {
    slides[0].classList.add("active");
  }
});

// Mobile Menu Functionality
function initializeMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    // Toggle mobile menu
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !hamburger.contains(event.target) &&
        !navMenu.contains(event.target)
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
}

// Open Modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
    // Small delay to ensure display is set before adding class
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
  }
}

// Close Modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
    modal.style.display = "none";
    setTimeout(() => {}, 100); // Match animation duration
  }
}

// Close All Modals
function closeAllModals() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.classList.remove("show");
    modal.style.display = "none";
  });
}

// Modal Functionality
function initializeModals() {
  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
}

// Carousel Functionality
function initializeCarousel() {
  // Auto-play carousel
  setInterval(function () {
    changeSlide(1);
  }, 5000);
}

// Change carousel slide
function changeSlide(direction) {
  if (slides.length === 0) return;

  // Remove active class from current slide
  slides[currentSlide].classList.remove("active");

  // Calculate next slide index
  currentSlide += direction;

  // Handle wrap-around
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  // Add active class to new slide
  slides[currentSlide].classList.add("active");
}

// Keyboard Navigation for Carousel
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    changeSlide(-1);
  } else if (event.key === "ArrowRight") {
    changeSlide(1);
  }
});

// Simple scroll handling - easier to understand
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Handle navbar resizing
  handleNavbarScroll(navbar);

  // Update active navigation link
  updateActiveNavLink(navLinks, sections);
});

// Contact Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector("textarea").value;

      // Simple validation
      if (name && email && message) {
        alert("Thank you for your message! I will get back to you soon.");
        this.reset();
        closeModal("contactModal");
      } else {
        alert("Please fill in all fields.");
      }
    });
  }
});

// Handle navbar resizing and styling on scroll
function handleNavbarScroll(navbar) {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Position Indicator - Update active nav link based on scroll position
function updateActiveNavLink(navLinks, sections) {
    const scrollPosition = window.scrollY + 100; // Offset for navbar height
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Find current section with more precise calculation
    let currentSection = '';
    let closestSection = '';
    let minDistance = Infinity;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Check if scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
            return;
        }
        
        // Calculate distance to section for closest match
        const distanceToTop = Math.abs(scrollPosition - sectionTop);
        const distanceToBottom = Math.abs(scrollPosition - sectionBottom);
        const minSectionDistance = Math.min(distanceToTop, distanceToBottom);
        
        if (minSectionDistance < minDistance) {
            minDistance = minSectionDistance;
            closestSection = section.getAttribute('id');
        }
    });
    
    // If no exact match found, use closest section
    if (!currentSection && closestSection) {
        currentSection = closestSection;
    }
    
    // Handle edge case for bottom of page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentSection = sections[sections.length - 1].getAttribute('id');
    }
    
    // Add active class to current section's nav link
    if (currentSection) {
        const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const navbarHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Portfolio Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  // get all portfolio cards and modal elements
  const portfolioCards = document.querySelectorAll(".portfolio_list-card");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const captionText = document.getElementById("imageCaption");
  const closeModal = document.getElementById("closeModal");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  let currentImageIndex = 0;
  const images = [];

  // get all portfolio cards and modal elements
  portfolioCards.forEach((card, index) => {
    const img = card.querySelector("img");
    images.push({
      src: img.src,
      alt: img.alt,
    });

    // add click event to each card

    card.addEventListener("click", () => {
      openModal(index);
    });
  });

  // open modal

  function openModal(index) {
    currentImageIndex = index;
    updateModalContent();
    modal.style.display = "block";

    // add active class to trigger animation
    setTimeout(() => {
      modal.classList.add("active");
    }, 10);

    // disable page scroll when modal is open
    document.body.style.overflow = "hidden";
  }

  // close modal
  function closeModalFunc() {
    modal.classList.remove("active");

    // wait for animation to complete before hiding modal
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
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
  closeModal.addEventListener("click", closeModalFunc);
  nextButton.addEventListener("click", nextImage);
  prevButton.addEventListener("click", prevImage);

  // click outside modal content to close

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "Escape") {
        closeModalFunc();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    }
  });

  // touch swipe support (mobile devices)
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener("touchend", (e) => {
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
