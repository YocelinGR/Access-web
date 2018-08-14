let storage = firebase.storage();
let continueNow = document.getElementById('continueNow');
// Obtenemos todos los elementos que necesitaremos desde el DOM
let video = document.querySelector('#camera-stream');
let image = document.querySelector('#snap');
let start_camera = document.querySelector('#start-camera');
let controls = document.querySelector('.controls');
let take_photo_btn = document.querySelector('#take-photo');
let delete_photo_btn = document.querySelector('#delete-photo');
let download_photo_btn = document.querySelector('#download-photo');
let error_message = document.querySelector('#error-message');
// Utilizamos la funcion getUserMedia para obtener la salida de la webcam
navigator.getMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia);
// Solicita  los permisos de uso de la camara
if(!navigator.getMedia){
  displayErrorMessage("Tu navegador no soporta la funcion getMedia.");
}
else{ // Solicitud aprovada
  // Solicitamos la camara
  navigator.getMedia(
    {
      video: true
    },
    (stream) => {
      // A nuestro componente video le establecemos el src al stream de la webcam
      video.src = window.URL.createObjectURL(stream);
      // Reproducimos el video
      video.play();
      video.onplay = function() {
        showVideo();
      };
    },
    (err) => {
      displayErrorMessage("Ocurrio un error al obtener el stream de la webcam: " + err.name, err);
    }
  );
}
// En los moviles no se puede reproducir el video automaticamente, programamos funcionamiento del boton inicar camara
start_camera.addEventListener("click", (event) => {
  event.preventDefault();
  // Reproducimos manualmente
  video.play();
  showVideo();
});
take_photo_btn.addEventListener("click", (event) => {
  event.preventDefault();
  let snap = takeSnapshot();
  // Mostramos la imagen
  image.setAttribute('src', snap);
  image.classList.add("visible");
  // Activamos los botones de eliminar foto y descargar foto
  delete_photo_btn.classList.remove("disabled");
  download_photo_btn.classList.remove("disabled");
  // Establecemos el atributo href para el boton de descargar imagen
  download_photo_btn.href = snap;
  // Pausamos el stream de video de la webcam
  video.pause();
});
delete_photo_btn.addEventListener("click", (event) => {
  event.preventDefault();
  // Ocultamos la imagen
  image.setAttribute('src', "");
  image.classList.remove("visible");
  // Deshabilitamos botones de descargar y eliminar foto
  delete_photo_btn.classList.add("disabled");
  download_photo_btn.classList.add("disabled");
  // Reanudamos la reproduccion de la webcam
  video.play();

});
const showVideo = () => {
  // Mostramos el stream de la webcam
  hideUI();
  video.classList.add("visible");
  controls.classList.add("visible");
}
const takeSnapshot = () => {
  let hidden_canvas = document.querySelector('canvas'),
      context = hidden_canvas.getContext('2d');
  let width = video.videoWidth,
      height = video.videoHeight;
  if (width && height) {
    // Configuramos el canvas con las mismas dimensiones que el video
    hidden_canvas.width = width;
    hidden_canvas.height = height;
    // Hacemos una copia
    context.drawImage(video, 0, 0, width, height);
    // Convertimos la imagen del canvas en datarurl
    let picture = hidden_canvas.toDataURL('image/png');
    return hidden_canvas.toDataURL('image/png');
  }
}
const  displayErrorMessage = (error_msg, error) => {
  error = error || "";
  if(error){
    console.log(error);
  }
  error_message.innerText = error_msg;
  hideUI();
  error_message.classList.add("visible");
}
const hideUI = () => {
  // Limpiamos
  controls.classList.remove("visible");
  start_camera.classList.remove("visible");
  video.classList.remove("visible");
  snap.classList.remove("visible");
  error_message.classList.remove("visible");
}
continueNow.addEventListener('click', (event) => {
  window.location.assign('../views/success.html');
});
