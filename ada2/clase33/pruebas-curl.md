# Pruebas de la API REST de tareas

Primero arrancá el servidor: `npm install` y después `node server.js` (o `npm start`).
Quedará escuchando en `http://localhost:3000`.

> **Importante en Windows PowerShell:** `curl` es un alias de `Invoke-WebRequest`,
> que no entiende las opciones `-H` ni `-d` de curl. Por eso hay dos opciones:
> usar `Invoke-RestMethod` (sección A, recomendada) o llamar a `curl.exe` con el
> `.exe` explícito (sección B). La sección C es para bash / macOS / Linux.

---

## A) PowerShell con Invoke-RestMethod (recomendada en Windows)

`Invoke-RestMethod` convierte la respuesta JSON en objetos automáticamente.

### GET — Read (todas las tareas)
```powershell
Invoke-RestMethod http://localhost:3000/tareas
```

### GET — Read (una tarea)
```powershell
Invoke-RestMethod http://localhost:3000/tareas/1
```

### POST — Create
```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/tareas `
  -ContentType "application/json" `
  -Body '{"titulo":"Preparar el parcial"}'
```

### PUT — Update/Replace (reemplaza el recurso completo)
```powershell
Invoke-RestMethod -Method Put -Uri http://localhost:3000/tareas/1 `
  -ContentType "application/json" `
  -Body '{"titulo":"Repasar REST a fondo","hecha":true}'
```
> Si mandás solo `titulo` sin `hecha`, el servidor rechaza el pedido (400):
> PUT espera el recurso completo, no un fragmento.

### PATCH — Update/Modify (modifica solo lo enviado)
```powershell
Invoke-RestMethod -Method Patch -Uri http://localhost:3000/tareas/2 `
  -ContentType "application/json" `
  -Body '{"hecha":false}'
```
> Acá sí alcanza con mandar el campo que cambia — el resto de la tarea
> queda intacto. Esa es la diferencia práctica entre PUT y PATCH.

### DELETE — Delete
```powershell
Invoke-RestMethod -Method Delete -Uri http://localhost:3000/tareas/2
```

### Ver el código de estado HTTP (201, 404, etc.)
`Invoke-RestMethod` no muestra el status code. Si querés verlo, usá
`Invoke-WebRequest`:
```powershell
Invoke-WebRequest -Method Post -Uri http://localhost:3000/tareas `
  -ContentType "application/json" `
  -Body '{"titulo":"Probar status"}' | Select-Object StatusCode, Content
```
Y para ver un error 404 sin que PowerShell lo trate como excepción:
```powershell
Invoke-WebRequest -Uri http://localhost:3000/tareas/999 -SkipHttpErrorCheck |
  Select-Object StatusCode, Content
```
(`-SkipHttpErrorCheck` requiere PowerShell 7+. En Windows PowerShell 5.1 el 404
aparece como error rojo, que igual sirve para ver que el servidor respondió 404.)

---

## B) PowerShell con curl.exe

Windows 10/11 trae `curl.exe` real. Hay que escribir `.exe` para esquivar el
alias, y las comillas dobles del JSON hay que escaparlas con `\"`:

```powershell
curl.exe http://localhost:3000/tareas

curl.exe -X POST http://localhost:3000/tareas -H "Content-Type: application/json" -d '{\"titulo\":\"Preparar el parcial\"}'

curl.exe -X PUT http://localhost:3000/tareas/1 -H "Content-Type: application/json" -d '{\"titulo\":\"Repasar REST a fondo\",\"hecha\":true}'

curl.exe -X PATCH http://localhost:3000/tareas/2 -H "Content-Type: application/json" -d '{\"hecha\":false}'

curl.exe -X DELETE http://localhost:3000/tareas/2
```

---

## C) bash / macOS / Linux (curl clásico)

```bash
curl http://localhost:3000/tareas
curl http://localhost:3000/tareas/1

curl -X POST http://localhost:3000/tareas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Preparar el parcial"}'

curl -X PUT http://localhost:3000/tareas/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Repasar REST a fondo","hecha":true}'

curl -X PATCH http://localhost:3000/tareas/2 \
  -H "Content-Type: application/json" \
  -d '{"hecha":false}'

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
