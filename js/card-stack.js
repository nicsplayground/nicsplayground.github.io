class CardStack {
  constructor(stackElement) {
    this.stack = stackElement;
    this.cards = Array.from(stackElement.querySelectorAll('.card'));
    this.activeCard = null;
    this.isModalOpen = false;

    this.isMobile = window.innerWidth <= 768;
    this.activeCardIndex = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.minSwipeDistance = 50;
  }

  init() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
      if (this.isMobile) {
        this.setActiveCard(this.activeCardIndex);
      }
    });

    if (this.isMobile) {
      this.stack.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
      this.stack.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

      this.setActiveCard(0);
    } else {
      this.stack.addEventListener('mouseenter', () => this.fanOut());
      this.stack.addEventListener('mouseleave', () => this.fanIn());

      this.cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => this.handleCardHover(e));
        card.addEventListener('mouseleave', (e) => this.handleCardLeave(e));
      });
    }

    this.cards.forEach(card => {
      card.addEventListener('click', (e) => this.handleCardClick(e));
    });
  }

  fanOut() {
    if (!this.isModalOpen) {
      this.stack.classList.add('fan-out');
    }
  }

  fanIn() {
    if (!this.isModalOpen) {
      this.stack.classList.remove('fan-out');
      this.cards.forEach(card => card.classList.remove('hovered'));
    }
  }

  handleCardHover(e) {
    if (!this.isModalOpen) {
      this.cards.forEach(card => card.classList.remove('hovered'));
      e.currentTarget.classList.add('hovered');
    }
  }

  handleCardLeave(e) {
    if (!this.isModalOpen) {
      e.currentTarget.classList.remove('hovered');
    }
  }

  handleCardClick(e) {
    const card = e.currentTarget;
    const cardIndex = parseInt(card.getAttribute('data-card-index'));

    if (this.isMobile && cardIndex !== this.activeCardIndex) {
      this.setActiveCard(cardIndex);
      return;
    }

    this.activeCard = card;
    this.openModal(card);
  }

  openModal(card) {
    const imageSrc = card.querySelector('.card-image').src;
    const title = card.querySelector('.card-title-center').textContent;
    const description = card.querySelector('.card-description').textContent;

    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalImage').alt = title;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;

    const modal = document.getElementById('modalOverlay');
    modal.classList.add('active');
    this.isModalOpen = true;

    document.getElementById('mainHeader').classList.add('hidden');

    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    this.isModalOpen = false;

    document.getElementById('mainHeader').classList.remove('hidden');

    document.body.style.overflow = '';

    this.activeCard = null;
  }

  handleTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
    this.touchStartY = e.changedTouches[0].screenY;
  }

  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.touchEndY = e.changedTouches[0].screenY;
    this.handleSwipe();
  }

  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
      if (deltaX > 0) {
        this.previousCard();
      } else {
        this.nextCard();
      }
    }
  }

  nextCard() {
    if (this.activeCardIndex < this.cards.length - 1) {
      this.setActiveCard(this.activeCardIndex + 1);
    }
  }

  previousCard() {
    if (this.activeCardIndex > 0) {
      this.setActiveCard(this.activeCardIndex - 1);
    }
  }

  setActiveCard(index) {
    this.activeCardIndex = index;

    this.cards.forEach(card => card.classList.remove('active'));

    this.cards[index].classList.add('active');

    if (this.isMobile) {
      this.cards.forEach((card, i) => {
        if (i === index) {
          card.style.zIndex = 100;
        } else {
          card.style.zIndex = this.cards.length - i;
        }
      });
    }
  }
}
