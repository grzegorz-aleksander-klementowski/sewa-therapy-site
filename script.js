// Generate the floating thought fragments and manage intro reveal
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const thoughtsContainer = intro.querySelector(".thoughts");
  const chaosLayers = intro.querySelectorAll(".chaos-bg");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const rootStyles = getComputedStyle(document.documentElement);

  const chaosImages = [
    "https://images.unsplash.com/photo-1670702389707-e20984fab9f6?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1663439625549-24c040c2f4d4?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1667391187178-4668539fca79?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1671656333452-7369599f92ee?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1678585056636-323de5098c58?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1608303309759-08b7d46c7b5a?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1583498653646-a88ecfd0d868?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483519173755-be893fab1f46?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXllfGVufDB8fDB8fHww"
  ];

  chaosImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  const parsedChaosInterval = parseInt(
    rootStyles.getPropertyValue("--chaos-interval").trim(),
    10
  );
  const chaosInterval = Number.isFinite(parsedChaosInterval)
    ? parsedChaosInterval
    : 500;

  let chaosTimer = null;
  let chaosImageIndex = 0;
  let visibleChaosLayerIndex = 0;

  const setChaosBackground = (layer, src) => {
    if (layer) {
      layer.style.backgroundImage = `url("${src}")`;
    }
  };

  const startChaosSlideshow = () => {
    if (chaosLayers.length < 2 || chaosImages.length === 0) {
      return;
    }

    chaosLayers.forEach((layer) => layer.classList.remove("is-visible"));
    chaosImageIndex = 0;
    visibleChaosLayerIndex = 0;

    setChaosBackground(chaosLayers[0], chaosImages[chaosImageIndex]);
    chaosLayers[0].classList.add("is-visible");
    chaosImageIndex = (chaosImageIndex + 1) % chaosImages.length;

    if (motionQuery.matches) {
      return;
    }

    setChaosBackground(chaosLayers[1], chaosImages[chaosImageIndex]);
    chaosLayers[1].classList.remove("is-visible");
    chaosImageIndex = (chaosImageIndex + 1) % chaosImages.length;

    if (chaosTimer) {
      clearInterval(chaosTimer);
    }

    chaosTimer = setInterval(() => {
      const nextLayerIndex = visibleChaosLayerIndex === 0 ? 1 : 0;
      const incomingLayer = chaosLayers[nextLayerIndex];
      const outgoingLayer = chaosLayers[visibleChaosLayerIndex];

      setChaosBackground(incomingLayer, chaosImages[chaosImageIndex]);
      incomingLayer.classList.add("is-visible");
      outgoingLayer.classList.remove("is-visible");

      visibleChaosLayerIndex = nextLayerIndex;
      chaosImageIndex = (chaosImageIndex + 1) % chaosImages.length;
    }, chaosInterval);
  };

  const stopChaosSlideshow = () => {
    if (chaosTimer) {
      clearInterval(chaosTimer);
      chaosTimer = null;
    }
    chaosLayers.forEach((layer) => layer.classList.remove("is-visible"));
  };

  const thoughtPhrases = [
    "I'm not good enough",
    "I feel so tired",
    "No one really sees me",
    "I'm afraid",
    "What if I fail",
    "Will this ever change",
    "I hate myself",
    "I can't slow down",
    "Hold it together",
    "Too much",
    "Not enough",
    "Breathe",
    "Who am I",
    "Why now",
    "Stay small"
  ];

  const renderThoughts = () => {
    thoughtPhrases.forEach((phrase) => {
      const span = document.createElement("span");
      span.textContent = phrase;
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `${Math.random() * 100}%`;
      span.style.animationDuration = `${8 + Math.random() * 6}s`;
      span.style.animationDelay = `${Math.random() * -8}s`;
      span.style.opacity = `${0.4 + Math.random() * 0.5}`;
      span.style.fontSize = `${0.7 + Math.random() * 1.3}rem`;
      thoughtsContainer.appendChild(span);
    });
  };

  if (motionQuery.matches) {
    thoughtsContainer.style.opacity = 0.25;
    const span = document.createElement("span");
    span.textContent = "You are safe.";
    span.style.position = "absolute";
    span.style.left = "50%";
    span.style.top = "50%";
    span.style.transform = "translate(-50%, -50%)";
    thoughtsContainer.appendChild(span);
  } else {
    renderThoughts();
  }

  startChaosSlideshow();

  const revealDelay = motionQuery.matches ? 1600 : 4200;
  setTimeout(() => {
    stopChaosSlideshow();
    intro.classList.add("reveal");
    setTimeout(() => {
      document.body.classList.add("light-phase");
    }, 300);
  }, revealDelay);

  // Cycle the healing gallery visuals
  const galleryImages = document.querySelectorAll(".gallery-image");
  let galleryIndex = 0;
  if (galleryImages.length > 1 && !motionQuery.matches) {
    setInterval(() => {
      const nextIndex = (galleryIndex + 1) % galleryImages.length;
      galleryImages[galleryIndex].classList.remove("active");
      galleryImages[nextIndex].classList.add("active");
      galleryIndex = nextIndex;
    }, 6500);
  }

  // Reveal content blocks gently on scroll
  const revealItems = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("in-view"));
  }
});
