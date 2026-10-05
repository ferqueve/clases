/**
 * Mini servidor REST — ANDIS 2, Unidad 3 (REST)
 * -----------------------------------------------
 * Práctica para probar, en código real, las ideas del teórico de REST:
 *   - Interfaz uniforme (siempre HTTP + URIs)
 *   - Cliente-servidor
 *   - Sin estado (stateless): cada request trae lo que necesita, nada se
 *     guarda en sesión del servidor
 *   - Verbos HTTP <-> operaciones CRUD (POST/GET/PUT/PATCH/DELETE)
 *
 * Recurso de ejemplo: "tareas" (una mini lista de tareas en memoria).
 *
 * Cómo correrlo:
 *   1) npm install express
 *   2) node server.js
 *   3) Probar con curl, Postman, Thunder Client, o lo que prefieras.
 *
 * Nota: los datos viven en un array en memoria -> se pierden al reiniciar
 * el servidor. Es intencional, para mantener el ejemplo simple y enfocado
 * en REST, no en persistencia.
 */

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // parsea bodies JSON automáticamente

// "Base de datos" en memoria
let tareas = [
  { id: 1, titulo: 'Repasar REST', hecha: false },
  { id: 2, titulo: 'Armar demo con Express', hecha: true },
];
let nextId = 3;

// Middleware mínimo de logging, para ver en consola cada request
// (útil para mostrar en clase que cada solicitud es independiente / stateless)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.originalUrl}`);
  next();
});

/**
 * GET /tareas  -> Read (todas)
 * CRUD: Read | Verbo: GET
 */
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

/**
 * GET /tareas/:id  -> Read (una)
 * CRUD: Read | Verbo: GET
 */
app.get('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === Number(req.params.id));
  if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(tarea);
});

/**
 * POST /tareas  -> Create
 * CRUD: Create | Verbo: POST
 * Body esperado: { "titulo": "..." }
 */
app.post('/tareas', (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ error: 'Falta el campo "titulo"' });

  const nueva = { id: nextId++, titulo, hecha: false };
  tareas.push(nueva);
  res.status(201).json(nueva); // 201 Created
});

/**
 * PUT /tareas/:id  -> Update o replace (reemplaza el recurso completo)
 * CRUD: Update/Replace | Verbo: PUT
 * Body esperado: { "titulo": "...", "hecha": true/false }
 */
app.put('/tareas/:id', (req, res) => {
  const idx = tareas.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

  const { titulo, hecha } = req.body;
  if (titulo === undefined || hecha === undefined) {
    return res.status(400).json({ error: 'PUT reemplaza el recurso completo: enviá "titulo" y "hecha"' });
  }

  tareas[idx] = { id: tareas[idx].id, titulo, hecha };
  res.json(tareas[idx]);
});

/**
 * PATCH /tareas/:id  -> Update o modify (modifica solo lo enviado)
 * CRUD: Update/Modify | Verbo: PATCH
 * Body esperado: cualquier subconjunto de { "titulo": "...", "hecha": true/false }
 */
app.patch('/tareas/:id', (req, res) => {
  const idx = tareas.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

  tareas[idx] = { ...tareas[idx], ...req.body };
  res.json(tareas[idx]);
});

/**
 * DELETE /tareas/:id  -> Delete
 * CRUD: Delete | Verbo: DELETE
 */
app.delete('/tareas/:id', (req, res) => {
  const idx = tareas.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

  const eliminada = tareas.splice(idx, 1)[0];
  res.json({ mensaje: 'Tarea eliminada', tarea: eliminada });
});

app.listen(PORT, () => {
  console.log(`Servidor REST escuchando en http://localhost:${PORT}`);
  console.log('Recurso disponible: /tareas');
});
