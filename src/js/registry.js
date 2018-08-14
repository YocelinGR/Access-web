// Variable de firebase
let DB = initiaziling();
let buttonPhoto = document.getElementById('photo');
let buttonRegistry = document.getElementById('registry');

/*const soprteDeBrowser = () =>{
	return !!(navigator.getUserMedia || (navigator.mozGetUserMedia ||  navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia)
}
// comprueva el servidor
const getUserMedia = () => {
	return (navigator.getUserMedia || (navigator.mozGetUserMedia ||  navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);
}

const takePhoto = () => {
	if (soprteDeBrowser()) {
	getUserMedia(
			{video: true},
			function (stream) {
					console.log("Permiso concedido");
			}, function (error) {
					console.log("Permiso denegado o error: ", error);
			});
} else {
	alert("Lo siento. Tu navegador no soporta esta característica");
}
}*/
const clearRegistry = () => {
	document.getElementById('full-name').value = '';
	document.getElementById('email').value = '';
	document.getElementById('company').length = 0;
	document.getElementById('host_name').value = '';
	document.getElementById('reason_visit').value = '';
}
// Funcion para crear nuevos registros
const createRegistry = () => {
	let registryName = document.getElementById('full-name').value
	let registryEmail = document.getElementById('email').value;
	let registryCompany = document.getElementById('company').value;
	let registryHost = document.getElementById('host_name').value;
	let reasonVisit = document.getElementById('reason_visit').value;
	let date = new Date();
	DB.collection('visitors').add({
		fullNmae : registryName,
		email : registryEmail,
		company: registryCompany,
		host: registryHost,
		reasonVisit: reasonVisit,
		cita : date
		// idVisitor : idUser
	})
	.then(function(docRef) {
		console.log('Registro de visita');
	  let idUser = docRef.id;
		console.log(idUser);
		clearRegistry();
<<<<<<< HEAD
		//generetePDF();
		 window.location.assign('../views/success.html');
=======
		generetePDF(idUser);
		window.location.assign('../views/success.html');
>>>>>>> upstream/master
	})
	.catch(function(error) {
		console.log('Error: no se concreto el registro', error);
		alert('Error de registro');
	});
};

const generetePDF = (idUser) => {
	DB.collection('visitors').onSnapshot((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			if (doc.id === idUser ) {
				console.log(`${doc.id} => ${doc.data()}`);
			} else {
				console.log('ID no disponible para este usuario');
			}
		});
	});
}

buttonRegistry.addEventListener('click', (event) => {
	createRegistry();
});

buttonPhoto.addEventListener('click', (event) => {
	window.location.assign("../views/photo.html");
});
