// app.js (módulo para navegador)
const estudiantes = [
  { nombre: "Ana", notas: [3.5, 4.0, 3.8], proyectoEntregado: true },
  { nombre: "Luis", notas: [2.8, 3.0, 2.5], proyectoEntregado: false },
  { nombre: "María", notas: [4.5, 4.2, 4.8], proyectoEntregado: true },
  { nombre: "Carlos", notas: [3.0, 3.1, 2.9], proyectoEntregado: false },
  { nombre: "Sofía", notas: [4.0, 3.9, 4.1], proyectoEntregado: true },
  { nombre: "Diego", notas: [2.0, 2.5, 2.8], proyectoEntregado: false },
  { nombre: "Valentina", notas: [4.8, 4.9, 5.0], proyectoEntregado: true },
  { nombre: "Andrés", notas: [3.2, 3.5, 3.4], proyectoEntregado: true },
  { nombre: "Camila", notas: [3.0, 2.7, 3.1], proyectoEntregado: false },
  { nombre: "Mateo", notas: [4.1, 4.3, 4.2], proyectoEntregado: true },
  { nombre: "Juliana", notas: [2.9, 2.8, 3.0], proyectoEntregado: false },
  { nombre: "Felipe", notas: [3.7, 3.6, 3.8], proyectoEntregado: true },
  { nombre: "Isabela", notas: [4.4, 4.6, 4.7], proyectoEntregado: true },
  { nombre: "Samuel", notas: [3.3, 3.1, 3.2], proyectoEntregado: false },
  { nombre: "Laura", notas: [2.5, 2.9, 2.7], proyectoEntregado: false },
  { nombre: "Tomás", notas: [4.2, 3.9, 4.4], proyectoEntregado: true },
  { nombre: "Natalia", notas: [3.0, 3.2, 3.1], proyectoEntregado: true },
  { nombre: "Esteban", notas: [4.0, 4.1, 4.2], proyectoEntregado: true },
  { nombre: "Daniela", notas: [2.3, 2.8, 2.6], proyectoEntregado: false },
  { nombre: "Julián", notas: [3.4, 3.6, 3.5], proyectoEntregado: true },
  { nombre: "Lucía", notas: [4.8, 4.9, 4.7], proyectoEntregado: true },
  { nombre: "Sebastián", notas: [3.9, 4.0, 3.8], proyectoEntregado: true },
  { nombre: "Carolina", notas: [2.7, 2.9, 3.0], proyectoEntregado: false },
  { nombre: "Pedro", notas: [3.5, 3.7, 3.6], proyectoEntregado: true },
  { nombre: "Martina", notas: [4.1, 4.3, 4.0], proyectoEntregado: true },
  { nombre: "Gabriel", notas: [2.6, 2.5, 2.9], proyectoEntregado: false },
  { nombre: "Sara", notas: [4.0, 3.9, 4.1], proyectoEntregado: true },
  { nombre: "Nicolás", notas: [3.1, 3.2, 3.3], proyectoEntregado: true },
  { nombre: "Elena", notas: [4.5, 4.7, 4.6], proyectoEntregado: true },
  { nombre: "Pablo", notas: [2.4, 2.8, 2.7], proyectoEntregado: false }
];

// 1. Calcular promedio con función flecha
const calcularPromedio = notas => notas.reduce((a, b) => a + b, 0) / notas.length;

// Agregar propiedad 'promedio' redondeada a 2 decimales
estudiantes.forEach(e => e.promedio = Number(calcularPromedio(e.notas).toFixed(2)));

// Helpers para render
const $ = (sel) => document.querySelector(sel);
const renderAverages = () => {
  const ul = $('#promedios');
  ul.innerHTML = '';
  estudiantes.forEach(({ nombre, promedio }) => {
    const li = document.createElement('li');
    li.textContent = `${nombre} → Promedio: ${promedio.toFixed(2)}`;
    ul.appendChild(li);
  });
};

const renderApproved = () => {
  const container = $('#aprobados');
  container.innerHTML = '';
  const aprobados = estudiantes.filter(e => e.promedio >= 3.0).map(e => e.nombre);
  aprobados.forEach(name => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = name;
    container.appendChild(span);
  });
};

const renderSearch = (nombreBuscado = 'María') => {
  const p = $('#busqueda');
  const encontrado = estudiantes.find(e => e.nombre.toLowerCase() === nombreBuscado.toLowerCase());
  if (encontrado) {
    const { nombre, promedio } = encontrado;
    p.textContent = `Estudiante encontrado: ${nombre} (Promedio ${promedio.toFixed(2)})`;
  } else {
    p.textContent = `Estudiante '${nombreBuscado}' no encontrado.`;
  }
};

const renderSome = () => {
  const p = $('#entregas');
  const alguienNoEntrego = estudiantes.some(e => !e.proyectoEntregado);
  p.textContent = `¿Alguien no ha entregado el proyecto? → ${alguienNoEntrego}`;
};

// 5. procesarEstudiantes(estudiantes, callback)
function procesarEstudiantes(estudiantesList, callback) {
  callback(estudiantesList);
}

const renderProcessing = () => {
  const div = $('#procesamiento');
  div.innerHTML = '';
  procesarEstudiantes(estudiantes, (lista) => {
    const aprobadosLista = lista.filter(e => e.promedio >= 3.0).map(e => e.nombre);
    const p1 = document.createElement('p');
    p1.textContent = `Aprobados: [ ${aprobadosLista.join(', ')} ]`;
    div.appendChild(p1);
  });
  const p2 = document.createElement('p');
  p2.textContent = 'Procesamiento completado ✅';
  div.appendChild(p2);
  $('#total').textContent = `Total de estudiantes procesados: ${estudiantes.length}`;
};

// Inicializar render
function init() {
  renderAverages();
  renderApproved();
  renderSearch();
  renderSome();
  renderProcessing();
}

document.addEventListener('DOMContentLoaded', init);

// Exports para depuración en consola (opcional)
window.__estudiantes = estudiantes;
