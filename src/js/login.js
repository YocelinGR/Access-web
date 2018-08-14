let email = document.getElementById('user_email');
let password = document.getElementById('user_pwd');
let loginAdmin =  document.getElementById('btn-login');





loginAdmin.addEventListener('click', event =()=>{
	if (email.value === 'administrador@terminal1.com' && password.value === 'Admin123') {
		console.log("bien");
    location.href = '../views/viewsAdmin.html';
  } else {
    alert('El usuario y/o la contraseña son incorrectos');
  }
	});




