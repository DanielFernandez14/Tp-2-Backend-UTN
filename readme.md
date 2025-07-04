# Trabajo práctico Backend UTN

# 📚 API RESTful - Biblioteca Digital

Este proyecto es una API RESTful desarrollada con **Node.js**, **Express**, **TypeScript** y **MongoDB**, siguiendo el patrón **MVC**. Permite gestionar una colección de libros con operaciones CRUD completas.

---

## 🚀 Tecnologías Utilizadas

- **Lenguaje:** TypeScript
- **Framework:** Express
- **Base de Datos:** MongoDB
- **ODM:** Mongoose
- **Arquitectura:** MVC

---

## 📂 Estructura del Proyecto
src/
├── config/ # Configuración de MongoDB
├── controllers/ # Lógica de negocio
├── models/ # Definición del esquema Book
├── routes/ # Rutas de la API
├── index.ts # Punto de entrada


---

## 📚 Modelo Book

El esquema de un libro contiene:

- **title** (string) - Requerido y único
- **author** (string) - Requerido
- **publishedYear** (number) - Opcional
- **genre** (string) - Opcional
- **available** (boolean) - Por defecto `true`

---

## 🔄 Endpoints Disponibles

| Método | Ruta                  | Descripción                         |
|--------|------------------------|-------------------------------------|
| GET    | /api/books             | Listar todos los libros            |
| GET    | /api/books/:id         | Obtener un libro por ID            |
| POST   | /api/books             | Crear un nuevo libro               |
| PATCH  | /api/books/:id         | Actualizar un libro existente      |
| DELETE | /api/books/:id         | Eliminar un libro                  |

---

## ⚙️ Instalación y Ejecución

A continuación se detallan los pasos para instalar y correr el proyecto localmente.

### 1️⃣ Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <nombre_del_proyecto>
```

2️⃣ Instalar dependencias
Instala dependencias de desarrollo:

npm install express mongoose
npm install --save-dev typescript ts-node-dev @types/node @types/express

3️⃣ Configurar variables de entorno
Crea un archivo .env en la raíz con este contenido:

PORT=1234
URI_DB=mongodb://localhost:27017/db-api-utn
⚠️ Cambia el URI si tu MongoDB tiene otro puerto o credenciales.

4️⃣ Scripts recomendados en package.json
Asegurate de que tu package.json incluya estos scripts:

"scripts": {
  "dev": "ts-node-dev --respawn src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}

5️⃣ Ejecutar la API
Para modo desarrollo:

npm run dev

Para producción:

npm run build
npm start

👨‍💻 Autor
Daniel Matías Fernández | DanoDev
