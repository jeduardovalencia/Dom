// Mostrar errores JS en alerta para ayudar a depurar si la página aparece en blanco
window.addEventListener('error', (e) => {
  try {
    alert(`Error de JavaScript:\n${e.message} \nen ${e.filename}:${e.lineno}`);
  } catch (err) {
    console.error(e);
  }
});
window.addEventListener('unhandledrejection', (e) => { alert('Promise rechazado: '+(e.reason && e.reason.message ? e.reason.message : e.reason)); });

const tareaInput = document.getElementById('tareaInput');
const agregarBtn = document.getElementById('agregarBtn');
const tareasList = document.getElementById('tareasList');
const errorMsg = document.getElementById('errorMsg');
const noTareas = document.getElementById('noTareas');
const themeToggle = document.getElementById('themeToggle');

function crearTarea(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  const del = document.createElement('button');
  del.textContent = 'Eliminar';
  del.className = 'task-delete';
  del.addEventListener('click', () => {
    li.remove();
    saveTareas();
    renderNoTareas();
  });
  span.addEventListener('click', () => { li.classList.toggle('done'); saveTareas(); });
  li.appendChild(span);
  li.appendChild(del);
  return li;
}

function agregarTarea() {
  const texto = tareaInput.value.trim();
  if (!texto) {
    errorMsg.textContent = 'La tarea está vacía. Escribe algo antes de agregar.';
    return;
  }
  errorMsg.textContent = '';
  tareas.push({text: texto, done:false});
  saveTareas();
  renderTareas();
  tareaInput.value = '';
  tareaInput.focus();
}

agregarBtn.addEventListener('click', agregarTarea);
// permitir Enter para agregar
tareaInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') agregarTarea(); });

// ------------------ Ejercicio 2: Contador interactivo --------------------
const numeroEl = document.getElementById('numero');
const incBtn = document.getElementById('inc');
const decBtn = document.getElementById('dec');
const resetBtn = document.getElementById('reset');

let contador = 0;
function actualizarContador() {
  numeroEl.textContent = String(contador);
  if (contador > 0) numeroEl.style.color = 'green';
  else if (contador < 0) numeroEl.style.color = 'red';
  else numeroEl.style.color = 'black';
}

incBtn.addEventListener('click', () => { contador++; actualizarContador(); });
decBtn.addEventListener('click', () => { contador--; actualizarContador(); });
resetBtn.addEventListener('click', () => { contador = 0; actualizarContador(); });

actualizarContador();

const productos = [
  { nombre: 'Camiseta', precio: 19.99, imagen: '👕' },
  { nombre: 'Pantalón', precio: 34.5, imagen: '👖' },
  { nombre: 'Zapatillas', precio: 59.99, imagen: '👟' },
  { nombre: 'Gorra', precio: 12.0, imagen: '🧢' },
  { nombre: 'Mochila', precio: 45.0, imagen: '🎒' },
  { nombre: 'Reloj', precio: 79.9, imagen: '⌚' }
];

const filtroInput = document.getElementById('filtro');
const catalogoEl = document.getElementById('catalogo');
const noCoincideEl = document.getElementById('noCoincide');
const carritoCountEl = document.getElementById('carritoCount');

let carrito = 0;

function renderCatalogo(lista) {
  catalogoEl.innerHTML = '';
  if (lista.length === 0) {
    noCoincideEl.textContent = 'No hay productos que coincidan con el filtro.';
    return;
  }
  noCoincideEl.textContent = '';
  lista.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'card-prod';
    const name = document.createElement('div');
    name.className = 'prod-name';
    name.textContent = `${p.imagen} ${p.nombre}`;
    const price = document.createElement('div');
    price.className = 'prod-price';
    price.textContent = `$ ${p.precio.toFixed(2)}`;
    const btn = document.createElement('button');
    btn.className = 'add-btn';
    btn.textContent = 'Agregar al carrito';
    btn.addEventListener('click', () => {
      carrito++;
      carritoCountEl.textContent = carrito;
   
      btn.textContent = 'Añadido ✓';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = 'Agregar al carrito'; btn.disabled = false; }, 900);
    });
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(btn);
    catalogoEl.appendChild(card);
  });
}


filtroInput.addEventListener('input', () => {
  const q = filtroInput.value.trim().toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(q));
  renderCatalogo(filtrados);
});


renderCatalogo(productos);

window.__domExercises = { agregarTarea, crearTarea, productos };

/* ---------- Nuevas funciones/funcionalidades ---------- */

// Tareas con persistencia
let tareas = [];
function loadTareas(){
  const raw = localStorage.getItem('tareas_v1');
  tareas = raw ? JSON.parse(raw) : [];
  renderTareas();
}
function saveTareas(){
  localStorage.setItem('tareas_v1', JSON.stringify(tareas));
}
function renderTareas(){
  tareasList.innerHTML = '';
  tareas.forEach((t, i) => {
    const li = crearTarea(t.text);
    if (t.done) li.classList.add('done');
    // attach delete to remove from array
    li.querySelector('.task-delete').addEventListener('click', () => {
      tareas.splice(i,1);
      saveTareas();
      renderTareas();
    });
    li.querySelector('span').addEventListener('click', () => {
      tareas[i].done = !tareas[i].done;
      saveTareas();
      renderTareas();
    });
    tareasList.appendChild(li);
  });
  renderNoTareas();
}
function renderNoTareas(){
  noTareas.style.display = tareas.length ? 'none' : 'block';
}

