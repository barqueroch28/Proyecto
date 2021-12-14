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
          window.location = 'BuscarPersonalAdmin.html';
        }
      } else{
        alert('No se pueden dejar campos vacíos', 'Error');
        window.location = 'index.html';      
      }
    })
    .then(()=> {cedula=''; contrasena='';})
    .catch(e =>{console.error('No se pudo iniciar sesion', e)}); 
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
  var mes = (parseInt(date.getMonth()+1) >= 10 ? parseInt(date.getMonth()+1) : '0'+ parseInt(date.getMonth()+1));
  var dia = (parseInt(date.getDate()) >= 10 ? date.getDate() : '0'+ date.getDate());
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
      id: id,
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
function FillInfoContacto(){
  const uri = 'https://localhost:44351/api/InfoContacto';
  let id = localStorage.getItem('Id');
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MInfoContacto(data))
  .catch(error => console.error('no se pudo mostrar la informacion de contacto', error));
}
function MInfoContacto(data){
  document.getElementById('TCelular').value = data.telefonoCelular;
  document.getElementById('TOficina').value = data.telefonoOficina;
  document.getElementById('TCasa').value = data.telefonoCasa;
  document.getElementById('TExtra').value = data.telefonoExtra;
  document.getElementById('Email').value = data.email;
  document.getElementById('ZIP').value = data.zip;
  document.getElementById('TEmergencia').value = data.contactoEmergencia;
  document.getElementById('NomEmergencia').value = data.contactoEmergenciaNombre;
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

let ItemsLaboralCliente = [];
function MostarInfoLaboralCliente(data){
  let body = document.getElementById('BodyLaboral');
  let boton = document.createElement('button');
  body.innerHTML = '';
  data.forEach(item => {
    let btnEditar = boton.cloneNode(false);
    btnEditar.innerHTML = 'Eliminar';
    btnEditar.setAttribute('onclick', `EliminarLaboralCliente(${item.idInfoLaboral})`);

    let tr = body.insertRow();

    let td1 = tr.insertCell(0);
    td1.appendChild(btnEditar);

    let td2 = tr.insertCell(1);
    let ins = document.createTextNode(item.institucion);
    td2.appendChild(ins);

    let td3 = tr.insertCell(2);
    let ini = document.createTextNode(item.fechaInicio);
    td3.appendChild(ini);

    let td4 = tr.insertCell(3);
    let fin = document.createTextNode(item.fechaFinal);
    td4.appendChild(fin);
  });
  ItemsLaboralCliente = data;
}

function FillTableLaboral(){
  const uri = 'https://localhost:44351/api/BuscarLaboral';
  let id = localStorage.getItem('Id');
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MostarInfoLaboralCliente(data))
  .catch(error => console.error('No encontramos la info academica', error));
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

let itemsFormalCliente = [];

function MostrarInfoAcademicaFormalCliente(data){
  //data = JSON.parse(data);
  let body = document.getElementById('BodyFormal');
  body.innerHTML = '';
  let boton = document.createElement('button');
  data.forEach(item => {
    let editarbtn = boton.cloneNode(false);
    editarbtn.innerHTML = 'Eliminar';
    editarbtn.setAttribute('onclick', `EliminarFormalCliente(${item.id})`);

    let tr = body.insertRow();

    let td1 = tr.insertCell(0);
    td1.appendChild(editarbtn);

    let td2 = tr.insertCell(1);
    let ins = document.createTextNode(item.institucion);
    td2.appendChild(ins);

    let td3 = tr.insertCell(2);
    let acr = document.createTextNode(item.acreditacion);
    td3.appendChild(acr);

    let td4 = tr.insertCell(3);
    let fin = document.createTextNode(item.fechaGraduacion);
    td4.appendChild(fin);
  });
  itemsFormalCliente = data;
}

function FillTableFormal(){
  const uri = 'https://localhost:44351/api/BusquedaFormal';
  let id = localStorage.getItem('Id');
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MostrarInfoAcademicaFormalCliente(data))
  .catch(error => console.error('No encontramos la info academica', error));
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

let itemsCompCliente = [];
function MostrarInfoAcademicaCompCliente(data){
  //data = JSON.parse(data);
  let body = document.getElementById('BodyComp');
  body.innerHTML = '';
  let boton = document.createElement('button');
  data.forEach(item => {
    let editarbtn = boton.cloneNode(false);
    editarbtn.innerHTML = 'Eliminar';
    editarbtn.setAttribute('onclick', `EliminarCompCliente(${item.id})`);

    let tr = body.insertRow();

    let td1 = tr.insertCell(0);
    td1.appendChild(editarbtn);

    let td2 = tr.insertCell(1);
    let ins = document.createTextNode(item.institucion);
    td2.appendChild(ins);

    let td3 = tr.insertCell(2);
    let acr = document.createTextNode(item.acreditacion);
    td3.appendChild(acr);

    let td4 = tr.insertCell(3);
    let fin = document.createTextNode(item.fechaGraduacion);
    td4.appendChild(fin);
  });
  itemsCompCliente = data;
}

function FillTableComp(){
  const uri = 'https://localhost:44351/api/BuscarComp';
  let id = localStorage.getItem('Id');
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MostrarInfoAcademicaCompCliente(data))
  .catch(error => console.error('No encontramos la info academica', error));
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

let ItemsIdiomaCliente = [];

function MostrarInfoAcademicaIdiomaCliente(data){
  let body = document.getElementById('BodyIdioma');
  let boton = document.createElement('button');
  body.innerHTML = '';
  data.forEach(item => {
    let editarbtn = boton.cloneNode(false);
    editarbtn.innerHTML = 'Eliminar';
    editarbtn.setAttribute('onclick', `EliminarIdiomaCliente(${item.id})`);

    let tr = body.insertRow();

    let td1 = tr.insertCell(0);
    td1.appendChild(editarbtn);

    let td2 = tr.insertCell(1);
    let idi = document.createTextNode(item.idioma);
    td2.appendChild(idi);

    let td3 = tr.insertCell(2);
    let niv = document.createTextNode(item.nivel);
    td3.appendChild(niv);
  });
  ItemsIdiomaCliente = data;
}

function FillTableIdioma(){
  const uri = 'https://localhost:44351/api/BuscarIdioma';
  let id = localStorage.getItem('Id');
  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(data => MostrarInfoAcademicaIdiomaCliente(data))
  .catch(error => console.error('No encontramos la info academica', error));
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

function HabilitarFormal(){
  document.getElementById('InstitucionF').disabled = false;
  document.getElementById('AcreditacionF').disabled = false;
  document.getElementById('FechaFinF').disabled = false;
  document.getElementById('CerrarF').hidden = false;
  document.getElementById('FormFormal').hidden = false;
}

function DeshabilitarFormal(){
  document.getElementById('InstitucionF').disabled = true;
  document.getElementById('AcreditacionF').disabled = true;
  document.getElementById('FechaFinF').disabled = true;
  document.getElementById('CerrarF').hidden = true;
  document.getElementById('FormFormal').hidden = true;
}

function GuardarFormal(){
  const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
  let ins = document.getElementById('InstitucionF').value;
  let acr = document.getElementById('AcreditacionF').value;
  let Fecha = document.getElementById('FechaFinF').value;
  const IdPersona = localStorage.getItem('Id');
  let item = {
    institucion: ins,
    acreditacion: acr,
    fechaGraduacion: Fecha,
    informacionPersonalId: IdPersona
  }
  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(response => response.json())
  .then(data => FillTableFormal(data))
  .catch(error => console.error('No se pudo añadir la informacion', error));
  DeshabilitarFormal();
}

function EliminarFormalCliente(id){
  const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
  fetch(`${uri}/${id}`,{
    method: 'DELETE'
  })
  .then(data => FillTableFormal(data))
  .catch(error => console.log('No se pudo eliminar la info formal', error));
}

function HabilitarComp(){
  document.getElementById('InstitucionC').disabled = false;
  document.getElementById('AcreditacionC').disabled = false;
  document.getElementById('FechaFinC').disabled = false;
  document.getElementById('CerrarC').hidden = false;
  document.getElementById('FormComp').hidden = false;
}

function DeshabilitarComp(){
  document.getElementById('InstitucionC').disabled = true;
  document.getElementById('AcreditacionC').disabled = true;
  document.getElementById('FechaFinC').disabled = true;
  document.getElementById('CerrarC').hidden = true;
  document.getElementById('FormComp').hidden = true;
}

function GuardarComp(){
  const uri = 'https://localhost:44351/api/InfoAcademicaComp';
  let acr = document.getElementById('AcreditacionC').value;
  let ins = document.getElementById('InstitucionC').value;
  let fecha = document.getElementById('FechaFinC').value;
  let IdPersona = localStorage.getItem('Id');
  const item = {
    institucion: ins,
    acreditacion: acr,
    fechaGraduacion: fecha,
    informacionPersonalId: IdPersona
  };
  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  }).then(response => response.json())
  .then(data => FillTableComp(data))
  .catch(error => console.log('no se pudo añadir la informacion', error));
  DeshabilitarComp();
}

