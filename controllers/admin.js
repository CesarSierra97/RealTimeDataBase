//FUNCION Registrar usuarios desde mensaje emergente
function registrarUsuario() {
    let op = 1;
    //TIPO DOCUMENTO - While para validacion de datos 
    let tipoDoc = "";
    let doc = "";
    while (doc !== "1" && doc !== "2" && doc !== "3" && doc !== "4") {
        doc = prompt("Digite el tipo de documento\n 1. Cedula de ciudadania\n 2. Tarjeta de identidad\n 3. Registro Civil\n 4. Pasaporte");
        switch (doc) {
            case "1":
                tipoDoc = "Cedula de ciudadania"
                break;
            case "2":
                tipoDoc = "Tarjeta de identidad"
                break;
            case "3":
                tipoDoc = "Registro Civil"
                break;
            case "4":
                tipoDoc = "Pasaporte"
                break;
            default:
                alert("Opción inválida. Por favor, ingresa una opción válida.");
                break;
        }
    }
    //NUMERO DOCUMENTO - for para validar datos y metodo test verificar que sea numerico
    var op1;
    for (; ;) {
        op1 = prompt("Digite el numero de documento");
        if (op1 !== "") {
            var esNumero = /^\d+$/.test(op1);
            if (esNumero) {
                // El valor ingresado es un número
                //console.log("Se ingresó un número válido: " + valor);
                colection = op1//parseInt(op1)+1;
                documentoIdentidad = op1;

                break;
            } else {
                // El valor ingresado no es un número
                alert("¡ERROR! \ndocumento de identidad invalido.");
            }
        } else {
            alert("Opción inválida. \nPor favor, ingresa un dato.");
        }
    }
    //ROL DE USUARIO - While para validacion de datos 
    let tipoRol = "";
    let doc1 = "";
    while (doc1 !== "1" && doc1 !== "2") {
        doc1 = prompt("Digite el tipo de rol que desea asignar a los uduarios\n 1. Administrador\n 2. Usuario Comun");
        switch (doc1) {
            case "1":
                tipoRol = "Admin"
                break;
            case "2":
                tipoRol = "Usuario normal"
                break;
            default:
                alert("Opción inválida. Por favor, seleccione un rol.");
                break;
        }
    }
    //NOMBRE DE USUARIO - Do While para validacion de datos 
    let nombre;
    do {
        nombre = prompt("Digite los nombres del usuario")
        var esTexto = /^[A-Za-z- ]+$/.test(nombre);
        if (nombre !== "") {
            if (esTexto) {
                // El valor ingresado es texto
                //console.log("Se ingresó un texto válido: " + valor);
                nombre = nombre;
                break;
            } else {
                // El valor ingresado no es texto
                alert("El valor ingresado no es un texto válido.");
            }
        } else {
            alert("El valor ingresado no es un texto válido.");
        }
    } while (nombre !== "");
    //APELLIDO DE USUARIO - Do While para validacion de datos 
    let apoellido;
    do {
        apoellido = prompt("Digite los apellidos del usuario")
        var esTexto = /^[A-Za-z- ]+$/.test(apoellido);
        if (apoellido !== "") {
            if (esTexto) {
                // El valor ingresado es texto
                //console.log("Se ingresó un texto válido: " + valor);
                apoellido = apoellido;
                break;
            } else {
                // El valor ingresado no es texto
                alert("El valor ingresado no es un texto válido.");
            }
        } else {
            alert("El valor ingresado no es un texto válido.");
        }
    } while (apoellido !== "");
    //ENIVAR A LA BD Firebase Documento y campos que se agregara a la coleccion usuarios 
    let documento = {
        'documento': documentoIdentidad,
        'tipoDocumento': tipoDoc,
        'nombres': nombre,
        'apellidos': apoellido,
        'rol': tipoRol,
        'password': prompt("Asigne una contraseña\nPuede utilizar letras y numeros")
    };
    firebase.database().ref('Usuarios/' + colection).set(documento);
}

//FUNCION Registrar Usuario desde formulario
function registrarUsuarioForm() {
    let nombre = document.getElementById('nombres').value;
    let apellido = document.getElementById('apellidos').value;
    let tipoDoc = document.getElementById('opcion').value;
    let Docu = document.getElementById('documento').value;
    let colection = Docu;
    if (Docu.trim() === "" || nombre.trim() === "" || apellido.trim() === "" || tipoDoc.trim() === "") {
        alert('Por favor, complete todos los campos obligatorios.');
        return false; // Evitar el envío del formulario si hay campos vacíos
    }
    //ENIVAR A LA BD Firebase Documento y campos que se agregara a la coleccion usuarios 
    let documento = {
        'documento': Docu,
        'tipoDocumento': tipoDoc,
        'nombres': nombre,
        'apellidos': apellido,
        //'rol': tipoRol,
        //'password': prompt("Asigne una contraseña\nPuede utilizar letras y numeros")
    };
    firebase.database().ref('Usuarios/' + colection).set(documento);
    //Restablecer el formulario flotante
    // Obtener el formulario por su ID
    let form = document.getElementById('formularioForm');
    // Restablecer los campos del formulario
    form.reset()
    alert("Registro Exitoso")
    return true; // Permitir el envío del formulario si todos los campos están completos

}


