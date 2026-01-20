window.onload = function () {
  const canvas = document.getElementById('drawCanvas');
  const ctx = canvas.getContext('2d');
  resizeCanvas();

  // Drawing active (without click)
  let drawing = true;

  canvas.addEventListener('mousemove', draw);
  window.addEventListener('resize', resizeCanvas);

  function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fff';
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Dropdown behavior
  const trigger = document.getElementById('menuTrigger');
  const menu = document.getElementById('dropdownMenu');

  function closeMenu() {
    trigger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }

  function toggleMenu() {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      menu.classList.add('open');
    }
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking outside
  document.addEventListener('click', () => closeMenu());

  // Prevent clicks inside menu from closing before navigation
  menu.addEventListener('click', (e) => e.stopPropagation());

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
};

// Navigation
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(pageId);
  if (!page) return;
  page.classList.add('active');

  // If Photographie page, randomize after a tick (so images have layout)
  if (pageId === 'photographie') {
    setTimeout(randomizeGalleryImages, 200);
  }

  // Close dropdown if open (safe even if not on home)
  const menu = document.getElementById('dropdownMenu');
  const trigger = document.getElementById('menuTrigger');
  if (menu && trigger) {
    trigger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
}

// Random position + rotation (Photographie)
function randomizeGalleryImages() {
  const images = document.querySelectorAll('#photographie .gallery img');
  images.forEach(img => {
    const angle = Math.random() * 30 - 15;
    const x = Math.random() * (window.innerWidth - img.width);
    const y = Math.random() * (window.innerHeight - img.height);
    img.style.left = `${Math.max(0, x)}px`;
    img.style.top = `${Math.max(0, y)}px`;
    img.style.transform = `rotate(${angle}deg) scale(1)`;
    img.style.zIndex = 1;
    img.classList.remove('focused');
    img.onclick = toggleImageFocus;
  });
}

// Zoom on click
function toggleImageFocus(e) {
  const img = e.target;
  const isFocused = img.classList.contains('focused');

  document.querySelectorAll('#photographie .gallery img').forEach(i => {
    i.classList.remove('focused');
    i.style.zIndex = 1;
  });

  if (!isFocused) {
    img.classList.add('focused');
  } else {
    randomizeGalleryImages(); // back
  }
}
