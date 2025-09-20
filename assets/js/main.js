// Mobile menu
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const opened = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form (demo only)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name')?.toString().trim();
    const email = fd.get('email')?.toString().trim();
    const message = fd.get('message')?.toString().trim();
    if (!name || !email || !message) {
      if (formMsg) formMsg.textContent = 'Molimo ispunite sva polja.';
      return;
    }
    form.reset();
    if (formMsg) formMsg.textContent = 'Poruka je poslana. Hvala!';
    setTimeout(()=> { if (formMsg) formMsg.textContent = ''; }, 4000);
  });
}

// Auto gallery loader
document.querySelectorAll('.gallery[data-folder]').forEach(gallery => {
  const folder = gallery.getAttribute('data-folder');
  fetch(`assets/img/${folder}/index.json`)
    .then(resp => resp.json())
    .then(files => {
      gallery.innerHTML = '';
      files.forEach(file => {
        const fig = document.createElement('figure');
        const img = document.createElement('img');
        img.src = `assets/img/${folder}/${file}`;
        img.alt = folder;
        const cap = document.createElement('figcaption');
        cap.textContent = folder.charAt(0).toUpperCase() + folder.slice(1);
        fig.appendChild(img);
        fig.appendChild(cap);
        gallery.appendChild(fig);
      });
    })
    .catch(err => {
      console.warn(`No index.json for ${folder}`, err);
    });
});

// keep main.js present
