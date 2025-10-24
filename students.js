// students.js
// Programa para gestionar una lista de estudiantes y sus calificaciones

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

// 1. Calcular promedio con función flecha y agregar propiedad 'promedio'
const calcularPromedio = (notas) => notas.reduce((a, b) => a + b, 0) / notas.length;

estudiantes.forEach(est => {
  // guardamos el promedio como número con 2 decimales
  est.promedio = Number(calcularPromedio(est.notas).toFixed(2));
});

// Mostrar promedios (uso de desestructuración)
console.log('1. Promedios de cada estudiante:');
estudiantes.forEach(({ nombre, promedio }) => {
  console.log(`${nombre} → Promedio: ${promedio.toFixed(2)}`);
});
console.log('');

// 2. Filtrar estudiantes aprobados (promedio >= 3.0)
const aprobados = estudiantes.filter(e => e.promedio >= 3.0).map(e => e.nombre);
console.log('2. Aprobados:');
console.log(aprobados);
console.log('');

// 3. Buscar con .find() a un estudiante por nombre (ej. María)
const nombreBuscado = 'María';
const estudianteEncontrado = estudiantes.find(e => e.nombre.toLowerCase() === nombreBuscado.toLowerCase());
if (estudianteEncontrado) {
  const { nombre, promedio } = estudianteEncontrado; // desestructuración
  console.log(`3. Estudiante encontrado: ${nombre} (Promedio ${promedio.toFixed(2)})`);
} else {
  console.log(`3. Estudiante '${nombreBuscado}' no encontrado.`);
}
console.log('');

// 4. Verificar con .some() si al menos un estudiante aún no ha entregado su proyecto final
const alguienNoEntrego = estudiantes.some(e => !e.proyectoEntregado);
console.log('4. ¿Alguien no ha entregado el proyecto? →', alguienNoEntrego);
console.log('');

// 5. procesarEstudiantes(estudiantes, callback)
function procesarEstudiantes(estudiantesList, callback) {
  // podemos pasar cualquier callback que reciba el arreglo procesado
  callback(estudiantesList);
}

// Ejemplo de uso: mostrar aprobados y mensaje final
procesarEstudiantes(estudiantes, (lista) => {
  const aprobadosLista = lista.filter(e => e.promedio >= 3.0).map(e => e.nombre);
  console.log('5. Procesamiento:');
  console.log('Aprobados:', aprobadosLista);
});

// Mensaje final con total de estudiantes procesados
console.log('Procesamiento completado ✅');
console.log(`Total de estudiantes procesados: ${estudiantes.length}`);

// Exportar para posibles tests (opcional)
module.exports = { estudiantes, calcularPromedio, procesarEstudiantes };
