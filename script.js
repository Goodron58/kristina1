// Инициализация AOS — анимации при скролле
AOS.init({
  once: false, // повторять при прокрутке вверх-вниз
  mirror: true,
  duration: 800,
  easing: 'ease-out-quart'
});

// Анимация входа элементов при переходе на страницу
function animatePageIn(pageElement) {
  const mainEls = pageElement.querySelectorAll('h2, .back-btn');
  mainEls.forEach((el, i) => {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = `fadeInUp 0.6s ease forwards`;
    el.style.animationDelay = `${i * 0.15}s`;
  });

  const footer = pageElement.querySelector('.page-footer');
  if (footer) {
    footer.style.animation = 'none';
    void footer.offsetWidth;
    footer.style.animation = 'fadeInUp 1s ease forwards';
    footer.style.animationDelay = '0.6s';
  }

  // Обновляем AOS, чтобы scroll-анимации работали
  setTimeout(() => {
    AOS.refresh();
  }, 300);
}

// Переключение страниц
document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    const targetId = button.dataset.target;
    const targetPage = document.getElementById(targetId);
    const currentPage = document.querySelector('.page.active');

    if (!targetPage || currentPage === targetPage) return;

    currentPage.classList.remove('active');

    setTimeout(() => {
      targetPage.classList.add('active');
      animatePageIn(targetPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  });
});

// Анимация главной при загрузке
document.addEventListener('DOMContentLoaded', () => {
  const home = document.getElementById('home');
  const animatable = home.querySelectorAll('.name, .subtitle, .buttons, .page-footer');
  animatable.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
  });
  setTimeout(() => {
    animatable.forEach(el => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 100);
});