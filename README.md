# Sistema Helpdesk - ITOps

![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vue.js)
![Vuetify](https://img.shields.io/badge/Vuetify-3-1867C0?style=for-the-badge&logo=vuetify)

## 📋 Índice

1.  [Descripción del Proyecto](#descripcion-del-proyecto)
2.  [Características Implementadas](#caracteristicas-implementadas)
3.  [Tecnologías Utilizadas](#tecnologias-utilizadas)
4.  [Puesta en Marcha](#puesta-en-marcha)
5.  [Guía de Uso y Pruebas](#guia-de-uso-y-pruebas)
6.  [Estructura del Proyecto](#estructura-del-proyecto)
7.  [Licencia](#licencia)
8.  [Autor](#autor)

---

## 📝 Descripción del Proyecto

Proyecto que consiste en el desarrollo de la interfaz de usuario para un sistema de mesa de ayuda (Helpdesk) para la empresa "ITOps - Operaciones IT".

El objetivo es crear una aplicación web funcional, intuitiva y moderna, aplicando conceptos de usabilidad y utilizando tecnologías actuales.

## ✨ Características Implementadas

-   [x] **Autenticación de Usuario (UI):** Formularios de Inicio de Sesión y Registro.
-   [x] **Validación de Formularios:** Reglas para campos requeridos, formato de email, solo números, etc.
-   [x] **Dashboard Principal:** Layout de aplicación con barra superior y menú de navegación lateral.
-   [x] **Navegación por Tarjetas:** Menú visual para acceder a los módulos principales.
-   [x] **Módulo de Tickets:**
    -   Tabla de datos interactiva.
    -   Búsqueda en tiempo real.
    -   Paginación y selección de ítems por página.
-   [x] **Creación de Tickets:** Formulario completo para registrar un nuevo ticket.

## 🛠️ Tecnologias Utilizadas

-   **Vue.js 3:** Framework principal para la construcción de la interfaz.
-   **Vuetify 3:** Biblioteca de componentes Material Design para un diseño consistente y responsivo.
-   **Vue Router:** Para la gestión de rutas y navegación entre páginas.
-   **HTML5 / CSS3 / JavaScript (ES6+)**

## 🚀 Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado **Node.js** (versión 18 o superior) y **npm**.

### Instalación

1.  **Clona el repositorio** (o descomprime el archivo ZIP):
    ```sh
    git clone https://github.com/MilenaGandy/Itops-Helpdesk.git
    ```

2.  **Navega a la carpeta recien creada** del proyecto:
    ```sh
    cd [nombre-de-la-carpeta]
    ```

3.  **Instala las dependencias** del proyecto:
    ```sh
    npm install
    ```

4.  **Inicia el servidor de desarrollo**:
    ```sh
    npm run dev
    ```

5.  Abre tu navegador y ve a `http://localhost:3000` (o la URL que indique la consola).

## 💻 Guía de Uso y Pruebas

### Credenciales de Acceso

Para probar el flujo de inicio de sesión, utiliza el siguiente usuario ficticio:

-   **Usuario:** `test@itops.com`
-   **Contraseña:** `password123`

### Flujo de Pruebas Recomendado

1.  **Desde la página de Login:**
    -   Intenta iniciar sesión con los campos vacíos para ver las validaciones.
    -   Usa credenciales incorrectas para ver la alerta de error.
    -   Ingresa con las credenciales correctas para acceder al dashboard.

2.  **Desde la Página Principal:**
    -   Interactúa con el menú lateral (hover para expandir, clic en el ícono para fijar).
    -   Haz clic en la tarjeta **"TICKETS"** para navegar a la lista de tickets.

3.  **Desde la Página de Tickets:**
    -   Usa la barra de búsqueda para filtrar la tabla.
    -   Prueba la paginación en la parte inferior de la tabla.
    -   Haz clic en el botón **"Nuevo Ticket"** para ir al formulario de creación.

4.  **Desde la Página de Creación de Ticket:**
    -   Intenta crear un ticket con campos vacíos.
    -   Usa el botón **"Cancelar"** para volver atrás.
    -   Llena el formulario correctamente y presiona **"Crear"**. Deberías ver una alerta de éxito y ser redirigido.

## 📂 Estructura del Proyecto

A continuación, se detalla la función de los directorios y archivos clave del proyecto para facilitar su comprensión y mantenimiento.

-   `package.json`: Define los scripts de ejecución (`npm run dev`) y lista todas las dependencias del proyecto (Vue, Vuetify, etc.).

-   **/src**: Directorio principal que contiene todo el código fuente de la aplicación.

    -   **/assets**: Almacena los activos que son procesados por el sistema de compilación, como hojas de estilo CSS globales, imágenes y fuentes.

    -   **/components**: Contiene los componentes de Vue reutilizables en varias partes de la aplicación.
        -   `AppFooter.vue`: Renderiza el pie de página global.
        -   `AppHeader.vue`: Renderiza el header de página global.
        -   `ImagenInicial.vue`: Muestra el banner institucional utilizado en las vistas de Login y Registro.

    -   **/layouts**: Plantillas base para las páginas principales.
        -   `default.vue`: Layout principal de la app (estructura general, slots, etc.).

    -   **/pages**: Contiene los componentes que representan una página completa. Cada archivo en esta carpeta suele estar asociado a una ruta específica.
        -   `login.vue`: Formulario y lógica para el inicio de sesión de los usuarios.
        -   `registryUser.vue`: Formulario y lógica para el registro de nuevos usuarios.
        -   `principal.vue`: Layout principal de la aplicación una vez autenticado.
        -   `tickets.vue`: Tabla de datos interactiva con la lista de tickets, búsqueda y paginación.
        -   `crearTicket.vue`: Formulario completo para la creación de un nuevo ticket, con sus respectivas validaciones.

    -   **/plugins**: Configuración e inicialización de plugins externos.
        -   `index.js`: Inicialización de plugins generales.
        -   `vuetify.js`: Configuración de Vuetify.

    -   **/router**:
        -   `index.js`: Configura Vue Router. Aquí se definen todas las rutas de la aplicación y a qué componente de vista apuntan.

    -   **/stores**: Almacena la lógica de estado global de la aplicación (Pinia, Vuex, etc.).
        -   `index.js`: Inicialización de los stores.
        -   `app.js`: Store principal de la app.

    -   **/styles**: Hojas de estilo globales y variables de diseño.
        -   `settings.scss`: Variables y configuraciones de estilos globales.
        -   `styles.css`: Estilos globales de la aplicación.

    -   `App.vue`: Es el componente raíz de la aplicación. Su función principal es renderizar el componente de la ruta activa a través de la etiqueta `<router-view>`.

    -   `main.js`: Es el punto de entrada de la aplicación. Aquí se inicializa la instancia de Vue y se conectan los plugins como Vuetify y Vue Router.

## 📄 Licencia

Este proyecto se distribuye bajo la Licencia MIT.

## 👨‍💻 Autor

-   **YESSICA MENDOZA HERRERA**
-   `ymendozah@gmail.com`
