const loginForm = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

loginForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value;

    mensaje.textContent = 'Iniciando sesión...';

    try {

        const { data, error } = await clienteSupabase.auth.signInWithPassword({
            email: correo,
            password: password
        });

        if (error) {
            console.error('Error de inicio de sesión:', error);
            mensaje.textContent = 'Correo o contraseña incorrectos.';
            return;
        }

        console.log('Usuario autenticado:', data.user);

        window.location.href = 'dashboard.html';

    } catch (error) {

        console.error(error);
        mensaje.textContent = 'Ocurrió un error al iniciar sesión.';

    }
});


async function comprobarSupabase() {

    const { data, error } = await clienteSupabase.auth.getSession();

    if (error) {
        console.error('❌ Error de Supabase:', error);
        return;
    }

    console.log('✅ Supabase conectado correctamente');
    console.log('Sesión actual:', data.session);
}

comprobarSupabase();