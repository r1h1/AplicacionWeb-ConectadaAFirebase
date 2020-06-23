/*CODIGO CONEXIÓN A FIREBASE*/
firebase.initializeApp({
    apiKey: 'AIzaSyAb-S7K9RpBbg1DME_-3XDjyTyJSFvsbsI',
    authDomain: 'a-pplication.firebaseapp.com',
    projectId: 'a-pplication'
});
var db = firebase.firestore();

/*INSERT A LA BASE DE DATOS DEL BOTON RESERVAR*/
function reservar() {
    var nombre = document.getElementById('nombre').value;
    var fecha = document.getElementById('fecha').value;
    var hora = document.getElementById('hora').value;
    var telefono = document.getElementById('telefono').value;

    db.collection("citas_registradas").add({
        nombre: nombre,
        fecha: fecha,
        hora: hora,
        telefono: telefono
    })
        .then(function (docRef) {
            alert('La cita se agendó correctamente, recargue la pagina')
            console.log("El documento se escribió con ID en Firebase: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('fecha').value = '';
            document.getElementById('hora').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('nombre').focus();
        })
        .catch(function (error) {
            console.error("Error al añadir el documento en Firebase: ", error);
        });
}

/*FUNCION PARA MOSTRAR UN ALERT DE POR QUE NECESITAMOS QUE INGRESES EL NUMERO DE TELEFONO*/
function telefonoinfo() {
    alert('NECESITAMOS CONOCER TU NÚMERO DE TELÉFONO PARA CUALQUIER EMERGENCIA QUE SE PRESENTE, EN DADO CASO NO ESTÉ ABIERTO EL SALÓN O UN PERCANCE MAYOR, SE TE CONTACTARÁ AL NÚMERO DE TELÉFONO QUE REGISTRES, TODA LA INFORMACIÓN ESTÁ ALOJADA EN UNA BASE DE DATOS ENCRIPTADA CON SEGURIDAD SSL, ASÍ QUE TUS DATOS NO SERÁN EXPUESTOS, PRESIONA ACEPTAR PARA SALIR.')
}

/*LEER DATOS DE FIRESTORE*/
var tabla = document.getElementById('tabla');
db.collection("citas_registradas").orderBy("fecha", "asc").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += ` 
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fecha}</td>
        <td>${doc.data().hora}</td>
        <td>${doc.data().telefono}</td>
        <td><button class="btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fecha}','${doc.data().hora}','${doc.data().telefono}')">Editar</button></td>
        </tr>`
    });
});

/*BORRAR DOCUMENTOS DE FIRESTORE*/
function eliminar(id) {
    db.collection("citas_registradas").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

/*ACTUALIZAR DOCUMENTOS DE FIRESTORE*/
function editar(id, nombre, fecha, hora, telefono) {

    document.getElementById('nombre').value = nombre;
    document.getElementById('fecha').value = fecha;
    document.getElementById('hora').value = hora;
    document.getElementById('telefono').value = telefono;
    var botonr = document.getElementById('botonr');
    botonr.innerHTML = 'Editar los campos';
    botonr.onclick = function () {

        var update = db.collection('citas_registradas').doc(id);
        var nombre = document.getElementById('nombre').value;
        var fecha = document.getElementById('fecha').value;
        var hora = document.getElementById('hora').value;
        var telefono = document.getElementById('telefono').value;

        return update.update({
            nombre: nombre,
            fecha: fecha,
            hora: hora,
            telefono: telefono
        })
            .then(function () {
                console.log("Document successfully update!");
                botonr.innerHTML = 'Reservar Cita';
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
            });
    }
}

/*CANCELAR*/
function cancel() {
    document.getElementById('nombre').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('nombre').focus();
}

/*BUSCAR CLIENTE NOMBRE*/
function buscarnombre() {
    var nombre_cliente = document.getElementById("buscar_cliente").value;
    if (nombre_cliente == '') {
        var tabla = document.getElementById('tabla');
        db.collection("citas_registradas").orderBy("fecha", "asc").onSnapshot((querySnapshot) => {
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().nombre}`);
                tabla.innerHTML += ` 
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fecha}</td>
        <td>${doc.data().hora}</td>
        <td>${doc.data().telefono}</td>
        <td><button class="btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fecha}','${doc.data().hora}','${doc.data().telefono}')">Editar</button></td>
        </tr>`
            });
        });
    }
    else {
        var tabla = document.getElementById('tabla');
        db.collection("citas_registradas").where("nombre", "==", nombre_cliente).onSnapshot((querySnapshot) => {
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().nombre}`);
                tabla.innerHTML += ` 
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fecha}</td>
        <td>${doc.data().hora}</td>
        <td>${doc.data().telefono}</td>
        <td><button class="btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fecha}','${doc.data().hora}','${doc.data().telefono}')">Editar</button></td>
        </tr>`
            });
        });
    }
}

