async function obtenerUsuarioActual() {

    console.log("🔎 Comprobando sesión...");

    const {
        data: { session },
        error: sessionError
    } = await clienteSupabase.auth.getSession();

    console.log("Sesión:", session);
    console.log("Error sesión:", sessionError);

    if (sessionError) {
        console.error("Error al obtener sesión:", sessionError);
        return null;
    }

    if (!session) {
        console.error("❌ No existe una sesión activa");
        return null;
    }

    const authUser = session.user;

    console.log("✅ Usuario de Auth:", authUser.id);
    console.log("📧 Correo Auth:", authUser.email);

    const {
        data: usuario,
        error: usuarioError
    } = await clienteSupabase
        .from("usuarios")
        .select(`
            id,
            auth_user_id,
            nombres,
            ap_paterno,
            ap_materno,
            correo,
            num_celular,
            activo,
            rol_id,
            escuela_id,
            roles (
                id,
                nombre
            ),
            escuelas (
                id,
                nombre_escuela
            )
        `)
        .eq("auth_user_id", authUser.id)
        .single();

    console.log("Usuario encontrado:", usuario);
    console.log("Error usuario:", usuarioError);

    if (usuarioError) {
        console.error("❌ No se pudo obtener el usuario de la tabla usuarios");
        return null;
    }

    if (!usuario.activo) {

        console.warn("⚠️ El usuario está desactivado");

        await clienteSupabase.auth.signOut();

        alert("Tu usuario se encuentra desactivado.");

        window.location.href = "login.html";

        return null;
    }

    console.log("✅ Usuario válido");
    console.log("Rol:", usuario.roles);
    console.log("Escuela:", usuario.escuelas);

    return {
        auth: authUser,
        usuario: usuario,
        rol: usuario.roles,
        escuela: usuario.escuelas
    };
}