document.addEventListener("DOMContentLoaded", async () => {

    // Comprobar si existe una sesión activa
    const {
        data: { session },
        error
    } = await clienteSupabase.auth.getSession();

    // Si hubo un error o no hay sesión
    if (error || !session) {
        window.location.href = "login.html";
        return;
    }

    // Usuario autenticado
    const usuario = session.user;

    console.log("Usuario autenticado:", usuario.email);

    // Mostrar correo del usuario
    const correoUsuario = document.getElementById("correoUsuario");

    if (correoUsuario) {
        correoUsuario.textContent = usuario.email;
    }


    // Botón cerrar sesión
    const btnCerrarSesion =
        document.getElementById("btnCerrarSesion");

    if (btnCerrarSesion) {

        btnCerrarSesion.addEventListener("click", async () => {

            const { error } =
                await clienteSupabase.auth.signOut();

            if (error) {
                console.error(
                    "Error al cerrar sesión:",
                    error
                );

                alert("No se pudo cerrar la sesión.");
                return;
            }

            // Regresar al login
            window.location.href = "login.html";
        });
    }

});