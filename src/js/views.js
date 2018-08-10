// Variable de firebase
let DB = initiaziling();
let userSpace = document.getElementById('userSpace');
let showUsers = document.getElementById('showUsers');
const show = () => {
  userSpace.innerHTML = '';
  let templetes = '';
  DB.collection('visitors').onSnapshot((querySnapshot) => {
		querySnapshot.forEach((doc) => {
    templetes += `<div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="../image/user.png">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${doc.data().fullNmae}<i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${doc.data().fullNmae}<i class="material-icons right">close</i></span>
      <p>Cita: ${doc.data().cita}</p>
      <p>Compañia: ${doc.data().company}</p>
      <p>Email: ${doc.data().email}</p>
      <p>Visita a: ${doc.data().host}</p>
      <p>Proposito: ${doc.data().reasonVisit}</p>
    </div>
  </div>`;
  });
  userSpace.innerHTML = templetes;
	});
}

showUsers.addEventListener('click', (event) => {
	show();
});
