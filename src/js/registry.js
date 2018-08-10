// Variable de firebase
let DB = initiaziling();
let buttonPhoto = document.getElementById('photo');
let buttonRegistry = document.getElementById('registry');

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
	// let selectedCompany = registryCompany.selected;
	console.log(date);

	DB.collection('visitors').add({
		fullNmae : registryName,
		email : registryEmail,
		company: registryCompany,
		host: registryHost,
		reasonVisit: reasonVisit,
		cita : date
	})
	.then(function(docRef) {
		console.log('Registro de visita');
		clearRegistry();
		generetePDF();
		// window.location.assign('../views/success.html');
	})
	.catch(function(error) {
		console.log('Error: no se concreto el registro', error);
		alert('Error de registro');
	});
};

const generetePDF = () => {
	DB.collection('visitors').onSnapshot((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`);
		});
	});
}

buttonRegistry.addEventListener('click', (event) => {
	createRegistry();
});