import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const menuToggle = document.querySelector<HTMLButtonElement>('#menuToggle');
const navLinks = document.querySelector<HTMLElement>('#navLinks');

const setMenu = (open: boolean): void => {
  if (!menuToggle || !navLinks) return;
  menuToggle.classList.toggle('active', open);
  navLinks.classList.toggle('active', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
};

menuToggle?.addEventListener('click', () => {
  setMenu(!navLinks?.classList.contains('active'));
});

navLinks?.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  gsap.set('.hero h1, .hero-number, .hero p, .cta-buttons, .about-item, .service-item, .portfolio-item, .contact-email', {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  });
} else {
  gsap.to('.hero h1', { opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' });
  gsap.to('.hero-number', { opacity: 0.1, duration: 1, delay: 0.4, ease: 'power3.out' });
  gsap.to('.hero p', { opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' });
  gsap.to('.cta-buttons', { opacity: 1, duration: 0.8, delay: 0.7, ease: 'power3.out' });

  const reveal = (selector: string, from: gsap.TweenVars = {}): void => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, ...from },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
        },
      );
    });
  };

  reveal('.about-item', { y: 40 });
  reveal('.service-item', { x: 50 });
  reveal('.portfolio-item', { scale: 0.96 });

  gsap.fromTo(
    '.contact-email',
    { opacity: 0, y: 30 },
    {
      scrollTrigger: {
        trigger: '.contact-email',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    },
  );
}

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
});
