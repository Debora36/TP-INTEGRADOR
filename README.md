# 🏥 Sistema de Información Hospitalario

Un sistema integral para optimizar la administración de pacientes, internaciones, habitaciones y camas en entornos hospitalarios.

## 📋 Tabla de Contenidos
- [Características](#-características)
- [Instalación](#️-instalación)
- [Uso local](#uso-local)
- [Uso en linea](#uso-en-línea)
- [Tecnologías Usadas](#-tecnologías-usadas)
- [Problemas encontrados y solucionados](#problemas-y-soluciones)

## Características

Este Sistema de Gestión Hospitalaria ofrece las siguientes funcionalidades clave:

* **Recepción de Pacientes:** Registro de nuevo paciente, consulta, actualización de información, eliminación del registro y asociación de un paciente con una internación de urgencias.
* **Admisiones de pacientes:** Registro de las internaciones de un paciente, modificación de datos y eliminación de la admisión.
* **Gestión de Habitaciones y Camas:** Control de la disponibilidad de habitaciones y camas, asignación a pacientes y admisión de paciente de urgencia con datos ficticios.
* **Autenticación de Usuarios:** Sistema de login con roles diferenciados (Médico, Enfermero, Recepcionista).Por el momento, sólo funciona Recepcionista.

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

* **Node.js**
* **npm**
* **MySQL Server**

### Pasos de Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Debora36/TP-INTEGRADOR.git
    cd TP-INTEGRADOR
    ```

2.  **Instala las dependencias de Node.js:**
    ```bash
    npm install
    ```

3.  **Configura la Base de Datos:**
    * Crea una base de datos MySQL llamada `sistemahospital`.
    * Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno (ajusta los valores según tu configuración de MySQL):
        ```
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=your_mysql_password
        DB_NAME=sistemahospital
        PORT=3000
        SESSION_SECRET=your_secret_key_for_sessions
        ```

4.  **Inicia la Aplicación:**
    ```bash
    node --watch app.js
    ```

## Uso local

Una vez que la aplicación esté en funcionamiento:

1.  Abre tu navegador web y visita `http://localhost:3000`..
2.  **Inicio de Sesión:** Inicia sesión en rol recepcionista con:
    * Usuario: Maria123
    * Contraseña: 1234
3.  **Recepcionista:** Una vez autenticado, serás redirigido al panel de inicio (`/recepcionista`) donde podras navegar por las diferentes secciones.

## Uso en línea

Se puede acceder a la app desplegada en Railway
1. Dirigete al enlace: https://tp-integrador-production.up.railway.app/
2. Ingresar al sistema con las siguientes credenciales de prueba:
    * Usuario: Maria123
    * Contraseña: 1234
    * Rol: recepcionista


## Tecnologías Usadas

Este proyecto ha sido construido utilizando las siguientes tecnologías:

* **Backend:**
    * [Node.js]
    * [Express.js]
    * [MySQL2]
    * [Express-session](Gestión de sesiones)
* **Frontend:**
    * [Pug](Motor de plantillas HTML)
    * CSS Vanilla
    * JavaScript Vanilla
* **Base de Datos:**
    * [MySQL]
    * [sequelize]

## Problemas y soluciones

1. Problema: Al buscar un paciente por DNI no se podía editar ni eliminar porque faltaba el ID.
Solución: Se incluyó el id en los campos ocultos del formulario y se crearon rutas específicas para actualizar y eliminar por id.

2. Problema: Falta de integridad referencial entre pacientes, turnos y admisiones.
Solución: Se implementaron claves foráneas y relaciones entre modelos en Sequelize (hasMany, belongsTo), asegurando integridad en la base de datos.

3. Problema: Error al hacer include por no usar el alias definido en los modelos.
Solución: Se agregaron correctamente los alias en los include de las consultas, respetando la configuración de los modelos.

4. Problema: El DNI y la fecha no se mantenían en el formulario al redirigir a la vista de admisión para modificar.
Solución: Se incluyeron en la URL como parámetros ?dni=...&fecha=... y se mostraron en campos readonly para facilitar la edición sin perder contexto.

5. Problema: La asociación entre paciente de urgencia (NN) y paciente real no actualizaba la internación correctamente.
Solución: Se creó un controlador asociarPaciente que reemplaza el ID del paciente NN en la internación y luego elimina al paciente ficticio.


---