
// prueba 
 console.log("todo va bien");
 
 let myform = $("form#myform");
myform.submit(function(event){
  event.preventDefault();

  // credenciales de servicio emailjs
  let service_id = "default_service";
  let template_id = "template_bPMxch99";
  //evento del boton 
  myform.find("button").text("Enviando...");
  emailjs.sendForm(service_id,template_id,"myform")
    .then(function(){ 
      alert("La notificación se envio correctamente!");
       myform.find("button").text("Enviado");
    }, function(err) {
       alert("Hubo un error vuelve a intentar!");
       myform.find("button").text("No pudo ser enviado");

    });
  return false;
});