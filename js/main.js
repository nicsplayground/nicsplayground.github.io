document.addEventListener('DOMContentLoaded', () => {
  const stackElement = document.getElementById('cardStack');
  const cardStack = new CardStack(stackElement);
  cardStack.init();

  const animations = new PageAnimations();

  document.getElementById('modalClose').addEventListener('click', () => {
    cardStack.closeModal();
  });

  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') {
      cardStack.closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cardStack.isModalOpen) {
      cardStack.closeModal();
    }
  });

  console.log('Sri Lanka 2026 - Interactive card stack initialized successfully!');
});
