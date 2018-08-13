let withDate = document.getElementById('withDate');
let returnRegistry = document.getElementById('returnRegistry');
withDate.addEventListener('click', (event) => {
  window.location.assign('../views/photo.html');
});

returnRegistry.addEventListener('click', (event) => {
  window.location.assign('../views/keepRegistry.html');
});
