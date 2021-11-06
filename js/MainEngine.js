function Login(){
    const uri = 'https://localhost:44351/api/InformacionPersonal/Login';
    var cedula = document.getElementById('Cedula').value;
    var contrasena = document.getElementById('Contra').value;
    var admin = document.getElementById('admin').checked;
    //alert(admin);
    const item = {
      Cedula: cedula.trim(),
      Contrasena: contrasena.trim()
    };
    fetch(uri, {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(item)
    })
    .then(function(response){
      if(response.status === 204){
        if(admin == false){
        window.location = 'menu.html';
        } else{
          window.location = 'InfoPersonal.html';
        }
      } else{
        alert('No se pueden dejar campos vacíos', 'Error');
        window.location = 'index.html';      
      }
    })
    .then(()=> {cedula=''; contrasena='';})
    .catch(e =>{console.error('No se pudo iniciar sesion', e)}); 
  }
  function GetId(){
    const uriGetId = 'https://localhost:44351/api/BusquedaCedula';
    var cedula = $('#Cedula').val();
    fetch(`${uriGetId}/${cedula}`)
    .then(response => response.json())
    .then(data => {localStorage.setItem('Id', data.idInfoPersonal)})
    .catch(e => console.error('no se pudo', e));
}
function DisplayTh(data){
    var IdPersona = document.getElementById('IdPersona').value;
    IdPersona = data.idInfoPersonal;
    localStorage.setItem('Id', IdPersona);    
}
function FillMenuBar(){
  const uriInfoPersonal = 'https://localhost:44351/api/InformacionPersonal';
  var id = localStorage.getItem('Id');
  fetch(`${uriInfoPersonal}/${id}`)
  .then(response => response.json())
  .then(data => {
    let name = document.getElementById('span');
    name.innerHTML = data.nombre+' '+data.primerApellido+'<br>'+data.cedula;
  })
  .catch(error => console.error('no encontramos a la persona', error));
}
function SetId(){
    var probando = localStorage.getItem('Id');
    document.getElementById('IdPersona').value = probando;   
}
function MultipleTransaccion(){
    Login();
    GetId();
}