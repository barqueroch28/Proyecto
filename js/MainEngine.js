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
          window.location = 'MostrarInfoAdmin.html';
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
function FillInfoPersonal(){
  const uri = 'https://localhost:44351/api/InformacionPersonal';
  let id = localStorage.getItem('Id');
  //alert(id);
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MInfoPersonal(data))
  .catch(error => console.error('No encontramos a la persona', error));
}
function MInfoPersonal(data){
  var date = new Date(data.fechaNacimiento);
  var mes = (parseInt(date.getMonth()+1) > 10 ? parseInt(date.getMonth()+1) : '0'+ parseInt(date.getMonth()+1));
  var dia = (parseInt(date.getDate()) > 10 ? date.getDate() : '0'+ date.getDate());
  var definitivo = date.getFullYear() + '-' + mes + '-' + dia;
  document.getElementById('Nombre').value = data.nombre;
  document.getElementById('1Apellido').value = data.primerApellido;
  document.getElementById('2Apellido').value = data.segundoApellido;
  document.getElementById('Cedula').value = data.cedula;
  document.getElementById('FechaNacimiento').value = definitivo;
  document.getElementById('EstadoCivil').value = data.estadoCivil;
  document.getElementById('NumeroAsegurado').value = data.numeroAsegurado;
  document.getElementById('TipoSangre').value = data.tipoSangre;
  document.getElementById('BancoEspecifico').value = data.bancoEspecifico;
  document.getElementById('CuentaBancaria').value = data.cuentaBancaria; 
  document.getElementById('Contrasena').value = data.contrasena;
}
function EditarPersonalCliente(id){
  const uri = 'https://localhost:44351/api/InformacionPersonal';
  const nombre = document.getElementById('Nombre').value;
  const primerApe = document.getElementById('1Apellido').value;
  const segundoApe = document.getElementById('2Apellido').value;
  const cedula = document.getElementById('Cedula').value;
  const fechaNac = document.getElementById('FechaNacimiento').value;
  const estadoCivil = document.getElementById('EstadoCivil').value;
  const numeroAsegurado = document.getElementById('NumeroAsegurado').value;
  const tipoSangre = document.getElementById('TipoSangre').value;
  const cuentaBancaria = document.getElementById('CuentaBancaria').value;
  const bancoEspecifico = document.getElementById('BancoEspecifico').value;
  const contrasena = document.getElementById('Contrasena').value;
  let item = {
      idInfoPersonal: id,
      nombre: nombre,
      primerApellido: primerApe,
      segundoApellido: segundoApe,
      cedula: cedula,
      fechaNacimiento: fechaNac,
      numeroAsegurado: numeroAsegurado,
      estadoCivil: estadoCivil,
      tipoSangre: tipoSangre,
      cuentaBancaria: cuentaBancaria,
      bancoEspecifico: bancoEspecifico,
      contrasena: contrasena     
  };
  fetch(`${uri}/${id}`, {
      method: 'PUT',
      headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body: JSON.stringify(item)
  }).then(() => FillInfoPersonal())
  .catch(error => console.error('no se pudo actualizar la info personal', error));
  DeshabilitarEspacio();
  return false;
}
function FillInfoDireccion(){
  const uri = 'https://localhost:44351/api/InfoDireccion';
  let id = localStorage.getItem('Id');
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MInfoDireccion(data))
  .catch(error => console.error('No encontramos a la persona', error));
}
function MInfoDireccion(data){
  document.getElementById('Provincia').value = data.provincia;
  document.getElementById('Canton').value = data.canton;
  document.getElementById('Distrito').value = data.distrito;
  document.getElementById('Direccion').value = data.direccionExacta;
}

function EditarDireccionCliente(id){
  let uri = 'https://localhost:44351/api/InfoDireccion';
  let pro = document.getElementById('Provincia').value;
  let can = document.getElementById('Canton').value;
  let dis = document.getElementById('Distrito').value;
  let dir = document.getElementById('Direccion').value;
  let item = {
      idInformacionDireccion: id,
      provincia: pro,
      canton: can,
      distrito: dis,
      direccionExacta: dir
  };
  fetch(`${uri}/${id}` ,{
      method: 'PUT',
      headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body: JSON.stringify(item)
  })
  .then(()=> FillInfoDireccion())
  .catch(error => console.error('No se actualizo la informacion direcion', error));
  DeshabilitarEspacio();
  return false;
}

