import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const menuToggle = document.querySelector<HTMLButtonElement>('#menuToggle');
const navLinks = document.querySelector<HTMLUListElement>('#navLinks');
if (!menuToggle || !navLinks) throw new Error('Navigation elements not found.');

const setMenu = (open: boolean) => {
  menuToggle.classList.toggle('active', open);
  navLinks.classList.toggle('active', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
};
menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
navLinks.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

gsap.to('.hero h1', { opacity: 1, duration: 1, delay: .3 });
gsap.to('.hero-number', { opacity: .1, duration: 1, delay: .4 });
gsap.to('.hero p', { opacity: 1, duration: .8, delay: .5 });
gsap.to('.cta-buttons', { opacity: 1, duration: .8, delay: .7 });

const reveal = (selector: string, vars: gsap.TweenVars = {}) => {
  gsap.utils.toArray<HTMLElement>(selector).forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' },
      opacity: 1, duration: .8, delay: i * .1, ...vars,
    });
  });
};
reveal('.about-item', { y: 0 });
reveal('.service-item', { x: 0 });
reveal('.portfolio-item', { scale: 1 });

gsap.to('.contact-email', {
  scrollTrigger: { trigger: '.contact-email', start: 'top 80%', toggleActions: 'play none none reverse' },
  opacity: 1, duration: .8,
});

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    window.scrollTo({ top: (target as HTMLElement).offsetTop - 80, behavior: 'smooth' });
  });
});
