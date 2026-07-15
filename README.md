# 🏥 Sistema de Información Hospitalario

Sistema web para la gestión integral de un hospital: admisión e internación de pacientes, asignación de habitaciones y camas, historia clínica, turnos y el circuito completo de atención de Médicos y Enfermería. Desarrollado como Trabajo Práctico Integrador de Programación Web 2 

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

* Recepcionista
- Alta, búsqueda, edición y baja de pacientes (por DNI)
- Asociar un paciente "NN" (ingresado sin identificar) con su identidad real una vez confirmada
- Admisión de pacientes: programada y por urgencia
- Búsqueda y asignación de habitaciones/camas disponibles (filtrando por ala, tipo de habitación y género)
- Modificación y baja de internaciones activas
- Gestión de turnos médicos

* Médico
- Búsqueda de pacientes por dni
- Carga de evoluciones médicas
- Solicitud y carga de resultados de estudios diagnósticos
- Indicación de tratamientos y medicación
- Consulta de signos vitales y medicación administrada por enfermería
- Historia clínica general del paciente (antecedentes, alergias, enfermedades preexistentes, cirugías, medicación habitual)
- Alta médica del paciente

* Enfermería
- Búsqueda de pacientes por cama/habitación
- Evaluación de ingreso
- Registro y seguimiento de signos vitales
- Administración de medicación indicada por el médico
- Consulta de historia clínica

## Seguridad implementada

- Contraseñas de usuario hasheadas con **bcrypt** (nunca se guardan ni se comparan en texto plano)
- Autenticación por sesión (`express-session`) con secreto cargado desde variable de entorno
- Autorización por rol: cada grupo de rutas exige sesión iniciada y rol correspondiente (`verificarSesion` + `verificarRol`, en `middleware/auth.js`)
- Credenciales de base de datos y secreto de sesión fuera del repositorio, vía `.env` (no versionado)


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
2.  **Inicio de Sesión como rececpcionista:**:
    * Usuario: Maria123
    * Contraseña: 1234
    * Rol: Recepcionista

    **Inicio de Sesión como enfermero/a:**:
    * Usuario: Susana
    * Contraseña: 1111
    * Rol: Enfermero

    **Inicio de Sesión como medico/a:**:
    * Usuario: Carlos
    * Contraseña: 2222
    * Rol: Médico

3.  Una vez autenticado, serás redirigido al panel de inicio correspondiente donde podras navegar por las diferentes secciones.


## Tecnologías Usadas

Este proyecto ha sido construido utilizando las siguientes tecnologías:

* **Backend:**
    * [Node.js]
    * [Express.js]
    * [MySQL2]
    * [Express-session](Gestión de sesiones)
    * [bcrypt]
    * [dotenv] (variables de entorno)
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
| POST   | `/paciente/editar/:id`     | Actualiza los datos del paciente            |
| POST   | `/paciente/eliminar/:id`   | Elimina al paciente por ID                  |
| POST   | `/paciente/asociarPaciente`| Asocia un paciente real con uno de urgencia |

* Registro de pacientes

| Método | Ruta                     | Descripción                       |
|--------|--------------------------|
| GET    | `/registro`              | Formulario de alta de paciente    |
| POST   | `/registro/nuevopaciente`| Crea un paciente nuevo            |

* Habitaciones

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

* Modificar o eliminar internaciones

| Método | Ruta               | Descripción                                      |
| ------ | ------------------ | -------------------------------------------------|
| GET    | `/modificar`       | Muestra form para buscar internaciones por dni   |
| GET    | `/modificar/buscar`| Lista las admisiones de un paciente              |
| POST   | `/modificar/internacion/:id/editar` | Edita una internación           |
| POST   | `/modificar/internacion/:id/eliminar`| Elimina una internacion por id |


* Turnos

| Método | Ruta                  | Descripción                  |
| ------ | --------------------- | -----------------------------|
| GET    | `/turnos/formulario`  | Form de asignación de turno  |
| GET    | `/turnos/buscar/:dni` | Muestra turno más reciente   |
| POST   | `/turnos/crear`       | Crea un nuevo turno          |
| POST   | `/turnos/eliminar/:id`| Elimina un turno por ID      |
| POST   | `/turnos/presente/:id`| Marca un turno como presente |

* Catálogo planes
| Método | Ruta                  | Descripción                                   |
|--------|-----------------------|-----------------------------------------------|
| GET    | `/api/planes/:obraId` | Devuelve los planes de una obra social (JSON) |