function EliminarCompCliente(id){
  const uri = 'https://localhost:44351/api/InfoAcademicaComp';
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  }).then(data => FillTableComp(data))
  .catch(error => console.error('No se pudo eliminar la informacion complementaria', error));
}

function HabilitarIdioma(){
  document.getElementById('Idioma').disabled = false;
  document.getElementById('Nivel').disabled = false;
  document.getElementById('CerrarI').hidden = false;
  document.getElementById('FormIdioma').hidden = false;
}

function DeshabilitarIdioma(){
  document.getElementById('Idioma').disabled = true;
  document.getElementById('Nivel').disabled = true;
  document.getElementById('CerrarI').hidden = true;
  document.getElementById('FormIdioma').hidden = true;
}

function GuardarIdioma(){
  let idioma = document.getElementById('Idioma').value;
  let nivel = document.getElementById('Nivel').value;
  const uri = 'https://localhost:44351/api/InfoAcademicaIdioma';
  const IdPersona = localStorage.getItem('Id');
  const item = {
    idioma: idioma,
    nivel: nivel,
    informacionPersonalId: IdPersona
  }
  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(response => response.json())
  .then(data => FillTableIdioma(data))
  .catch(error => console.error('No se pudo añadir la informacion', error));
  DeshabilitarIdioma();
}

