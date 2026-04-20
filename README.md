# Mini-Core MVC - Cálculo de Comisiones

Este proyecto es una solución al ejercicio de cálculo de comisiones de ventas utilizando el patrón arquitectónico **Modelo-Vista-Controlador (MVC)**.

## 🚀 Funcionalidad Principal
La aplicación permite filtrar ventas por un rango de fechas y calcular automáticamente la comisión de cada vendedor basándose en un conjunto de reglas predefinidas.

## 🏗️ Arquitectura MVC
El proyecto está estructurado de la siguiente manera:
- **Model (Modelo):** `models/ComisionModel.js` - Maneja la lógica de datos y la comunicación con la base de datos SQLite.
- **View (Vista):** `public/` - Contiene la interfaz de usuario (HTML, CSS, JS) para la interacción con el usuario.
- **Controller (Controlador):** `controllers/ComisionController.js` - Procesa las solicitudes, aplica la lógica de negocio (el cálculo de comisiones) y devuelve los resultados a la vista.

## 🛠️ Tecnologías Utilizadas
- **Backend:** Node.js, Express.js
- **Base de Datos:** SQLite (local por facilidad de despliegue)
- **Frontend:** HTML5, CSS3 (Glassmorphism design), JavaScript Vanilla (Fetch API)

## 💻 Instalación y Uso Local
1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Inicializar la base de datos con datos de prueba: `npm run init-db`
4. Iniciar el servidor: `npm start`
5. Abrir `http://localhost:3000` en el navegador.

## 📚 Referencias y Documentación
- **MVC Architecture:** [MDN Web Docs - MVC](https://developer.mozilla.org/es/docs/Glossary/MVC)
- **Express.js:** [Documentación oficial de Express](https://expressjs.com/es/)
- **SQLite en Node.js:** [Node-SQLite3 Wiki](https://github.com/TryGhost/node-sqlite3/wiki)

## 📧 Información de Contacto
- **Nombre:** [TU NOMBRE AQUÍ]
- **Correo:** [TU CORREO AQUÍ]
- **Video Explicativo:** [LINK A TU VIDEO DE LOOM/YOUTUBE AQUÍ]
- **Demo en la Nube:** [LINK A TU DEPLOY EN RENDER/RAILWAY AQUÍ]
