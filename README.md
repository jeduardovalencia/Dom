# Lista de Estudiantes - Programa JS

Pequeño script en JavaScript que gestiona una lista de estudiantes y sus calificaciones.

Requisitos implementados:
- Calcular promedio por estudiante usando una función flecha y agregar la propiedad `promedio`.
- Filtrar estudiantes aprobados (promedio >= 3.0).
- Buscar un estudiante por nombre con `.find()`.
- Verificar con `.some()` si alguien no entregó el proyecto final.
- `procesarEstudiantes(estudiantes, callback)` para ejecutar callbacks sobre el listado.
- Uso de desestructuración para mostrar nombre y promedio.

Cómo ejecutar
1. Asegúrate de tener Node.js instalado.
2. Abre PowerShell en la carpeta del proyecto:

```powershell
cd C:/Users/JOHAN/Desktop/SENA/listaEstudiantes
node students.js
```

Salida esperada (resumen):
- Lista de promedios por estudiante.
- Arreglo con los nombres de los aprobados.
- Información del estudiante buscado (ej. María).
- Booleano indicando si alguien no entregó el proyecto.
- Mensaje final con total de estudiantes procesados.
