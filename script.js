// Canvas Drawing on Homepage
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

// Navigation
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('dropdownMenu').style.display = 'none';
}

function navigateToPage(pageId) {
  showPage(pageId);
}

function toggleMenu() {
  const menu = document.getElementById('dropdownMenu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}