// Theme toggle with persistence
function applyTheme(theme){
  if(theme === 'dark') document.documentElement.classList.add('dark-mode');
  else document.documentElement.classList.remove('dark-mode');
}
function toggleTheme(){
  document.documentElement.classList.toggle('dark-mode');
  const isDark = document.documentElement.classList.contains('dark-mode');
  localStorage.setItem('theme_v1', isDark ? 'dark' : 'light');
}
themeToggle.addEventListener('click', toggleTheme);
const savedTheme = localStorage.getItem('theme_v1') || 'light';
applyTheme(savedTheme);

// Gallery (simple emoji gallery)
const galMain = document.getElementById('galeriaMain');
const galThumbs = document.getElementById('galeriaThumbs');
const images = ['🌄','🏖️','🌆','🌋','🏔️','🌅'];
function renderGallery(){
  galThumbs.innerHTML = '';
  galMain.textContent = images[0];
  images.forEach(i => {
    const d = document.createElement('div');
    d.className = 'gallery-thumb';
    d.textContent = i;
    d.addEventListener('click', () => { galMain.textContent = i; });
    galThumbs.appendChild(d);
  });
}

// Reloj digital
const reloj = document.getElementById('reloj');
function tick(){
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');
  reloj.textContent = `${hh}:${mm}:${ss}`;
}
setInterval(tick,1000); tick();

// Juego de clic rápido
const target = document.getElementById('target');
const startGame = document.getElementById('startGame');
const gameTimeEl = document.getElementById('gameTime');
const gameScoreEl = document.getElementById('gameScore');
let gameTimer=30, gameScore=0, gameInterval=null;
function placeTarget(){
  const area = document.querySelector('.game-area');
  const w = area.clientWidth - 60; const h = area.clientHeight - 60;
  const x = Math.max(0, Math.random()*w);
  const y = Math.max(0, Math.random()*h);
  target.style.left = x + 'px'; target.style.top = y + 'px'; target.style.display='block';
}
target.addEventListener('click', ()=>{ gameScore++; gameScoreEl.textContent = gameScore; placeTarget(); });
startGame.addEventListener('click', ()=>{
  gameTimer=30; gameScore=0; gameTimeEl.textContent=gameTimer; gameScoreEl.textContent=gameScore; placeTarget();
  if(gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(()=>{ gameTimer--; gameTimeEl.textContent=gameTimer; if(gameTimer<=0){ clearInterval(gameInterval); target.style.display='none'; alert('Tiempo! Puntaje: '+gameScore); } },1000);
});

// Quiz simple
const quizEl = document.getElementById('quiz');
const questions = [
  {q:'Capital de Francia?', opts:['Londres','París','Roma'], a:1},
  {q:'2+2=?', opts:['3','4','5'], a:1},
  {q:'Color del cielo?', opts:['Verde','Azul','Rojo'], a:1}
];
let qi=0, qscore=0;
function renderQuiz(){
  quizEl.innerHTML = '';
  if(qi>=questions.length){ quizEl.textContent = `Quiz terminado. Puntos: ${qscore}/${questions.length}`; return; }
  const cur = questions[qi];
  const qh = document.createElement('div'); qh.textContent = cur.q; quizEl.appendChild(qh);
  cur.opts.forEach((opt, idx)=>{
    const btn = document.createElement('button'); btn.textContent = opt; btn.addEventListener('click', ()=>{ if(idx===cur.a) qscore++; qi++; renderQuiz(); }); quizEl.appendChild(btn);
  });
}
renderQuiz();

// Form validation
const form = document.getElementById('formDemo');
const fName = document.getElementById('fName');
const fEmail = document.getElementById('fEmail');
const fPass = document.getElementById('fPass');
const errName = document.getElementById('errName');
const errEmail = document.getElementById('errEmail');
const errPass = document.getElementById('errPass');
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let ok=true; errName.textContent=''; errEmail.textContent=''; errPass.textContent='';
  if(!fName.value.trim()){ errName.textContent='Nombre requerido'; ok=false; fName.classList.add('invalid'); } else fName.classList.remove('invalid');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fEmail.value)){ errEmail.textContent='Correo inválido'; ok=false; fEmail.classList.add('invalid'); } else fEmail.classList.remove('invalid');
  if(fPass.value.length<8){ errPass.textContent='Mínimo 8 caracteres'; ok=false; fPass.classList.add('invalid'); } else fPass.classList.remove('invalid');
  if(ok) alert('Formulario válido ✔');
});

// Calculadora
const calcKeys = document.getElementById('calcKeys');
const calcDisplay = document.getElementById('calcDisplay');
const keys = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'];
keys.forEach(k=>{
  const b = document.createElement('button'); b.className='key'; b.textContent=k; b.addEventListener('click', ()=>{
    if(k==='C'){ calcDisplay.value=''; return; }
    if(k==='='){ try{ calcDisplay.value = Function('return '+calcDisplay.value)(); }catch(e){ calcDisplay.value='Err' } return; }
    calcDisplay.value += k;
  }); calcKeys.appendChild(b);
});

// Texto mágico
const magicInput = document.getElementById('magicInput');
const magicOut = document.getElementById('magicOut');
magicInput.addEventListener('input', ()=>{
  const s = magicInput.value.split('').map(ch=>{
    if(/[0-9]/.test(ch)) return `<span style="color:blue">${ch}</span>`;
    if(/[aeiouáéíóúüAEIOU]/.test(ch)) return ch.toUpperCase();
    return ch.toLowerCase();
  }).join('');
  magicOut.innerHTML = s;
});

// Menu dinámico
document.querySelectorAll('.menu .menu-item').forEach(mi=>{
  mi.addEventListener('click', ()=>{
    const open = mi.classList.contains('open');
    document.querySelectorAll('.menu .menu-item').forEach(x=>x.classList.remove('open'));
    if(!open) mi.classList.add('open');
  });
});

// Inicializar
renderGallery();
loadTareas();
