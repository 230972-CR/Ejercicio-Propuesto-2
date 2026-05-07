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

function renderizarLista() {
  let seccion = document.getElementById("seccion-lista");
  let contenedor = document.getElementById("lista-contactos");
  let badge = document.getElementById("badge-contador");
  let busqueda = document.getElementById("buscador")
                  ? document.getElementById("buscador").value.toLowerCase()
                  : "";

  // Filtrar si hay búsqueda
  let contactosFiltrados = contactos.filter(function(c) {
    return c.nombre.toLowerCase().includes(busqueda) ||
           c.telefono.includes(busqueda) ||
           c.correo.toLowerCase().includes(busqueda);
  });

  // Mostrar/ocultar sección
  seccion.style.display = contactos.length > 0 ? "block" : "none";
  badge.innerText = contactos.length;

  // Vacío
  if (contactosFiltrados.length === 0) {
    contenedor.innerHTML = `
      <div class="vacio">
        <div class="icono">🔍</div>
        <p>${contactos.length === 0 ? "No hay contactos aún. ¡Agrega el primero!" : "No se encontraron resultados."}</p>
      </div>`;
    return;
  }

  // Renderizar tarjetas
  contenedor.innerHTML = contactosFiltrados.map(function(c) {
    let iniciales = c.nombre.split(" ")
      .map(function(p) { return p[0]; })
      .join("").toUpperCase().slice(0, 2);
    return `
      <div class="contacto-card" id="card-${c.id}">
        <div class="avatar">${iniciales}</div>
        <div class="contacto-info">
          <div class="nombre-contacto">${c.nombre}</div>
          <div class="dato">📱 ${c.telefono}</div>
          <div class="dato">✉️ ${c.correo}</div>
          <div class="dato" style="color:#b2bec3; font-size:0.78rem">Agregado: ${c.fecha}</div>
        </div>
        <button class="btn-eliminar" onclick="eliminarContacto(${c.id})">🗑️ Eliminar</button>
      </div>`;
  }).join("");
}