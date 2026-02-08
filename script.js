class CustomCursor {
  constructor() {
    this.cursor = null;
    this.follower = null;
    this.posX = 0;
    this.posY = 0;
    this.followerX = 0;
    this.followerY = 0;
    this.isMoving = false;
    
    this.init();
  }

  init() {
    this.cursor = document.createElement('div');
    this.cursor.classList.add('cursor');
    
    this.follower = document.createElement('div');
    this.follower.classList.add('cursor-follower');
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.follower);

    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', (e) => this.updateCursor(e));
    document.addEventListener('mouseenter', () => this.show());
    document.addEventListener('mouseleave', () => this.hide());
    
    this.animateFollower();
  }

  updateCursor(e) {
    this.posX = e.clientX;
    this.posY = e.clientY;

    this.cursor.style.left = this.posX + 'px';
    this.cursor.style.top = this.posY + 'px';

    const target = e.target;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('btn')) {
      this.cursor.style.borderColor = '#3D6B8D';
      this.cursor.style.boxShadow = '0 0 12px rgba(61, 107, 141, 0.6)';
    } else {
      this.cursor.style.borderColor = '#5B8FB3';
      this.cursor.style.boxShadow = 'none';
    }
  }

  animateFollower() {
    this.followerX += (this.posX - this.followerX) * 0.12;
    this.followerY += (this.posY - this.followerY) * 0.12;

    this.follower.style.left = this.followerX + 'px';
    this.follower.style.top = this.followerY + 'px';

    requestAnimationFrame(() => this.animateFollower());
  }

  show() {
    this.cursor.style.opacity = '0.8';
    this.follower.style.opacity = '0.6';
  }

  hide() {
    this.cursor.style.opacity = '0';
    this.follower.style.opacity = '0';
  }
}

const customCursor = new CustomCursor();

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationClass = element.className.match(/(fade-in-up|fade-in-left|fade-in-right|scale-in)/)?.[0] || 'fade-in-up';
        const delay = element.dataset.delay ? parseInt(element.dataset.delay) : 0;

        setTimeout(() => {
          element.style.animationDelay = '0s';
          element.style.opacity = '1';
          element.classList.add(animationClass);
        }, delay);

        observer.unobserve(element);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('[class*="fade-in"], [class*="scale-in"]');
  animatedElements.forEach(el => observer.observe(el));
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

function highlightNav() {
  const scrollY = window.pageYOffset;
  const sections = document.querySelectorAll('section[id]');

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = window.innerWidth <= 768 ? 80 : 0;
      const targetPosition = target.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = window.innerWidth <= 768 ? 80 : 0;
      const targetPosition = target.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
