let DB = initializing();
const print = () => {
  let showPeople = document.getElementById('showPeople');
  DB.collection('visitors').onSnapshot((querySnapshot) => {
    showPeople.innerHTML = '';
    querySnapshot.forEach((doc) => {
      showPeople.innerHTML += `<table>
        <thead>
          <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Empresa que visita</th>
              <th>Host</th>
              <th>Razon de visita</th>
              <th>Cita</th>
              <th>Salida</th>
              <th>Registra salida</th>
          </tr>
        </thead>

        <tbody>
          <tr>
          <td>${doc.data().fullNmae}</td>
          <td>${doc.data().email}</td>
          <td>${doc.data().company}</td>
          <td>${doc.data().host}</td>
          <td>${doc.data().reasonVisit}</td>
          <td>${doc.data().cita}</td>
          <td>${doc.data().citaOut}</td>
          <td><button class = "btn" onclick = "editOut('${doc.id}','${doc.data()}')">Salida</button></td>
          </tr>
        </tbody>
      </table>`;
    });
  });
};


const editOut = (id, data) => {
  let btn = document.getElementByClassName('btn');
  btn.onclick = () =>{
    let dataOut = new Date();
    let userEdited = DB.collection('visitors').doc(id);
    return userEdited.update({
      fullNmae: doc.data().registryName,
      email: doc.data().registryEmail,
      company: doc.data().registryCompany,
      host: doc.data().registryHost,
      reasonVisit: doc.data().reasonVisit,
      cita: doc.data().date,
      citaOut: dataOut
    })
    .then(function() {
        console.log('Document successfully updated!');
        btn.innerHTML = 'Guardado';
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
};
let start = document.getElementById('start');
start.addEventListener('click', (event) => {
  print();
});