* Médico

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/medicos` | Panel principal del médico |
| GET | `/medicos/buscar` | Busca pacientes internados |
| POST | `/medicos/guardarEvolucion` | Registra una evolución médica |
| POST | `/medicos/cargarResultadoEstudio` | Carga el resultado de un estudio diagnóstico |
| GET | `/medicos/signos-vitales/:id` | Consulta los signos vitales de una internación |
| GET | `/medicos/medicacion-administrada/:id` | Consulta la medicación administrada |
| GET | `/medicos/historial/:id` | Historia clínica general del paciente |
| POST | `/medicos/actualizarHistoria` | Actualiza antecedentes, alergias, etc. |
| POST | `/medicos/cambiar-estado-tratamiento/:id` | Cambia el estado de un tratamiento |
| POST | `/medicos/procesar-alta` | Procesa el alta médica del paciente |

* Enfermería

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/enfermeria` | Redirige a `/enfermeria/buscar` |
| GET | `/enfermeria/buscar` | Busca pacientes por cama/habitación |
| GET | `/enfermeria/historia/:idInternacion` | Consulta la historia clínica |
| POST | `/enfermeria/historia/actualizar` | Actualiza la historia clínica |
| GET | `/enfermeria/evaluacion/:idInternacion` | Formulario de evaluación de ingreso |
| POST | `/enfermeria/guardarEvaluacion` | Guarda la evaluación de ingreso |
| GET | `/enfermeria/signos/:idInternacion` | Formulario de carga de signos vitales |
| POST | `/enfermeria/guardarSignos` | Guarda signos vitales |
| POST | `/enfermeria/signos/eliminar/:id` | Elimina un registro de signos vitales |
| GET | `/enfermeria/administrar/:idInternacion` | Formulario de administración de medicación |
| POST | `/enfermeria/guardarAdministracion` | Registra la administración de medicación |
| POST | `/enfermeria/administrar/eliminar/:id` | Elimina un registro de administración |


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

6. Problema: La mayoría de las rutas eran accesibles sin haber iniciado sesión, y un usuario logueado con cualquier rol podía acceder a las secciones de los demás roles.
Solución: Se creó un middleware reutilizable (verificarSesion y verificarRol) aplicado a cada grupo de rutas según el rol correspondiente.

7. Problema: Exposición accidental de credenciales de la base de datos al trackear y subir el archivo .env al repositorio público de GitHub.
Solución: Se invalidó la contraseña comprometida cambiándola directamente en el motor de base de datos (MySQL). Luego, se agregó el archivo al .gitignore y se utilizó la opción "Stop tracking" en GitHub Desktop para eliminarlo del repositorio público de forma segura sin afectar el entorno local.

8. Problema: El sistema arrojaba el error Cannot read properties of null (reading 'paciente') al intentar cargar el modal de "Alta Médica", ya que Pug intentaba renderizar variables de una internación antes de que el médico buscara a un paciente.
Solución: Se implementó un renderizado condicional en la vista (if internacion && internacion.paciente) para construir el modal solo cuando los datos existen. Además, el código del modal se aisló en un archivo parcial (include) para reutilizarlo en múltiples vistas sin duplicar código.

8. Problema: Editar una internación existente reutilizando el flujo de admisión no liberaba correctamente la cama anterior.
Solución: Se agregó una rama modoEdicion dentro de asignarHabitacion que marca la cama anterior como disponible antes de asignar la nueva.

10. Problema: Inconsistencia de datos en la base de datos al realizar operaciones encadenadas. Por ejemplo, al registrar una nueva internación, si el sistema lograba guardar la internación pero fallaba justo antes de cambiar el estado de la cama a "ocupada", la base de datos quedaba corrupta (paciente internado en una cama que figuraba libre).
Solución: Se implementaron Transacciones de Sequelize en los controladores que afectan a múltiples tablas simultáneamente. Esto garantiza la atomicidad de las operaciones: si alguna consulta falla en el medio del proceso, se ejecuta un rollback (se deshace todo para no dejar registros huérfanos), y solo se hace un commit (guardado definitivo) si todas las operaciones del bloque finalizan con éxito.

11. Problema: Necesidad de cargar múltiples registros simultáneos en un único formulario de historia clínica sin recargar la página, garantizando que el servidor (Node.js) reciba los datos correctamente estructurados.
Solución: Se implementó un script de manipulación dinámica del DOM (Frontend JavaScript). Este script captura las selecciones del usuario (validando los data-id ocultos en los datalist), dibuja nuevas filas en una tabla para darle feedback visual al médico, e inyecta etiquetas <input type="hidden"> por cada registro. Al estructurar el atributo name con índices incrementales (ej: name="medicamentos[1000][id]"), se logró que el formulario envíe un array de objetos perfecto, permitiendo que el controlador procese todas las inserciones en bloque de forma eficiente.

12. Problema: La pantalla de administración de medicación de enfermería mostraba los tratamientos de todos los pacientes, sin filtrar por internación ni por estado.
Solución: Se agregó el campo estado al modelo Tratamiento (con valor por defecto 'Activo') y se filtró la consulta por las evoluciones médicas de la internación puntual.


---