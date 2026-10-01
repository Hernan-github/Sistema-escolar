document.addEventListener("DOMContentLoaded", () => {

    console.log("Control Financiero APF iniciado");

    // Botón de iniciar sesión
    const botonesLogin = document.querySelectorAll(
        'a[href="pages/login.html"]'
    );

    botonesLogin.forEach((boton) => {

        boton.addEventListener("click", () => {
            console.log("Redirigiendo al inicio de sesión...");
        });

    });

});