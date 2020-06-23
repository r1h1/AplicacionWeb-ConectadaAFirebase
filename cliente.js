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
    if (nombre == '') {
        alert('Debe llenar su nombre para guardar su cita');
    }
    else if (fecha == '') {
        alert('Debe llenar la fecha para guardar su cita');
    }
    else if (hora == '') {
        alert('Debe llenar la hora para guardar su cita');
    }
    else if (telefono == '') {
        alert('Debe llenar su telefono para guardar su cita, si quiere saber por qué pedimos su número de teléfono de click en el botón celeste');
    }
    else {
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
        </tr>`
    });
});

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
                </tr>`
            });
        });
    }
}
