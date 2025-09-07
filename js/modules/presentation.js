// Belle Presentation - minimal, modular, MIKU style
// ====== BELLE'S ENHANCED PRESENTATION SYSTEM ======
(function () {
  function initBellePresentation() {
    let currentSlide = 0;
    let isAutoPlaying = false;
    let autoPlayInterval = null;

    const slides = document.querySelectorAll(".presentation-slide");
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    const prevBtn = document.querySelector(".prev-slide");
    const nextBtn = document.querySelector(".next-slide");
    const currentSlideIndicator = document.querySelector(".current-slide");
    const progressFill = document.querySelector(".progress-fill");
    const floatingDecorations = document.querySelector(".floating-decorations");

    // Kawaii sounds for interactions (asset-based)
    const playKawaiiSound = (type = "click") => {
      if (type === "prev") SFX.play("ui.back");
      else if (type === "next") SFX.play("ui.move");
      else if (type === "auto") SFX.play("ui.se_sy_24");
      else SFX.play("ui.move");
    };

    // Create floating sparkles and icons
    const createFloatingElements = () => {
      if (!floatingDecorations) return;

      const decorativeIcons = [
        "sparkle",
        "love",
        "innocent",
        "cheering",
        "starUwu",
      ];

      for (let i = 0; i < 8; i++) {
        const element = document.createElement("div");
        element.className = "floating-decoration";

        const iconName =
          decorativeIcons[Math.floor(Math.random() * decorativeIcons.length)];
        element.innerHTML = window.MikuCore.mikuIcon(iconName, "✨");

        element.style.left = /*html*/ `${Math.random() * 100}%`;
        element.style.animationDelay = /*html*/ `${Math.random() * 5}s`;
        element.style.animationDuration = /*html*/ `${3 + Math.random() * 4}s`;

        floatingDecorations.appendChild(element);
      }
    };

    // Update slide display
    const updateSlide = (newSlide, playSound = true) => {
      if (newSlide < 0 || newSlide >= totalSlides) return;

      // Hide current slide
      slides[currentSlide].classList.remove("active");

      // Show new slide
      currentSlide = newSlide;
      slides[currentSlide].classList.add("active");

      // Sync container height to active slide for zero-scroll experience
      const container = document.querySelector(".presentation-content");
      if (container) {
        // measure active after paint
        requestAnimationFrame(() => {
          const active = slides[currentSlide];
          if (active) {
            const targetH = active.offsetHeight;
            // Lock height to avoid layout jump during transition
            container.style.height = targetH + "px";
          }
        });
      }

      // Update indicators
      if (currentSlideIndicator) {
        currentSlideIndicator.textContent = currentSlide + 1;
      }

      // Update progress bar
      if (progressFill) {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressFill.style.width = /*html*/ `${progress}%`;
      }

      // Add sparkle effect to current slide
      const currentSlideEl = slides[currentSlide];
      currentSlideEl.classList.add("slide-sparkle");
      setTimeout(() => {
        currentSlideEl.classList.remove("slide-sparkle");
      }, 1000);

      // Play kawaii sound
      if (playSound) {
        playKawaiiSound("next");
      }

      // Update button states
      if (prevBtn) prevBtn.disabled = currentSlide === 0;
      if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
    };

    // Navigation event handlers
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
          // Stop auto on manual navigation
          if (isAutoPlaying) {
            stopAutoPlay();
            isAutoPlaying = false;
          }
          updateSlide(currentSlide - 1);
          playKawaiiSound("prev");
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentSlide < totalSlides - 1) {
          // Stop auto on manual navigation
          if (isAutoPlaying) {
            stopAutoPlay();
            isAutoPlaying = false;
          }
          updateSlide(currentSlide + 1);
          playKawaiiSound("next");
        }
      });
    }

    // Auto-play functionality
    const startAutoPlay = () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);

      autoPlayInterval = setInterval(() => {
        if (currentSlide < totalSlides - 1) {
          updateSlide(currentSlide + 1, false);
        } else {
          // Loop back to beginning
          updateSlide(0, false);
        }
      }, 4000); // 4 seconds per slide
    };

    const stopAutoPlay = () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    };

    // Removed auto/shuffle/restart UI per design; auto starts on load and stops on manual nav

    // Optimized keyboard navigation with passive listeners
    document.addEventListener(
      "keydown",
      (e) => {
        // Only process if focused on presentation
        if (
          document.querySelector(".belle-presentation:hover") ||
          document.activeElement.closest(".belle-presentation")
        ) {
          switch (e.key) {
            case "ArrowLeft":
              e.preventDefault();
              if (currentSlide > 0) {
                updateSlide(currentSlide - 1);
                playKawaiiSound("prev");
              }
              break;
            case "ArrowRight":
              e.preventDefault();
              if (currentSlide < totalSlides - 1) {
                updateSlide(currentSlide + 1);
                playKawaiiSound("next");
              }
              break;
            // Space no-op (auto UI removed)
            case "Home":
              e.preventDefault();
              updateSlide(0);
              break;
            case "End":
              e.preventDefault();
              updateSlide(totalSlides - 1);
              break;
          }
        }
      },
      { passive: false },
    ); // Need preventDefault

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const presentationEl = document.querySelector(".belle-presentation");
    if (presentationEl) {
      presentationEl.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true },
      );

      presentationEl.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX;

          const swipeThreshold = 50;
          const diff = touchStartX - touchEndX;

          if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSlide < totalSlides - 1) {
              // Swiped left - next slide
              updateSlide(currentSlide + 1);
            } else if (diff < 0 && currentSlide > 0) {
              // Swiped right - previous slide
              updateSlide(currentSlide - 1);
            }
          }
        },
        { passive: true },
      );
    }

    // Initialize
    createFloatingElements();
    // Pre-set container height to first slide
    const firstContainer = document.querySelector(".presentation-content");
    if (firstContainer && slides[0]) {
      firstContainer.style.height = slides[0].offsetHeight + "px";
    }
    updateSlide(0, false);

    // Auto-start presentation after 1.5 seconds
    setTimeout(() => {
      if (!isAutoPlaying) {
        isAutoPlaying = true;
        startAutoPlay();
        playKawaiiSound("auto");
      }
    }, 1500);

    // Pause autoplay if tab is hidden
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          stopAutoPlay();
        } else if (isAutoPlaying && !autoPlayInterval) {
          startAutoPlay();
        }
      },
      { passive: true },
    );

    // Expose controls for navigation hide/show
    window._presentationControl = {
      onShow: () => {
        // Ensure container height syncs after being hidden
        const container = document.querySelector(".presentation-content");
        if (container && slides[currentSlide]) {
          container.style.height = slides[currentSlide].offsetHeight + "px";
        }
        if (isAutoPlaying && !autoPlayInterval) startAutoPlay();
      },
      onHide: () => {
        stopAutoPlay();
      },
    };
  }
  window.initBellePresentation = initBellePresentation;
})();
