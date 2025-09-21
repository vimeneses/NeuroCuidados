const btn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');
btn?.addEventListener('click', () => nav.classList.toggle('open'));

// Destaque "active" conforme página
const path = location.pathname.split('/').pop() || 'NeuroCuidados.html';
document.querySelectorAll('.nav a').forEach(a=>{
  const href = a.getAttribute('href');
  if ((path === '' && href === 'NeuroCuidados.html') || href === path){
    a.classList.add('active');
  }
});

