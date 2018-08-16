let storage = firebase.storage(); // Inizializa conexion con firebase en storage(almacenar imagenes)
// Obtenemos todos los elementos que necesitaremos desde el DOM
let continueNow = document.getElementById('continueNow'); // Boton contina
let video = document.querySelector('#camera-stream'); // elemento de grabado/camara
let image = document.querySelector('#snap');// Elemento para capturar imagen
let start_camera = document.querySelector('#start-camera');// Inizializa camara/ñpara mobiles
let controls = document.querySelector('.controls');// Elentos de captura
let take_photo_btn = document.querySelector('#take-photo'); // toma foto
let delete_photo_btn = document.querySelector('#delete-photo');// elimina foto
let download_photo_btn = document.querySelector('#download-photo');// descarga foto
let error_message = document.querySelector('#error-message');// Mensaje de error
/* Utilizamos la funcion getUserMedia para obtener la salida de la webcam. Pide permisos al usuario
para usar la camara y/o microfono, cuando esta peticion se aceota, se ejecuta un succesCallback en la aplicacion,
esta tendrá un localMediaStream (api de captura de tracks o streams de video y audio) como argumento.
webkit:  plataforma para aplicaciones que funciona como base para el navegador web Safari, Opera y Chrome
moz: para permisos de mozilla y firefox*/
navigator.getMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia);
// Solicita  los permisos de uso de la camara.
if(!navigator.getMedia){
  // Muestra error si de denegaron los permisos
  displayErrorMessage("Tu navegador no soporta la funcion getMedia.");
}
else{ // Solicitud aprovada
  // Solicitamos la camara
  navigator.getMedia(
    { // Primer parámetro del getMedia: restricciones (contrains). Habilita el tipo
      // multimedia que soportara el objeto localMediaStream que sera devuelto en el succesCallback
      video: true // Permite uso del objeto video
    },
    // Funcion de finalizacion (succesCallback). Se invoca al pasar el objeto stream
    (stream) => {
      // A nuestro componente video le establecemos el src al stream de la webcam
      video.src = window.URL.createObjectURL(stream); // crea un DOMString que contiene una URL que representa al objeto pasado como parámetro. La vida de la URL está ligado al document de la ventana en la que fue creada.
      // Reproducimos el video
      video.play(); // comienza a reproducir el video
      video.onplay = function() { // El evento ocurre cuando el video asido iniciado
        showVideo(); // Acciones que ejecuta cuando ocurre el evento
      };
    },
    // ErrorCallback. Se invoca cuando falla la llamda succesCallback
    (err) => {
      displayErrorMessage("Ocurrio un error al obtener el stream de la webcam: " + err.name, err);
    }
  );
}
// En los moviles no se puede reproducir el video automaticamente, programamos funcionamiento del boton inicar camara
start_camera.addEventListener("click", (event) => {

  event.preventDefault(); // método que detiene la acción predeterminada de un elemento.
  // Reproducimos manualmente
  video.play(); // Comienza la accion del video
  showVideo(); // Se ejecutan acciones
});
take_photo_btn.addEventListener("click", (event) => {
  event.preventDefault();
  let snap = takeSnapshot(); // Guarda la captura de pantalla
  // Mostramos la imagen
  image.setAttribute('src', snap); // agrega el atributo especificado a un elemento y le da el valor especificado src-> snap
  // Hace que la imagen sea visible en pantalla
  image.classList.add("visible"); // La propiedad classList devuelve el nombre (s) de clase del elemento, add, agrega un nombre de clase al elemento
  // Activamos los botones de eliminar foto y descargar foto
  // Desactiva la funcionalidad de los botones de eleminar y descargar
  delete_photo_btn.classList.remove("disabled");
  download_photo_btn.classList.remove("disabled");
  // Establecemos el atributo href para el boton de descargar imagen
  download_photo_btn.href = snap; // Hace referencia de descarga al elemento snap que contiene la captura
  // Pausamos el stream de video de la webcam
  video.pause(); // Pausa el video si ya se tiene una accion de captura
});

// evento de eliminar una captura
delete_photo_btn.addEventListener("click", (event) => {
  event.preventDefault();
  // Ocultamos la imagen
  image.setAttribute('src', ""); // Quita la fuente de la imagen
  image.classList.remove("visible"); // Deja de hacer visible la captura de pantalla
  // Deshabilitamos botones de descargar y eliminar foto
  delete_photo_btn.classList.add("disabled");
  download_photo_btn.classList.add("disabled");
  // Reanudamos la reproduccion de la webcam
  video.play();

});
// Acciones de ejecucion para el video
const showVideo = () => {
  // Mostramos el stream de la webcam
  hideUI(); // Limpia los botones e imagenes
  // Activa los botones de accion sobre la camara
  video.classList.add("visible");
  controls.classList.add("visible");
}

// Toma la captura
const takeSnapshot = () => {
  let hidden_canvas = document.querySelector('canvas'),
      context = hidden_canvas.getContext('2d'); // retorna un contexto de dibujo en el lienzo(2d->imagen)
  let width = video.videoWidth, // asigna el ancho de la imagen igual al que tiene el video
      height = video.videoHeight; // asigna la altura de la imagen igual al que tiene el video
  if (width && height) {
    // Configuramos el canvas con las mismas dimensiones que el video
    hidden_canvas.width = width;
    hidden_canvas.height = height;
    // Hacemos una copia
    context.drawImage(video, 0, 0, width, height); // Dibuja imagen en el canvas y coloca la imagen en el lienzo y especifique el ancho y el alto de la imagen (img,x,y,width,height)
    // Convertimos la imagen del canvas en datarurl
    let picture = hidden_canvas.toDataURL('image/png'); // devuelve un data URI el cual contiene una representación de la imagen (por defecto es PNG)
    return hidden_canvas.toDataURL('image/png');
  }
}
const  displayErrorMessage = (error_msg, error) => {
  // Si hay un error o no hay respuesta manda el error
  error = error || "";
  if(error){
    console.log(error);
  }
  // Genera un pantalla DOM el mensaje de error , limpia los botones y visibiliza el espacio en dom para el mensaje (p)
  error_message.innerText = error_msg;
  hideUI();
  error_message.classList.add("visible");
}
const hideUI = () => {
  // Limpiamos
  // Desactiva la visibilidad / accion sobre todos los botones, quita la imagen y el error
  controls.classList.remove("visible");
  start_camera.classList.remove("visible");
  video.classList.remove("visible");
  snap.classList.remove("visible");
  error_message.classList.remove("visible");
}
continueNow.addEventListener('click', (event) => { // Redireccionar al success
  window.location.assign('../views/success.html');
});
