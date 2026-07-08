// Initialize Lucide Icons
lucide.createIcons();

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ---------------- Theme Toggle ---------------- */
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlEl.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

/* ---------------- scroll progress + nav bg ---------------- */
const progress = document.getElementById('progress');
const navEl = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
  navEl.classList.toggle('scrolled', h.scrollTop > 40);
}, { passive:true });

/* ---------------- GSAP Hero Animation ---------------- */
gsap.from(".hero-eyebrow, .hero h1, .hero-title, .hero-tagline, .hero-buttons", {
  y: 40,
  opacity: 0,
  stagger: 0.15,
  delay: 0.2,
  duration: 1,
  ease: "power3.out"
});

/* ---------------- GSAP Reveal Animation ---------------- */
gsap.utils.toArray('.reveal').forEach((elem) => {
  gsap.fromTo(elem, 
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
        toggleActions: "play none none reverse" 
      }
    }
  );
});

/* ---------------- GSAP Parallax Bento Cards ---------------- */
// Instead of standard reveal, we give bento cards a slight parallax scroll effect
gsap.utils.toArray('.parallax-card').forEach((card, i) => {
  gsap.fromTo(card, 
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        end: "top 50%",
        scrub: 1 // Link animation to scroll progress
      }
    }
  );
});

/* ---------------- magnetic buttons ---------------- */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * 0.25;
    const y = (e.clientY - r.top - r.height/2) * 0.4;
    
    gsap.to(btn, {
        x: x,
        y: y,
        duration: 0.3,
        ease: "power2.out"
    });
  });
  
  btn.addEventListener('mouseleave', () => { 
    gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "elastic.out(1, 0.3)"
    });
  });
});

/* ---------------- smooth scrolling for nav links ---------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {y: target, offsetY: 80},
                ease: "power3.inOut"
            });
        }
    });
});
