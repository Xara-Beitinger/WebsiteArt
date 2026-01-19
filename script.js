// Drawing on canvas (homepage)
window.onload = function () {
  const canvas = document.getElementById('drawCanvas');
  const ctx = canvas.getContext('2d');
  resizeCanvas();

  canvas.addEventListener('mousemove', draw);
  window.addEventListener('resize', resizeCanvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function draw(e) {
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fff';
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
};

// Menu + navigation
function toggleMenu() {
  const menu = document.getElementById('dropdownMenu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('dropdownMenu').style.display = 'none';
}

function navigateToPage(pageId) {
  showPage(pageId);
}

// Shuffle gallery images on the Photography page
function randomizeGalleryImages() {
  const gallery = document.querySelector('#photography .gallery');
  const images = Array.from(gallery.querySelectorAll('img'));
  images.forEach(img => gallery.removeChild(img));
  
  // Shuffle array
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  // Append shuffled images back
  images.forEach(img => gallery.appendChild(img));
}
