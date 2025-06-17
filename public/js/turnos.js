document.getElementById('turnoForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    dni_paciente: document.getElementById('dni_paciente').value,
    medico: document.getElementById('medico').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value
  };
  
  try {
    const res = await fetch('/turnos/crear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert('Turno asignado correctamente');
      document.getElementById('turnoForm').reset();
    } else {
      alert('Error al asignar turno');
    }
  } catch (error) {
    console.error('Error en el envío:', error);
  }
});

document.getElementById('verTurnoBtn').addEventListener('click', async () => {
  const dni = document.getElementById('dni_paciente').value;
  if (!dni) return alert('Ingrese un DNI primero');

  try {
    const res = await fetch(`/turnos/buscar/${dni}`);
    const turnos = await res.json();
    console.log('Turnos:', turnos);
    // Aquí podés renderizarlos donde quieras
  } catch (error) {
    console.error('Error al consultar turnos:', error);
  }
});
