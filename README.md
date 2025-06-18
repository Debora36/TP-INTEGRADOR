# 🏥 Sistema de Información Hospitalario

Un sistema integral para optimizar la administración de pacientes, internaciones, habitaciones y camas en entornos hospitalarios.

## 📋 Tabla de Contenidos
- [Características](#-características)
- [Instalación](#️-instalación)
- [Uso local](#uso-local)
- [Uso en linea](#uso-en-línea)
- [Tecnologías Usadas](#-tecnologías-usadas)
- [Documentación de endpoints](#endpoints)
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

## Endpoints

* Autenticación:

| Método | Ruta      | Descripción                       |
| ------ | --------- | --------------------------------- |
| POST   | `/login`  | Inicia sesión como usuario        |
| GET    | `/logout` | Cierra sesión y redirige al login |

* Rol recepcionista

| Método | Ruta              | Descripción                       |
| ------ | ----------------- | --------------------------------- |
| GET    | `/recepcionista`  | Muestra el panel con las opciones |


* Pacientes:

| Método | Ruta                       | Descripción                                 |
| ------ | -------------------------- | ------------------------------------------- |
| GET    | `/modelo/paciente/:dni`    | Busca un paciente por DNI                   |
| POST   | `/paciente/actualizar/:id` | Actualiza los datos del paciente            |
| POST   | `/paciente/eliminar/:id`   | Elimina al paciente por ID                  |
| POST   | `/paciente/asociarPaciente`| Asocia un paciente real con uno de urgencia |

* Habitaciones e internaciones

| Método | Ruta                               | Descripción                                                  |
| ------ | ---------------------------------- | ------------------------------------------------------------ |
| GET    | `/habitaciones/buscar`             | Filtra habitaciones disponibles con por ala, tipo y género   |
| POST   | `/habitaciones/asignar-habitacion` | Asigna cama al paciente o edita internación existente        |

* Admisiones

| Método | Ruta                     | Descripción                                |
| ------ | ------------------------ | ------------------------------------------ |
| GET    | `/admision`              | Muestra el formulario de admisión          |
| POST   | `/admision`              | Registra una nueva internación             |
| GET    | `/admision/editar`       | Muestra la internacion del paciente        |
| POST   | `/admision/urgencia`     | Registra un paciente de urgencia (NN)      |

* Modificar o eliminar admisiones

| Método | Ruta               | Descripción                                      |
| ------ | ------------------ | -------------------------------------------------|
| GET    | `/modificar`       | Muestra form para buscar internaciones por dni   |
| GET    | `/modificar/buscar`| Lista las admisiones de un paciente              |
| POST   | `/modificar/internacion/:id/eliminar`| Elimina una internacion por id |


* Turnos

| Método | Ruta                  | Descripción                  |
| ------ | --------------------- | -----------------------------|
| GET    | `/turnos/buscar/:dni` | Muestra turno más reciente   |
| POST   | `/turnos/crear`       | Crea un nuevo turno          |
| POST   | `/turnos/eliminar/:id`| Elimina un turno por ID      |


⚠️ Nota: Muchos de estos endpoints están diseñados para ser consumidos por formularios o funciones AJAX dentro de la aplicación. No son accesibles directamente desde el navegador sin pasar por el flujo correcto ni sin una sesión activa.

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