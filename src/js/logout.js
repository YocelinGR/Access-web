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
          <td><button class = "btn" onclick = "editOut('${doc.id}')">Salida</button></td>
          </tr>
        </tbody>
      </table>`;
    });
  });
};

const editOut = (id) => {
  let btn = document.getElementByClassName('btn');
  bootstrapcdn.onclick = () =>{
    let dataOit = new Date();
    
  }
}
