# FarmaStock — CRUD de Medicamentos

Proyecto universitario para la práctica de **Scrum Poker** y **Sprint Planning**.
El incremento funcional final será un **CRUD de Gestión de Medicamentos** para FarmaStock.

> ⚠️ **Estado actual:** la **base técnica** está montada y la **capa de modelo del backend (acceso a datos) está completa**: `findAll`, `findById`, `create`, `update` y `remove` están implementadas y probadas contra MySQL. Falta **conectar el controlador** a esas funciones (hoy solo el *listar* responde de punta a punta) y completar la lógica del frontend. Lo pendiente sigue marcado con comentarios `TODO`.

---

## 1. Descripción del proyecto

Aplicación web que permitirá **crear, listar, editar y eliminar** medicamentos de una farmacia (FarmaStock). Está dividida en dos partes:

- **Backend:** API REST con Node.js + Express, conectada a MySQL.
- **Frontend:** interfaz en React (Vite) que consume la API.

---

## 2. Tecnologías usadas

| Capa            | Tecnología            |
| --------------- | --------------------- |
| Frontend        | React.js + Vite       |
| Backend         | Node.js + Express.js  |
| Base de datos   | MySQL (`mysql2`)      |
| Control versión | Git + GitHub          |

---

## 3. Requisitos previos

Instala estas herramientas antes de empezar:

- **Node.js** (v18 o superior) → https://nodejs.org
- **MySQL** (v8 o superior) → https://dev.mysql.com/downloads/
- **Git** → https://git-scm.com

Verifica que estén instalados (PowerShell):

```powershell
node -v
npm -v
git --version
mysql --version
```

---

## 4. Cómo clonar el repositorio

```powershell
git clone https://github.com/DmeshellHeredia/farmastock-crud-medicamentos.git
cd farmastock-crud-medicamentos
```

---

## 5. Instalar dependencias del backend

```powershell
cd backend
npm install
```

> Esto instala Express, CORS, dotenv y mysql2. Volver a la raíz con `cd ..` cuando termines.

---

## 6. Instalar dependencias del frontend

```powershell
cd frontend
npm install
```

> Esto instala React y Vite. Volver a la raíz con `cd ..` cuando termines.

---

## 7. Crear la base de datos usando `schema.sql`

Desde la **raíz del proyecto** (PowerShell). Te pedirá la contraseña de MySQL:

```powershell
Get-Content backend/database/schema.sql | mysql -u root -p
```

Esto crea la base de datos `farmastock_db` y la tabla `medicamentos`.

> ⚠️ **PowerShell no soporta el operador `<`** (`mysql -u root -p < archivo.sql` da error).
> Usa `Get-Content archivo.sql | mysql ...` como arriba. Si prefieres CMD, sí funciona:
> `cmd /c "mysql -u root -p < backend/database/schema.sql"`

---

## 8. Insertar datos de prueba usando `seed.sql`

```powershell
Get-Content backend/database/seed.sql | mysql -u root -p
```

Esto agrega 3 medicamentos de ejemplo.

> 💡 Si prefieres una interfaz gráfica, puedes abrir y ejecutar ambos `.sql` desde **MySQL Workbench**.

---

## 9. Cómo configurar `.env`

El backend necesita un archivo `.env` con las credenciales de MySQL.

```powershell
cd backend
Copy-Item .env.example .env
```

