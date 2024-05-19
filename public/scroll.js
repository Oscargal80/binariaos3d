document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.scroll-container');
  
    // Desplazarse hacia abajo al hacer clic o tap en cualquier lugar del contenedor
    scrollContainer.addEventListener('click', () => {
      scrollContainer.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  
    // Desplazarse hacia arriba si ya estás en la parte inferior del contenedor
    scrollContainer.addEventListener('touchend', () => {
      if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
        scrollContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
  