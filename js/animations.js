class PageAnimations {
  constructor() {
    this.init();
  }

  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => observer.observe(card));
  }

  /**
   * Utility: Stagger animation delays
   * @param {NodeList} elements - Elements to stagger
   * @param {number} baseDelay - Base delay in milliseconds
   */
  static staggerElements(elements, baseDelay = 100) {
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * baseDelay}ms`;
    });
  }
}
