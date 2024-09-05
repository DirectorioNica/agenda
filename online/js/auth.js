function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    Parse.User.logIn(username, password).then(user => {
        // Login exitoso, redirige a la página principal
        window.location.href = "registro.html";
    }).catch(error => {
        // Mostrar error si el login falla
        document.getElementById('error-msg').textContent = "Usuario o contraseña incorrectos.";
        console.error("Login failed:", error);
    });
}

function checkAuth() {
    // Verificar si el usuario está logueado
    if (!Parse.User.current()) {
        // Si no está autenticado, redirigir al login
        window.location.href = "login.html";
    }
}

function register() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);

    user.signUp().then(user => {
        // Registro exitoso, redirigir al login
        window.location.href = "login.html";
    }).catch(error => {
        // Mostrar error si el registro falla
        document.getElementById('register-error-msg').textContent = "Error al registrar usuario.";
        console.error("Registration failed:", error);
    });
}

function logout() {
    Parse.User.logOut().then(() => {
        // Redirigir al login después de cerrar sesión
        window.location.href = "login.html";
    });
}