function FillInfoLaboral(){
  const uri = 'https://localhost:44351/api/InformacionLaboral';
  let id = localStorage.getItem('Id');
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MInfoLaboral(data))
  .catch(error => console.error('No encontramos a la persona', error));
}

function MInfoLaboral(data){
  var date1 = new Date(data.fechaInicio);
  var date2 = new Date(data.fechaFinal);
            //(parseInt(date.getMonth()+1) > 10 ? parseInt(date.getMonth()+1) : '0'+ parseInt(date.getMonth()+1));
  var mes1 = (parseInt(date1.getMonth()+1) > 10 ? parseInt(date1.getMonth()+1) : '0'+parseInt(date1.getMonth()+1)); 
  var dia1 = (parseInt(date1.getDate())>10 ? date1.getDate(): '0'+parseInt(date1.getDate()));
  document.getElementById('Institucion').value = data.institucion;
  document.getElementById('FechaInicio').value = parseInt(date1.getFullYear()) +'-'+ mes1 +'-'+ dia1;
  document.getElementById('FechaFin').value = date2.getFullYear() +'-'+ parseInt(date2.getMonth()+1) +'-'+ date2.getDate();
}

function FillInfoAcaFormal(){
  const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
  let id = localStorage.getItem('Id');
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MinfoAcademicaFormal(data))
  .catch(error => console.error('No encontramos la info academica', error));
}
function MinfoAcademicaFormal(data){
  var date = new Date(data.fechaGraduacion);
  document.getElementById('InstitucionF').value = data.institucion;
  document.getElementById('AcreditacionF').value = data.acreditacion;
  document.getElementById('FechaFinF').value = parseInt(date.getMonth()+1) +'-'+ date.getDate() +'-'+ date.getFullYear();
}

function FillInfoAcaComp(){
  const uri = 'https://localhost:44351/api/InfoAcademicaComp';
  let id = localStorage.getItem('Id');
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MInfoAcademicaComp(data))
  .catch(error => console.error('No encontramos la info academica', error));
}
function MInfoAcademicaComp(data){
  var date1 = new Date(data.fechaGraduacion);
  document.getElementById('InstitucionC').value = data.institucion;
  document.getElementById('AcreditacionC').value = data.acreditacion;
  document.getElementById('FechaFinC').value = date1.getFullYear() +'-'+ parseInt(date1.getMonth()+1) +'-'+ date1.getDate();
}

function FillInfoAcaIdioma(){
  const uri = 'https://localhost:44351/api/InfoAcademicaIdioma';
  let id = localStorage.getItem('Id');
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MInfoAcademicaIdioma(data))
  .catch(error => console.error('No encontramos la info de idioma', error));
}
function MInfoAcademicaIdioma(data){
  document.getElementById('Idioma').value = data.idioma;
  document.getElementById('Nivel').value = data.nivel;
}

function HabilitarEspacio(){
  document.getElementById('EstadoCivil').disabled = false;
  document.getElementById('BancoEspecifico').disabled = false;
  document.getElementById('CuentaBancaria').disabled = false;
  document.getElementById('Provincia').disabled = false;
  document.getElementById('Canton').disabled = false;
  document.getElementById('Distrito').disabled = false;
  document.getElementById('Direccion').disabled = false;
  document.getElementById('Cerrar').hidden = false;
}

function DeshabilitarEspacio(){
  document.getElementById('EstadoCivil').disabled = true;
  document.getElementById('BancoEspecifico').disabled = true;
  document.getElementById('CuentaBancaria').disabled = true;
  document.getElementById('Provincia').disabled = true;
  document.getElementById('Canton').disabled = true;
  document.getElementById('Distrito').disabled = true;
  document.getElementById('Direccion').disabled = true;
  document.getElementById('Cerrar').hidden = true;
}


function GuardarBtn(){
  let id = localStorage.getItem('Id');
  EditarPersonalCliente(id);
  EditarDireccionCliente(id);
}

function SetId(){  
    var probando = localStorage.getItem('Id');
    document.getElementById('IdPersona').value = probando;   
}
function MultipleTransaccion(){
    Login();
    GetId();
}