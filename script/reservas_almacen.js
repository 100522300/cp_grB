/* Funciones para guardar cosas en el navegador */

function obtenerSesion() {
  /* Recuperamos la sesion si existe */
  var textoSesion = localStorage.getItem("sesion");
  if (textoSesion == null) {
    return {};
  } else {
    return JSON.parse(textoSesion);
  }
}

function obtenerUsuarios() {
  var textoUsuarios = localStorage.getItem("usuarios");
  if (textoUsuarios == null) {
    return {};
  } else {
    return JSON.parse(textoUsuarios);
  }
}

function guardarUsuarios(usuarios) {
  var texto = JSON.stringify(usuarios);
  localStorage.setItem("usuarios", texto);
}

/* Guardar reserva normal */
export function guardarReserva(reserva) {
  var sesion = obtenerSesion();

  /* Si no hay login no hacemos nada */
  if (!sesion.login) {
    return;
  }

  /* Buscamos los usuarios */
  var usuarios = obtenerUsuarios();
  var miUsuario = usuarios[sesion.login];

  /* Si no tiene lista de reservas, creamos una vacia */
  if (!miUsuario.reservas) {
    miUsuario.reservas = [];
  }

  /* Añadimos la reserva y guardamos */
  miUsuario.reservas.push(reserva);
  guardarUsuarios(usuarios);
}

/* Obtener reservas normales */
export function obtenerReservas() {
  var sesion = obtenerSesion();

  if (!sesion.login) {
    return [];
  }

  var usuarios = obtenerUsuarios();
  var miUsuario = usuarios[sesion.login];

  if (miUsuario && miUsuario.reservas) {
    return miUsuario.reservas;
  } else {
    return [];
  }
}

/* COCHES */

export function guardarReservaCoche(reserva) {
  var sesion = obtenerSesion();
  if (!sesion.login) {
    return false;
  }

  var usuarios = obtenerUsuarios();
  var miUsuario = usuarios[sesion.login];

  /* Creamos el array si no existe */
  if (!miUsuario.reservasCoches) {
    miUsuario.reservasCoches = [];
  }

  /* RESTRICCION: Maximo 1 coche */
  if (miUsuario.reservasCoches.length >= 1) {
    return false;
  }

  miUsuario.reservasCoches.push(reserva);
  guardarUsuarios(usuarios);
  return true;
}

export function obtenerReservasCoches() {
  var sesion = obtenerSesion();
  if (!sesion.login) {
    return [];
  }

  var usuarios = obtenerUsuarios();
  var miUsuario = usuarios[sesion.login];

  if (miUsuario && miUsuario.reservasCoches) {
    return miUsuario.reservasCoches;
  } else {
    return [];
  }
}

export function eliminarReservaCoche(indice) {
  var sesion = obtenerSesion();
  if (!sesion.login) {
    return;
  }

  var usuarios = obtenerUsuarios();
  var miUsuario = usuarios[sesion.login];

  if (miUsuario && miUsuario.reservasCoches) {
    /* Borramos 1 elemento en la posicion indice */
    miUsuario.reservasCoches.splice(indice, 1);
    guardarUsuarios(usuarios);
  }
}
