const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');

//GUARDAR ISSO
const subscriptionKey = "a76225be0539425da6665eeb02a8973f";

btnLogin.addEventListener("click", function() {
	firebase.firestore().collection('users').get().then(snap => snap.forEach(i => console.log(i.data().img.path)));
})

btnRegister.addEventListener("click", function() {
	console.log('funciona')
})


