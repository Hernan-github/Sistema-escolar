document.addEventListener("DOMContentLoaded", async () => {

    // Comprobar que exista una sesión válida
    const datos = await obtenerUsuarioActual();

    if (!datos) {
        console.error("❌ obtenerUsuarioActual() devolvió NULL");
        console.log("⛔ NO se redirigirá al login para poder revisar el error");
        //window.location.href = "login.html";
        return;
    }


    const {
        usuario,
        rol,
        escuela
    } = datos;

    // Mostrar correo
    const correoUsuario =
        document.getElementById("correoUsuario");

    if (correoUsuario) {
        correoUsuario.textContent = usuario.correo;
    }

    // Mostrar nombre
    const nombreUsuario =
        document.getElementById("nombreUsuario");

    if (nombreUsuario) {
        nombreUsuario.textContent =
            `${usuario.nombres} ${usuario.ap_paterno}`;
    }

    // Mostrar rol
    const rolUsuario =
        document.getElementById("rolUsuario");

    if (rolUsuario && rol) {
        rolUsuario.textContent = rol.nombre;
    }

    // Mostrar escuela
    const escuelaUsuario =
        document.getElementById("escuelaUsuario");

    if (escuelaUsuario && escuela) {
        escuelaUsuario.textContent =
            escuela.nombre_escuela;
    }

    // Mostrar/ocultar opciones de administrador
    const opcionUsuarios =
        document.getElementById("opcionUsuarios");

    if (opcionUsuarios && rol) {

        if (rol.nombre !== "Administrador") {
            opcionUsuarios.style.display = "none";
        }
    }

    // Cerrar sesión
    const btnCerrarSesion =
        document.getElementById("btnCerrarSesion");

    if (btnCerrarSesion) {

        btnCerrarSesion.addEventListener(
            "click",
            async () => {

                const { error } =
                    await clienteSupabase.auth.signOut();

                if (error) {

                    console.error(
                        "Error al cerrar sesión:",
                        error
                    );

                    alert(
                        "No se pudo cerrar la sesión."
                    );

                    return;
                }

                window.location.href =
                    "login.html";
            }
        );
    }

});