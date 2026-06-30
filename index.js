
/* Mobile nav */
const burger = document.getElementById('burger-btn');
const mobNav = document.getElementById('mobile-nav');
const mobClose = document.getElementById('mob-close-btn');
const mobDrop = document.getElementById('mob-drop-btn');
const mobSub  = document.getElementById('mob-sub-menu');
const mobArrow= document.getElementById('mob-drop-arrow');

function openMob()  { mobNav.classList.add('open');  burger.setAttribute('aria-expanded','true');  document.body.style.overflow='hidden'; }
function closeMob() { mobNav.classList.remove('open');burger.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }

if(burger)  burger.addEventListener('click', openMob);
if(mobClose) mobClose.addEventListener('click', closeMob);
document.addEventListener('keydown', e => { if(e.key==='Escape'){ closeMob(); closeModal && closeModal(); } });

if (mobDrop && mobSub && mobArrow) {
  mobDrop.addEventListener('click', () => {
    mobSub.classList.toggle('open');

    const isOpen = mobSub.classList.contains('open');

    mobDrop.setAttribute('aria-expanded', String(isOpen));
    mobArrow.textContent = isOpen ? '▴' : '▾';
  });
}

/* Active nav link highlight */
const page = location.pathname.split('/').pop() || 'index.html';
const map = {
  'index.html':'nav-home','who-we-are.html':'nav-who','what-we-do.html':'nav-wwd',
  'brokerage.html':'nav-brok','advisory.html':'nav-adv',
  'insights.html':'nav-ins','contact.html':'nav-con',
  'insurance-brokerage.html':'nav-wwd','employee-benefits-advisory.html':'nav-wwd',
  'leaderships.html':'nav-brok'
};
const activeId = map[page];
if(activeId){ const el=document.getElementById(activeId); if(el) el.classList.add('active'); }

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');

let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev');

    if (i === index) {
      slide.classList.add('active');
    } else if (i < index) {
      slide.classList.add('prev');
    }
  });

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');

  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function prevSlide() {
  const prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

function startSlider() {
  slideTimer = setInterval(nextSlide, 5000);
}

function resetSlider() {
  clearInterval(slideTimer);
  startSlider();
}

if (slides.length) {
  showSlide(0);
  startSlider();

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetSlider();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetSlider();
    });
  });
}
