// Inicializar Firebase. Información sobre permisos y dominios del proyecto
const initiaziling = () => {
  const config = {
    apiKey: "AIzaSyBBDiz0Y0txHPs545Dg2CfLVjv2OqtBh8Q",
    authDomain: "accessweb-a2915.firebaseapp.com",
    databaseURL: "https://accessweb-a2915.firebaseio.com",
    projectId: "accessweb-a2915",
    storageBucket: "accessweb-a2915.appspot.com",
    messagingSenderId: "988538917649"
  };
	// Inicializa la app web con las credenciales del proyecto "diabetipsoficials"
  firebase.initializeApp(config);
  // Añadir variable para referenciar todos los metodos de la base de datos
  console.log(firebase);
  const db = firebase.firestore();
  return (db);
};
