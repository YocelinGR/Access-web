// Variable de firebase
const DB = initiaziling(); // Para cloud Firestore
let buttonRegistry = document.getElementById('registry');
const clearRegistry = (idUser) => {
  document.getElementById('full-name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('company').length = 0;
  document.getElementById('host_name').value = '';
  document.getElementById('reasonVisit').value = '';
  window.location.assign('../views/photo.html');
};
// Funcion para crear nuevos registros
const createRegistry = () => {
  const registryName = document.getElementById('full-name').value;
  const registryEmail = document.getElementById('email').value;
  const registryCompany = document.getElementById('company').value;
  const registryHost = document.getElementById('host_name').value;
  const reasonVisit = document.getElementById('reasonVisit').value;
  const date = new Date();
  DB.collection('visitors').add({
    fullNmae: registryName,
    email: registryEmail,
    company: registryCompany,
    host: registryHost,
    reasonVisit,
    cita: date,
  })
    .then((docRef) => {
      console.log('Registro de visita');
	  const idUser = docRef.id;
      console.log(idUser);
      clearRegistry(idUser);
      //window.location.assign('../views/success.html');
    })
    .catch((error) => {
      console.log('Error: no se concreto el registro', error);
      alert('Error de registro');
    });
};
// Eventos de escucha de idUser
buttonRegistry.addEventListener('click', (event) => {
  createRegistry();
});