Luego abre `backend/.env` y edita tus datos reales:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=farmastock_db
DB_PORT=3306
PORT=3001
```

*(Opcional)* El frontend también tiene un `.env.example` con `VITE_API_URL` si quieres cambiar la URL del backend.

---

## 10. Cómo correr el backend

```powershell
cd backend
npm run dev
```

- Servidor en: **http://localhost:3001**
- Prueba rápida: abre http://localhost:3001/ → debe responder un JSON.
- Endpoint del CRUD: http://localhost:3001/api/medicamentos

> `npm run dev` usa **nodemon** (reinicia solo al guardar). También existe `npm start`.

---

## 11. Cómo correr el frontend

En **otra terminal**:

```powershell
cd frontend
npm run dev
```

- App en: **http://localhost:5173**

---

## 12. Qué partes debe completar cada integrante

Todo el código base está listo; la lógica pendiente está marcada con `TODO`.

### 🎨 Frontend
> Nota: la tabla que **lista** los medicamentos ya está conectada al backend y funcionando (sirve de ejemplo). Falta lo demás.
- [ ] Completar el formulario de registro con los campos faltantes (`MedicamentoForm.jsx`).
- [ ] Conectar el botón **Guardar** para crear (usar `createMedicamento` del servicio).
- [ ] Agregar botón **Editar** funcional.
- [ ] Agregar botón **Eliminar** funcional.
- [ ] Mostrar mensajes de éxito / error.

### ⚙️ Backend
> Nota: la **capa de modelo** (`medicamentoModel.js`) ya tiene **todas** las funciones implementadas y probadas contra MySQL (`findAll`, `findById`, `create`, `update`, `remove`). Lo que falta es **conectarlas desde el controlador**: hoy solo `getMedicamentos` (listar) responde de punta a punta; el resto de las rutas devuelve `501 No implementado`.

**Modelo (`medicamentoModel.js`) — listo:**
- [x] Listar (`findAll`) ✅
- [x] Obtener por id (`findById`) ✅
- [x] Crear (`create`) ✅
- [x] Actualizar (`update`) ✅
- [x] Eliminar / borrado lógico (`remove`) ✅

**Controlador (`medicamentoController.js`) — pendiente:**
- [x] Listar (`getMedicamentos` → `findAll`) ✅
- [ ] Obtener por id (`getMedicamentoById` → `findById`).
- [ ] Crear (`createMedicamento` → `create`).
- [ ] Actualizar (`updateMedicamento` → `update`).
- [ ] Eliminar (`deleteMedicamento` → `remove`).
- [ ] Agregar **validaciones**.
- [ ] ⚠️ Cada función debe terminar respondiendo (`res.json` / `res.status`), o la petición se queda colgada.

### 🗄️ Base de datos
- [ ] Revisar la tabla `medicamentos`.
- [ ] Probar la conexión MySQL.
- [ ] Insertar datos de prueba.

### 🧪 QA
- [ ] Probar creación.
- [ ] Probar listado.
- [ ] Probar edición.
- [ ] Probar eliminación.
- [ ] Probar validaciones.

---

## 13. Flujo de trabajo en equipo con Git

> 🔒 **La rama `main` está protegida.** NO se puede hacer `git push` directo a `main`
> (GitHub lo rechaza). **Todo** cambio debe entrar por un **Pull Request** que debe ser
> **aprobado por el dueño del repositorio** (definido en `.github/CODEOWNERS`) antes de fusionarse.

Pasos que debe seguir cada integrante:

```powershell
# 1. Traer los últimos cambios de main antes de empezar
git checkout main
git pull origin main

# 2. Crear tu propia rama de trabajo
git checkout -b feature/nombre-de-tu-tarea

# 3. Trabajar, y ver el estado de tus cambios
git status

# 4. Agregar y confirmar tus cambios
git add .
git commit -m "feat: descripción de lo que hiciste"

# 5. Subir TU RAMA (nunca main) al repositorio
git push origin feature/nombre-de-tu-tarea
```

6. En GitHub, abre un **Pull Request** de tu rama hacia `main`.
7. Espera a que el **dueño del repo revise y apruebe** el PR.
8. Una vez aprobado, se fusiona a `main`. ✅

> ⚠️ Antes de poder subir ramas, cada integrante debe estar agregado como
> **colaborador** del repo (Settings → Collaborators).

---

## 14. Checklist para verificar que la base quedó funcionando

- [ ] `npm install` termina sin errores en `backend/` y `frontend/`.
- [ ] La base de datos `farmastock_db` y la tabla `medicamentos` existen.
- [ ] `backend/.env` está configurado con las credenciales correctas.
- [ ] `npm run dev` en backend muestra: `🚀 Servidor backend corriendo...` y `✅ Conexión a MySQL establecida`.
- [ ] http://localhost:3001/ responde con un JSON.
- [ ] `npm run dev` en frontend abre http://localhost:5173 y muestra la página de FarmaStock.

---

## Estructura del proyecto

```
farmastock-crud-medicamentos/
├── .github/
│   └── CODEOWNERS                       # Define quién debe aprobar los Pull Requests
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    # Conexión a MySQL
│   │   ├── controllers/
│   │   │   └── medicamentoController.js # Capa HTTP: recibe y responde (con TODOs)
│   │   ├── models/
│   │   │   └── medicamentoModel.js      # Capa de datos: consultas SQL (CRUD completo)
│   │   ├── routes/
│   │   │   └── medicamentoRoutes.js     # Rutas /api/medicamentos
│   │   ├── app.js                       # Configuración Express
│   │   └── server.js                    # Arranque del servidor
│   ├── database/
│   │   ├── schema.sql                   # Crea BD y tabla
│   │   └── seed.sql                     # Datos de ejemplo
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MedicamentoForm.jsx      # Formulario (con TODOs)
│   │   │   └── MedicamentoList.jsx      # Tabla (con TODOs)
│   │   ├── pages/
│   │   │   └── MedicamentoPage.jsx      # Página principal
│   │   ├── services/
│   │   │   └── medicamentoService.js    # Llamadas a la API
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```
