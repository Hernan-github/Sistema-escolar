document.addEventListener("DOMContentLoaded", async () => {

    const datos = await obtenerUsuarioActual();

    // No hay sesión o usuario
    if (!datos) {
        window.location.href = "login.html";
        return;
    }

    const {
        usuario,
        rol,
        escuela
    } = datos;


    // =========================================================
    // INFORMACIÓN DEL USUARIO
    // =========================================================

    const correoUsuario =
        document.getElementById("correoUsuario");

    if (correoUsuario) {
        correoUsuario.textContent = usuario.correo;
    }


    const nombreUsuario =
        document.getElementById("nombreUsuario");

    if (nombreUsuario) {

        nombreUsuario.textContent =
            `${usuario.nombres} ${usuario.ap_paterno}`;
    }


    const rolUsuario =
        document.getElementById("rolUsuario");

    if (rolUsuario) {
        rolUsuario.textContent = rol.nombre;
    }


    const escuelaUsuario =
        document.getElementById("escuelaUsuario");

    if (escuelaUsuario) {
        escuelaUsuario.textContent =
            escuela.nombre_escuela;
    }


    console.log("Usuario:", usuario);
    console.log("Rol:", rol.nombre);
    console.log("Escuela:", escuela.nombre_escuela);


    // =========================================================
    // OPCIONES DE ADMINISTRADOR
    // =========================================================

    const opcionUsuarios =
        document.getElementById("opcionUsuarios");

    if (opcionUsuarios) {

        if (rol.nombre !== "Administrador") {

            opcionUsuarios.style.display = "none";
        }
    }


    // =========================================================
    // CERRAR SESIÓN
    // =========================================================

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