/*FUNCION Y VERIFICACION DE USUARIO*/
//FUNCION Listar un usuario
function listarUsuario() {
    const database = firebase.database();
    const usersRef = database.ref('Usuarios');
    let article_id = prompt("Digite el documento del usuario que desa consultar");
    usersRef.child(article_id).once('value', (snapshot) => {
        if (snapshot.exists()) {
            //Si existe continua con el proceso...
            firebase.database().ref('Usuarios/' + article_id).once('value').then(
                function (snapshot) {
                    var nombres = snapshot.val().nombres;
                    var apellidos = snapshot.val().apellidos;
                    var tipoDoc = snapshot.val().tipoDocumento;
                    var tipoRol = snapshot.val().rol;
                    var docc = snapshot.val().documento;
                    alert("**Datos consultaos**\t\nNombres: " + nombres + "\nApellidos: " + apellidos + "\nTipo documento: " + tipoDoc + "\nNumero identificación: " + docc + "\nRol definido: " + tipoRol);
                }
            )
        } else {
            alert('El usuario no existe');
        }
    });
}

//FUNCION Actualizar Usuario
function actualizarUsuario() {
    const database = firebase.database();
    const usersRef = database.ref('Usuarios');
    let userId = prompt("Digite el documento, del usuario que desea actualizar");
    // Verificar la existencia del usuario
    usersRef.child(userId).once('value', (snapshot) => {
        if (snapshot.exists()) {
            //Si existe continua con el proceso...
            let userRef = usersRef.child(userId);
            let op = "";
            let nuevoDato = "";
            while (op !== "1" && op !== "2" && op !== "3" && op !== "4") {
                op = prompt("Seleccione el campo que desea modificar:\n 1. Nombres\n 2. Apellidos \n 3 Documento\n 4. Password");
                switch (op) {
                    case "1":
                        nuevoDato = prompt("Digite el dato nuevo");
                        userRef.update({ nombres: nuevoDato })
                            .then(() => {
                                alert('Nombre actualizado correctamente');
                            })
                            .catch((error) => {
                                console.error('Error al actualizar el campo:', error);
                            });
                        break;
                    case "2":
                        nuevoDato = prompt("Digite el dato nuevo");
                        userRef.update({ apellidos: nuevoDato })
                            .then(() => {
                                alert('Apellido actualizado correctamente');
                            })
                            .catch((error) => {
                                console.error('Error al actualizar el campo:', error);
                            });
                        break;
                    case "3":
                        nuevoDato = prompt("Digite el dato nuevo");
                        userRef.update({ documento: nuevoDato })
                            .then(() => {
                                alert('Documento actualizado correctamente');

                            })
                            .catch((error) => {
                                console.error('Error al actualizar el campo:', error);
                            });
                        break;
                    case "4":
                        nuevoDato = prompt("Digite la nueva contraseña");
                        userRef.update({ password: nuevoDato })
                            .then(() => {
                                alert('Contraseña actualizada correctamente');
                            })
                            .catch((error) => {
                                console.error('Error al actualizar el campo:', error);
                            });
                        break;
                    default:
                        alert("Opción inválida. Por favor, ingresa una opción válida.");
                        break;
                }
            }
        } else {
            alert('El usuario no existe');
        }
    });
}

//FUNCION Eliminar Usuario
function eliminarUsuario() {
    const database = firebase.database();
    const usersRef = database.ref('Usuarios');
    let userId = prompt("Digite el documento, del usuario que desea eliminar");
    // Verificar la existencia del usuario
    usersRef.child(userId).once('value', (snapshot) => {
        if (snapshot.exists()) {
            const userRef = usersRef.child(userId);
            userRef.remove()
                .then(() => {
                    alert('Usuario eliminado correctamente');
                })
                .catch((error) => {
                    console.error('Error al eliminar el usuario:', error);
                });
        } else {
            // El usuario no existe, manejar el caso apropiadamente
            alert('El usuario no existe');
        }
        //ELIMINAR DATO ESPESIFICO**
        //   userRef.child('campo2').remove()
        //     .then(() => {
        //       console.log('Campo eliminado correctamente');
        //     })
        //     .catch((error) => {
        //       console.error('Error al eliminar el campo:', error);
        //     });
    });
}


// //FUNCION para listar varios uduarios ***********NO FUNCIONA***********
// function listarTodos(){
// var usuariosRef = firebase.database().ref('Usuarios/');

// usuariosRef.on('value', function(snapshot) {
//     var usuarios = snapshot.val();

//     // Iterar sobre los usuarios y realizar acciones
//     Object.keys(usuarios).forEach(function(key) {
//       var usuario = usuarios[key];
//       alter(usuario);
//       // Realizar acciones con cada usuario
//     });
//   });
// }

