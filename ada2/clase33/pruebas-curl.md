# Pruebas con curl — API REST de tareas

Primero arrancá el servidor: `npm install` y después `node server.js` (o `npm start`).
Quedará escuchando en `http://localhost:3000`.

## GET — Read (todas las tareas)
```bash
curl http://localhost:3000/tareas
```

## GET — Read (una tarea)
```bash
curl http://localhost:3000/tareas/1
```

## POST — Create
```bash
curl -X POST http://localhost:3000/tareas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Preparar el parcial"}'
```

## PUT — Update/Replace (reemplaza el recurso completo)
```bash
curl -X PUT http://localhost:3000/tareas/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Repasar REST a fondo","hecha":true}'
```
> Si solo mandás `titulo` sin `hecha`, el servidor rechaza el pedido —
> PUT espera el recurso completo, no un fragmento.

## PATCH — Update/Modify (modifica solo lo enviado)
```bash
curl -X PATCH http://localhost:3000/tareas/2 \
  -H "Content-Type: application/json" \
  -d '{"hecha":false}'
```
> Acá sí alcanza con mandar el campo que cambia — el resto de la tarea
> queda intacto. Esa es la diferencia práctica entre PUT y PATCH.

## DELETE — Delete
```bash
curl -X DELETE http://localhost:3000/tareas/2
```

---

### Para ver "sin estado" (stateless) en acción

Mirá la consola del servidor mientras hacés estos pedidos: cada línea de
log es independiente, no hay ningún "recuerdo" de la solicitud anterior.
Si cerrás el servidor y lo volvés a levantar, las tareas vuelven a su
estado inicial — porque viven en un array en memoria, no en una base de
datos persistente (eso es un detalle de implementación de esta práctica,
no una restricción de REST en sí).
