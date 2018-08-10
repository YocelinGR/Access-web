window.addEventListener('load',init);
  function init(){
    var video = document.querySelector('#video'),
    canvas = document.querySelector('#c'),
    btnTakephoto = document.querySelector('#screenshoot'),
    img = document.querySelector('#img');
    download = document.querySelector('#download');

    navigator.getUserMedia = (navigator.getUserMedia ||
    	navigator.webkitGetUserMedia ||
    	navigator.mozGetUSerMedia || navigator.msGetUserMedia);

    if(navigator.getUserMedia){
      navigator.getUserMedia({
      	video:true},function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
      },
      function(e){
      	console.log(e)
      });

      video.addEventListener('loadedmetadata',function(){
      	canvas.width = video.videoWidth,
      	canvas.height = video.videoHeight;},false);
      btnTakephoto.addEventListener('click',function(){
        canvas.getContext('2d').drawImage(video,0,0);
        var imgData = canvas.toDataURL('image/png');
        img.setAttribute('src',imgData);
        img.classList.add('visible')
        download.href =imgData

      });

    }else{
      alert("Actualiza tu nvegador");

    }

  }
