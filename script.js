window.onload = function () {
  const canvas = document.getElementById('drawCanvas');
  const ctx = canvas.getContext('2d');
  resizeCanvas();

  // Malen aktiv (ohne Klick)
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
};

// Seitenwechsel + Zufallsbilder
function showPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page' + n);
  page.classList.add('active');

  if (n === 2) {
    setTimeout(randomizeGalleryImages, 200);
  }
}

// Zufällige Position + Rotation
function randomizeGalleryImages() {
  const images = document.querySelectorAll('#page2 .gallery img');
  images.forEach(img => {
    const angle = Math.random() * 30 - 15;
    const x = Math.random() * (window.innerWidth - img.width);
    const y = Math.random() * (window.innerHeight - img.height);
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = `rotate(${angle}deg) scale(1)`;
    img.style.zIndex = 1;
    img.classList.remove('focused');
    img.onclick = toggleImageFocus;
  });
}

// Maximieren beim Klick
function toggleImageFocus(e) {
  const img = e.target;
  const isFocused = img.classList.contains('focused');

  document.querySelectorAll('#page2 .gallery img').forEach(i => {
    i.classList.remove('focused');
    i.style.zIndex = 1;
  });

  if (!isFocused) {
    img.classList.add('focused');
  } else {
    randomizeGalleryImages(); // zurück
  }
}