function EliminarIdiomaCliente(id){
  let uri = 'https://localhost:44351/api/InfoAcademicaIdioma';
  fetch(`${uri}/${id}`, {
    method:'DELETE'
  })
  .then(data => FillTableIdioma(data))
  .catch(error => console.error('no se pudo eliminar la informacion de idioma', error));
}

function GuardarBtn(){
  let id = localStorage.getItem('Id');
  EditarPersonalCliente(id);
  EditarDireccionCliente(id);
}

function HabilitarLaboral(){
  document.getElementById('Institucion').disabled = false;
  document.getElementById('FechaInicio').disabled = false;
  document.getElementById('FechaFin').disabled = false;
  document.getElementById('FormLaboral').hidden = false;
  document.getElementById('CerrarL').hidden = false;
}

function DeshabilitarLaboral(){
  document.getElementById('Institucion').disabled = true;
  document.getElementById('FechaInicio').disabled = true;
  document.getElementById('FechaFin').disabled = true;
  document.getElementById('FormLaboral').hidden = true;
  document.getElementById('CerrarL').hidden = true;
}

function GuardarLaboral(){
  let ins = document.getElementById('Institucion').value;
  let ini = document.getElementById('FechaInicio').value;
  let fin = document.getElementById('FechaFin').value;
  let id = localStorage.getItem('Id');
  const uri = 'https://localhost:44351/api/InformacionLaboral';
  const item = {
    institucion: ins,
    fechaInicio: ini,
    fechaFinal: fin,
    informacionPersonalId: id
  };
  fetch(uri, {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(response => response.json())
  .then(data => FillTableLaboral(data))
  .catch(error => console.error('No se pudo añadir la informacion laboral', error));
  DeshabilitarLaboral(); 
}

function EliminarLaboralCliente(id){
  const uri = 'https://localhost:44351/api/InformacionLaboral';
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(data => FillTableLaboral(data))
  .catch(error => console.log('No se pudo eliminar la informacion laboral', error));
}

function GetId(){
  const uriGetId = 'https://localhost:44351/api/BusquedaCedula';
  var cedula = $('#Cedula').val();
  fetch(`${uriGetId}/${cedula}`)
  .then(response => response.json())
  .then(data => {localStorage.setItem('Id', data.id);} )
  .catch(e => console.error('no se pudo', e));
}
function SetId(){  
  var probando = localStorage.getItem('Id');
  document.getElementById('IdPersona').value = probando;   
}
function DisplayTh(data){
  var IdPersona = document.getElementById('IdPersona').value;
  IdPersona = data.id;
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

function MultipleTransaccion(){
    Login();
    GetId();
}