/*BUSCAR CLIENTE FECHA*/
function buscarfecha() {
    var nombre_cliente = document.getElementById("buscar_cliente").value;
    if (nombre_cliente == '') {
        var tabla = document.getElementById('tabla');
        db.collection("citas_registradas").orderBy("fecha", "asc").onSnapshot((querySnapshot) => {
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().nombre}`);
                tabla.innerHTML += ` 
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fecha}</td>
        <td>${doc.data().hora}</td>
        <td>${doc.data().telefono}</td>
        <td><button class="btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fecha}','${doc.data().hora}','${doc.data().telefono}')">Editar</button></td>
        </tr>`
            });
        });
    }
    else {
        var tabla = document.getElementById('tabla');
        db.collection("citas_registradas").where("fecha", "==", nombre_cliente).onSnapshot((querySnapshot) => {
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().nombre}`);
                tabla.innerHTML += ` 
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fecha}</td>
        <td>${doc.data().hora}</td>
        <td>${doc.data().telefono}</td>
        <td><button class="btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fecha}','${doc.data().hora}','${doc.data().telefono}')">Editar</button></td>
        </tr>`
            });
        });
    }
}

/*BUSCAR CLIENTE HORA*/
function buscarhora() {
    var nombre_cliente = document.getElementById("buscar_cliente").value;
    if (nombre_cliente == '') {
        var tabla = document.getElementById('tabla');
        db.collection("citas_registradas").orderBy("fecha", "asc").onSnapshot((querySnapshot) => {
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().nombre}`);
                tabla.innerHTML += ` 
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fecha}</td>
        <td>${doc.data().hora}</td>
        <td>${doc.data().telefono}</td>
        <td><button class="btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fecha}','${doc.data().hora}','${doc.data().telefono}')">Editar</button></td>
        </tr>`
            });
        });
    }
    else {
        var tabla = document.getElementById('tabla');
        db.collection("citas_registradas").where("hora", "==", nombre_cliente).onSnapshot((querySnapshot) => {
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().nombre}`);
                tabla.innerHTML += ` 
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fecha}</td>
        <td>${doc.data().hora}</td>
        <td>${doc.data().telefono}</td>
        <td><button class="btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fecha}','${doc.data().hora}','${doc.data().telefono}')">Editar</button></td>
        </tr>`
            });
        });
    }
}

/*BUSCAR CLIENTE TELEFONO*/
function buscartelefono() {
    var nombre_cliente = document.getElementById("buscar_cliente").value;
    if (nombre_cliente == '') {
        var tabla = document.getElementById('tabla');
        db.collection("citas_registradas").orderBy("fecha", "asc").onSnapshot((querySnapshot) => {
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().nombre}`);
                tabla.innerHTML += ` 
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fecha}</td>
        <td>${doc.data().hora}</td>
        <td>${doc.data().telefono}</td>
        <td><button class="btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fecha}','${doc.data().hora}','${doc.data().telefono}')">Editar</button></td>
        </tr>`
            });
        });
    }
    else {
        var tabla = document.getElementById('tabla');
        db.collection("citas_registradas").where("telefono", "==", nombre_cliente).onSnapshot((querySnapshot) => {
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().nombre}`);
                tabla.innerHTML += ` 
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fecha}</td>
        <td>${doc.data().hora}</td>
        <td>${doc.data().telefono}</td>
        <td><button class="btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fecha}','${doc.data().hora}','${doc.data().telefono}')">Editar</button></td>
        </tr>`
            });
        });
    }
}

