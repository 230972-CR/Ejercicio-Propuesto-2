// Base de datos en memoria
let contactos = [];
let idContador = 1;

// =====================
//  AGREGAR CONTACTO
// =====================
function agregarContacto() {
  let nombre   = document.getElementById("nombre").value.trim();
  let telefono = document.getElementById("telefono").value.trim();
  let correo   = document.getElementById("correo").value.trim();
  let msg      = document.getElementById("mensaje-form");

  // Validaciones
  if (!nombre || !telefono || !correo) {
    mostrarMensajeForm("⚠️ Todos los campos son obligatorios.", "error");
    return;
  }
  if (telefono.length < 7 || isNaN(telefono.replace(/\s/g,""))) {
    mostrarMensajeForm("⚠️ Ingresa un número de teléfono válido.", "error");
    return;
  }
  if (!correo.includes("@") || !correo.includes(".")) {
    mostrarMensajeForm("⚠️ Ingresa un correo electrónico válido.", "error");
    return;
  }

  // Crear contacto
  let nuevoContacto = {
    id:       idContador++,
    nombre:   nombre,
    telefono: telefono,
    correo:   correo,
    fecha:    new Date().toLocaleDateString()
  };

  contactos.push(nuevoContacto);
  mostrarMensajeForm("✅ Contacto \"" + nombre + "\" agregado correctamente.", "exito");

  // Limpiar campos
  document.getElementById("nombre").value   = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo").value   = "";

  renderizarLista();
}

function mostrarMensajeForm(texto, tipo) {
  let el = document.getElementById("mensaje-form");
  el.innerText = texto;
  el.className = "mensaje-form " + tipo;
  setTimeout(() => { el.innerText = ""; el.className = "mensaje-form"; }, 3500);
}

// Placeholder vacío (se llenará en siguientes ramas)
function renderizarLista() {}