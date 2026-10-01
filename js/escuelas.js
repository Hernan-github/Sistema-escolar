let escuelas = [];

let escuelaEditando = null;

async function cargarEscuelas() {

    const { data, error } = await supabaseClient
        .from("escuelas")
        .select("*")
        .order("nombre");

    if (error) {

        console.error("Error al cargar escuelas:", error);

        alert("No se pudieron cargar las escuelas.");

        return;
    }

    escuelas = data;

    mostrarEscuelas();
}

/* =========================
   MOSTRAR ESCUELAS
========================= */

function mostrarEscuelas(lista = escuelas) {

  const tabla = document.getElementById("tablaEscuelas");

  tabla.innerHTML = "";

  lista.forEach(escuela => {

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>
        <div class="nombre-escuela">${escuela.nombre}</div>
        <small>${escuela.telefono}</small>
      </td>

      <td>${escuela.cct}</td>

      <td>${escuela.localidad}</td>

      <td>${escuela.zona}</td>

      <td>${escuela.sector}</td>

      <td>${escuela.turno}</td>

      <td>
        <span class="estado ${escuela.activo ? "activo" : "inactivo"}">
          ${escuela.activo ? "Activa" : "Inactiva"}
        </span>
      </td>

      <td>
        <div class="acciones">

          <button 
            class="btn-editar"
            onclick="editarEscuela(${escuela.id})">
            Editar
          </button>

          <button 
            class="btn-ver"
            onclick="verEscuela(${escuela.id})">
            Ver
          </button>
        <button 
            class="btn-estado"
            onclick="cambiarEstadoEscuela(${escuela.id})">
            ${escuela.activo ? "Desactivar" : "Activar"}
        </button>
        </div>
      </td>
    `;

    tabla.appendChild(fila);
  });

  actualizarResumen();
}

function cambiarEstadoEscuela(id) {

  const escuela = escuelas.find(
    escuela => escuela.id === id
  );

  if (!escuela) {
    alert("No se encontró la escuela.");
    return;
  }

  escuela.activo = !escuela.activo;

  mostrarEscuelas();

}

/* =========================
   RESUMEN
========================= */

function actualizarResumen() {

  const total = escuelas.length;

  const activas = escuelas.filter(
    escuela => escuela.activo
  ).length;

  const inactivas = escuelas.filter(
    escuela => !escuela.activo
  ).length;

  document.getElementById("totalEscuelas").textContent = total;

  document.getElementById("escuelasActivas").textContent = activas;

  document.getElementById("escuelasInactivas").textContent = inactivas;
}


/* =========================
   ABRIR FORMULARIO NUEVA ESCUELA
========================= */

document.getElementById("btnNuevaEscuela").addEventListener("click", () => {

  escuelaEditando = null;

  limpiarFormulario();

  document.querySelector(".modal-header h2").textContent =
    "Nueva escuela";

  document.getElementById("modalFondo").classList.add("mostrar");
});


/* =========================
   EDITAR ESCUELA
========================= */

function editarEscuela(id) {

  const escuela = escuelas.find(
    escuela => escuela.id === id
  );

  if (!escuela) {
    return;
  }

  // Guardamos qué escuela estamos editando
  escuelaEditando = escuela;

  // Cambiamos el título
  document.querySelector(".modal-header h2").textContent =
    "Editar escuela";

  // Rellenamos el formulario
  document.getElementById("nombre").value =
    escuela.nombre;

  document.getElementById("cct").value =
    escuela.cct;

  document.getElementById("zona").value =
    escuela.zona;

  document.getElementById("sector").value =
    escuela.sector;

  document.getElementById("turno").value =
    escuela.turno;

  document.getElementById("domicilio").value =
    escuela.domicilio;

  document.getElementById("localidad").value =
    escuela.localidad;

  document.getElementById("telefono").value =
    escuela.telefono;

  // Abrimos el modal
  document.getElementById("modalFondo").classList.add("mostrar");
}


/* =========================
   GUARDAR
========================= */

document.getElementById("btnGuardar").addEventListener("click", () => {

  const nombre =
    document.getElementById("nombre").value.trim();

  const cct =
    document.getElementById("cct").value.trim();

  const zona =
    document.getElementById("zona").value.trim();

  const sector =
    document.getElementById("sector").value.trim();

  const turno =
    document.getElementById("turno").value;

  const domicilio =
    document.getElementById("domicilio").value.trim();

  const localidad =
    document.getElementById("localidad").value.trim();

  const telefono =
    document.getElementById("telefono").value.trim();


  /* Validaciones */

  if (!nombre) {
    alert("Ingresa el nombre de la escuela.");
    return;
  }

  if (!cct) {
    alert("Ingresa el CCT.");
    return;
  }

  if (!localidad) {
    alert("Ingresa la localidad.");
    return;
  }

  /* =========================
     EDITAR EXISTENTE
  ========================= */

  if (escuelaEditando !== null) {

    escuelaEditando.nombre = nombre;
    escuelaEditando.cct = cct;
    escuelaEditando.zona = zona;
    escuelaEditando.sector = sector;
    escuelaEditando.turno = turno;
    escuelaEditando.domicilio = domicilio;
    escuelaEditando.localidad = localidad;
    escuelaEditando.telefono = telefono;

    alert("Escuela actualizada correctamente.");

  }


  /* =========================
     CREAR NUEVA
  ========================= */

  else {

    const nuevaEscuela = {

      id: Date.now(),

      nombre: nombre,

      cct: cct,

      localidad: localidad,

      zona: zona,

      sector: sector,

      turno: turno,

      domicilio: domicilio,

      telefono: telefono,

      activo: true
    };

    escuelas.push(nuevaEscuela);

    alert("Escuela registrada correctamente.");
  }


  // Actualizar tabla
  mostrarEscuelas();

  // Cerrar modal
  cerrarModal();

  // Limpiar
  limpiarFormulario();

  escuelaEditando = null;
});


/* =========================
   CERRAR MODAL
========================= */

function cerrarModal() {

  document
    .getElementById("modalFondo")
    .classList.remove("mostrar");
}


document.getElementById("btnCerrar").addEventListener(
  "click",
  cerrarModal
);

document.getElementById("btnCancelar").addEventListener(
  "click",
  cerrarModal
);


/* =========================
   LIMPIAR FORMULARIO
========================= */

function limpiarFormulario() {

  document.getElementById("nombre").value = "";

  document.getElementById("cct").value = "";

  document.getElementById("zona").value = "";

  document.getElementById("sector").value = "";

  document.getElementById("turno").value = "";

  document.getElementById("domicilio").value = "";

  document.getElementById("localidad").value = "";

  document.getElementById("telefono").value = "";
}


/* =========================
   VER ESCUELA
========================= */

function verEscuela(id) {

  const escuela = escuelas.find(
    escuela => escuela.id === id
  );

  if (!escuela) {
    return;
  }

  alert(
    "Escuela: " + escuela.nombre +
    "\nCCT: " + escuela.cct +
    "\nLocalidad: " + escuela.localidad +
    "\nZona: " + escuela.zona +
    "\nSector: " + escuela.sector +
    "\nTurno: " + escuela.turno +
    "\nDomicilio: " + escuela.domicilio +
    "\nTeléfono: " + escuela.telefono
  );
}


/* =========================
   FILTROS
========================= */

document.getElementById("btnFiltrar").addEventListener(
  "click",
  aplicarFiltros
);


function aplicarFiltros() {

  const busqueda =
    document.getElementById("busqueda").value
      .toLowerCase()
      .trim();

  const localidad =
    document.getElementById("filtroLocalidad").value;

  const estado =
    document.getElementById("filtroEstado").value;


  const resultado = escuelas.filter(escuela => {

    const coincideBusqueda =
      escuela.nombre.toLowerCase().includes(busqueda) ||
      escuela.cct.toLowerCase().includes(busqueda);

    const coincideLocalidad =
      !localidad ||
      escuela.localidad === localidad;

    let coincideEstado = true;

    if (estado === "activo") {
      coincideEstado = escuela.activo === true;
    }

    if (estado === "inactivo") {
      coincideEstado = escuela.activo === false;
    }

    return (
      coincideBusqueda &&
      coincideLocalidad &&
      coincideEstado
    );
  });


  mostrarEscuelas(resultado);
}


/* =========================
   CARGAR AL INICIAR
========================= */

mostrarEscuelas();
cargarEscuelas();