document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
  
    // Desplazarse hacia abajo al hacer clic o tap en cualquier lugar del contenedor
    rootElement.addEventListener('click', () => {
      rootElement.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  
    // Desplazarse hacia arriba si ya estás en la parte inferior del contenedor
    rootElement.addEventListener('touchend', () => {
      if (rootElement.scrollTop + rootElement.clientHeight >= rootElement.scrollHeight) {
        rootElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
  