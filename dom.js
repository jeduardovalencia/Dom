//
const tareaInput = document.getElementById('tareaInput');
const agregarBtn = document.getElementById('agregarBtn');
const tareasList = document.getElementById('tareasList');
const errorMsg = document.getElementById('errorMsg');

function crearTarea(text) {
  const li = document.createElement('li');
  li.textContent = text;
 
  li.addEventListener('click', () => {
    li.classList.toggle('done');
  });

  li.addEventListener('dblclick', () => {
    li.remove();
  });
  return li;
}

function agregarTarea() {
  const texto = tareaInput.value.trim();
  if (!texto) {
    errorMsg.textContent = 'La tarea está vacía. Escribe algo antes de agregar.';
    return;
  }
  errorMsg.textContent = '';
  const li = crearTarea(texto);
  tareasList.appendChild(li);
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
