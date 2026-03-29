document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
       1. MOBILE NAVIGATION
       ========================================= */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");

      // Hamburger Animation
      hamburger.classList.toggle("toggle");
    });
  }

  /* =========================================
       2. STICKY NAVBAR SCROLL EFFECT
       ========================================= */
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.style.padding = "0.5rem 0";
    } else {
      navbar.style.padding = "1rem 0";
    }
  });

  /* =========================================
       3. TESTIMONIALS SLIDER
       ========================================= */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (slides.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      slides[index].classList.add("active");
      dots[index].classList.add("active");
    }

    // Auto slide
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);

    // Manual navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }

  /* =========================================
       4. PROJECT FILTERING
       ========================================= */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all
        filterBtns.forEach((b) => b.classList.remove("active"));
        // Add active to clicked
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        projectItems.forEach((item) => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.style.display = "block";
            // Add animation
            item.style.opacity = "0";
            setTimeout(() => (item.style.opacity = "1"), 50);
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  /* =========================================
       5. LIGHTBOX MODAL
       ========================================= */
  const modal = document.getElementById("lightboxModal");
  const modalImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementsByClassName("close-modal")[0];
  const projectImages = document.querySelectorAll(".project-item img");

  if (modal) {
    projectImages.forEach((img) => {
      img.addEventListener("click", (e) => {
        // If clicking inside a project item
        const parent = e.target.closest(".project-item");
        if (parent) {
          modal.style.display = "block";
          modalImg.src = e.target.src;
        }
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  /* =========================================
       6. FORM VALIDATION
       ========================================= */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Simple validation logic
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      // Reset errors
      document
        .querySelectorAll(".error-msg")
        .forEach((el) => (el.style.display = "none"));
      document
        .querySelectorAll("input, textarea")
        .forEach((el) => (el.style.borderColor = "#ccc"));

      if (name.value.trim() === "") {
        showError(name, "Name is required");
        isValid = false;
      }

      if (!validateEmail(email.value)) {
        showError(email, "Valid email is required");
        isValid = false;
      }

      if (message.value.trim() === "") {
        showError(message, "Message is required");
        isValid = false;
      }

      if (isValid) {
        // Simulate form submission
        const btn = contactForm.querySelector("button");
        const originalText = btn.innerText;
        btn.innerText = "Sending...";
        btn.disabled = true;

        setTimeout(() => {
          alert("Thank you! Your message has been sent.");
          contactForm.reset();
          btn.innerText = originalText;
          btn.disabled = false;
        }, 1500);
      }
    });
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector(".error-msg");
    errorDisplay.innerText = message;
    errorDisplay.style.display = "block";
    input.style.borderColor = "#e74c3c";
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
