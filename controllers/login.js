//LOGIN
//funcion para consular los datos en firebase, mediante un Login
function ingresarLogin(){

    let documento = document.getElementById('usuario').value;
    let password  = document.getElementById('password').value;

    firebase.database().ref('Usuarios/'+documento).once('value').then(
        function (result) {
            if(result){
                let rol = result?.val()?.rol;
                let title = result?.val()?.password;
                if(rol=="Admin"){
                    if(password == title){
                        window.location.href="admin.html" //REDIRECCIONA A LA VISTA DEL ADMIN
                    }else{
                        alert('Datos erroneos');
                    }
                }
                else{
                    if(password == title){
                        document.getElementById('Ingreso').textContent='BIENVENIDO USER BASIC.';
                    }else{
                        alert('Datos erroneos');
                    }
                }
            }
            else{
                alert('Datos erroneos desde la coleccion');
            }
        }
    )
}
