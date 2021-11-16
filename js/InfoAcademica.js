let itemsFormal = [];
let itemsComp = [];
let itemsIdioma = [];


function GuardarAcademicaFormal(){
    const institucion = document.getElementById('Institucion1').value;
    const acreditacion = document.getElementById('Acreditacion1').value;
    const fechaGraduacion = document.getElementById('FechaGraduacion1').value;
    const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
    const item = {
        Institucion : institucion.trim(),
        Acreditacion : acreditacion.trim(),
        FechaGraduacion: fechaGraduacion.trim()
    };
    fetch(uri, 
    {
        method : 'POST',
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(response=> response.json()).then(()=> 
    {
        institucion.value = '';
        acreditacion.value = '';
        fechaGraduacion.value = '';
    }).catch(error => console.error('No se guardo', error));
}

function GuardarAcademicaComp(){
    const institucion = document.getElementById('Institucion2').value;
    const acreditacion = document.getElementById('Acreditacion2').value;
    const fechaGraduacion = document.getElementById('FechaGraduacion2').value;
    const uri = 'https://localhost:44351/api/InfoAcademicaComp';
    const item = {
        Institucion : institucion.trim(),
        Acreditacion : acreditacion.trim(),
        FechaGraduacion : fechaGraduacion.trim()
    };
    fetch(uri, 
    {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(item)
    }).then(response=> response.json()).then(()=>
    {
        institucion.value = '';
        acreditacion.value = '';
        fechaGraduacion.value = '';
    }).catch(error => console.error('no se guardo', error));
}
function GuardarAcademicaIdioma(){        
    const idioma = document.getElementById('Idioma1').value;
    const nivel = document.getElementById('Nivel1').value;
    const uri = 'https://localhost:44351/api/InfoAcademicaIdioma';
    const item = {
        Idioma: idioma.trim(),
        Nivel: nivel.trim()
    };
    fetch(uri, 
    {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(item)
    })
    .then(response => response.json())
    .then(()=> {
            idioma.value = '';
            nivel.value = '';
        })
    .catch(error => console.error('error al ingresar', error));
}
function MostrarInfoAcademicaFormal(data){
    let button = document.createElement('button');
    let tablaPrincipal = document.getElementById('tablaInfoFormal');
    const table = document.getElementById('InfoFormal');
    table.innerHTML = '';
    tablaPrincipal.hidden = false;
    document.getElementById('tituloFormal').innerHTML = 'Informacion Academica Formal';
    data.forEach(item => {

        let editarItem = button.cloneNode(false);
        editarItem.innerHTML = 'Editar';
        editarItem.setAttribute('onclick', `MostrarEditarInfoFormal(${item.idInformacionAcademicaFormal})`);

        let deleteItem = button.cloneNode(false);
        deleteItem.innerHTML = 'Eliminar';
        deleteItem.setAttribute('onclick', `EliminarInfoFormal(${item.idInformacionAcademicaFormal})`);

        let tr = table.insertRow();

        let td01 = tr.insertCell(0);
        td01.appendChild(editarItem);

        let td02 = tr.insertCell(1);
        td02.appendChild(deleteItem);

        let td1 = tr.insertCell(2);
        let inst = document.createTextNode(item.institucion);
        td1.appendChild(inst);

        let td2 = tr.insertCell(3);
        let acr = document.createTextNode(item.acreditacion);
        td2.appendChild(acr);

        let td3 = tr.insertCell(4);
        let fec = document.createTextNode(item.fechaGraduacion);
        td3.appendChild(fec);
    });
    itemsFormal = data;
}
function GetInfoFormal(){
    const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
    fetch(uri)
    .then(response => response.json())
    .then(data => MostrarInfoAcademicaFormal(data))
    .catch(e => console.error('No se pudo mostrar', e));
}
function EliminarInfoFormal(id){
    const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
    .then(()=> GetInfoFormal())
    .catch(error => console.error('No se pudo eliminar', error));
}
function MostrarEditarInfoFormal(id){
    const item = itemsFormal.find(item => item.idInformacionAcademicaFormal === id);
    document.getElementById('idInfoFormal').value = item.idInformacionAcademicaFormal;
    document.getElementById('EditInstF').value = item.institucion;
    document.getElementById('EditAcrF').value = item.acreditacion;
    document.getElementById('EditFinF').value = item.fechaGraduacion;
    document.getElementById('EditInfoFormal').hidden = false;
}
function EditarInfoFormal(){
    const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
    const id = document.getElementById('idInfoFormal').value;
    //alert(id);
    const institucion = document.getElementById('EditInstF').value;
    const acreditacion = document.getElementById('EditAcrF').value;
    const fechaGraduacion = document.getElementById('EditFinF').value;
    const item = {
        idInformacionAcademicaFormal: id,
        institucion: institucion,
        acreditacion: acreditacion,
        fechaGraduacion: fechaGraduacion
    };
    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(()=> GetInfoFormal())
    .catch(error => console.error('no se pudo actualizar la info formal', error));
    CerrarFormFormal();
    return false;
}
function CerrarFormFormal(){
    document.getElementById('EditInfoFormal').hidden = true;
}
function MostrarInfoAcademicaComplementaria(data){
    const table = document.getElementById('InfoComp');
    document.getElementById('tituloComp').innerHTML = 'Informacion Academica Complementaria';
    let boton = document.createElement('button');
    let tablaPrincipal = document.getElementById('tablaInfoComp');
    tablaPrincipal.hidden = false;
    table.innerHTML='';
    data.forEach(item => {
        
        let editarItem = boton.cloneNode(false);
        editarItem.innerHTML = 'Editar';
        editarItem.setAttribute('onclick', `MostrarEditarInfoComp(${item.idInformacionAcademicaComp})`);

        let eliminarItem = boton.cloneNode(false);
        eliminarItem.innerHTML = 'Eliminar';
        eliminarItem.setAttribute('onclick', `EliminarInfoComp(${item.idInformacionAcademicaComp})`)
        let tr = table.insertRow();

        let td01 = tr.insertCell(0);
        td01.appendChild(editarItem);

        let td02 = tr.insertCell(1);
        td02.appendChild(eliminarItem);

        let td1 = tr.insertCell(2);
        let inst = document.createTextNode(item.institucion);
        td1.appendChild(inst);

        let td2 = tr.insertCell(3);
        let acr = document.createTextNode(item.acreditacion);
        td2.appendChild(acr);

        let td3 = tr.insertCell(4);
        let fec = document.createTextNode(item.fechaGraduacion);
        td3.appendChild(fec);
    });
    itemsComp = data;
}
function GetInfoComp(){
    const uri = 'https://localhost:44351/api/InfoAcademicaComp';
    fetch(uri)
    .then(response => response.json())
    .then(data => MostrarInfoAcademicaComplementaria(data))
    .catch(e => console.error('no se pudo mostrar la complementaria', e));
}
function EliminarInfoComp(id){
    let uri = 'https://localhost:44351/api/InfoAcademicaComp';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
    .then(() => GetInfoComp())
    .catch(error => console.error('no se elimino', error));
}
function MostrarEditarInfoComp(id){
    let item = itemsComp.find(item => item.idInformacionAcademicaComp === id);
    document.getElementById('idInfoComp').value = item.idInformacionAcademicaComp;
    document.getElementById('EditInstC').value = item.institucion;
    document.getElementById('EditAcrC').value = item.acreditacion;
    document.getElementById('EditFinC').value = item.fechaGraduacion;
    document.getElementById('EditInfoComp').hidden = false;
}
function EditarInfoComp(){
    const uri = 'https://localhost:44351/api/InfoAcademicaComp';
    const id = document.getElementById('idInfoComp').value;
    const institucion = document.getElementById('EditInstC').value;
    const acreditacion = document.getElementById('EditAcrC').value;
    const fechaGraduacion = document.getElementById('EditFinC').value;
    const item = {
        idInformacionAcademicaComp: id,
        institucion: institucion,
        acreditacion: acreditacion,
        fechaGraduacion: fechaGraduacion
    };
    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(()=> GetInfoComp())
    .catch(error => console.error('no se pudo actualizar la info formal', error));
    CerrarFormComp();
    return false;
}
function CerrarFormComp(){
    document.getElementById('EditInfoComp').hidden = true;
}
function MostrarInfoAcademicaIdioma(data){
    const table = document.getElementById('InfoIdioma');
    let button = document.createElement('button');
    document.getElementById('tituloIdioma').innerHTML = 'Informacion Academica Idioma';
    let tablaPrincipal = document.getElementById('TablaIdioma');
    table.innerHTML = '';
    tablaPrincipal.hidden = false;
    data.forEach(item => {

        let tr = table.insertRow();

        let editarItem = button.cloneNode(false);
        editarItem.innerHTML = 'Editar';
        editarItem.setAttribute('onclick', `MostrarEditarInfoIdioma(${item.idInformacionAcademicaIdioma})`);

        let deleteItem = button.cloneNode(false);
        deleteItem.innerHTML = 'Eliminar';
        deleteItem.setAttribute('onclick', `EliminarIdioma(${item.idInformacionAcademicaIdioma})`);

        let td01 = tr.insertCell(0);
        td01.appendChild(editarItem);

        let td02 = tr.insertCell(1);
        td02.appendChild(deleteItem);

        let td1 = tr.insertCell(2);
        let idioma = document.createTextNode(item.idioma);
        td1.appendChild(idioma);

        let td2 = tr.insertCell(3);
        let nivel = document.createTextNode(item.nivel);
        td2.appendChild(nivel);
    });
    itemsIdioma = data;
}
function GetInfoIdioma(){
    const uri ='https://localhost:44351/api/InfoAcademicaIdioma';
    fetch(uri)
    .then(response => response.json())
    .then(data => MostrarInfoAcademicaIdioma(data))
    .catch(e => console.error('No se pudo traer info idioma', e));
}
function EliminarIdioma(id){
    let uri = 'https://localhost:44351/api/InfoAcademicaIdioma';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
    .then(() => GetInfoIdioma())
    .catch(error => console.error('no se elimino', error));
}
function MostrarEditarInfoIdioma(id){
    let item = itemsIdioma.find(item => item.idInformacionAcademicaIdioma === id);
    document.getElementById('IdInfoIdioma').value = item.idInformacionAcademicaIdioma;
    document.getElementById('EditIdioma').value = item.idioma;
    document.getElementById('EditNivel').value = item.nivel;
    document.getElementById('EditarInfoIdioma').hidden = false;
}
function EditarInfoIdioma(){
    let uri = 'https://localhost:44351/api/InfoAcademicaIdioma';
    let id = document.getElementById('IdInfoIdioma').value;
    let idioma = document.getElementById('EditIdioma').value;
    let nivel = document.getElementById('EditNivel').value;
    let item = {
        idInformacionAcademicaIdioma: id,
        idioma: idioma,
        nivel: nivel
    };
    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(() => GetInfoIdioma())
    .catch(error => console.error('No se pudo actualizar el idioma', error));
    CerrarFormIdioma();
    return false;
}
function CerrarFormIdioma(){
    document.getElementById('EditarInfoIdioma').hidden = true;
}
function BigGet(){
    GetInfoFormal();
    GetInfoComp();
    GetInfoIdioma();
}

function BigGuardar(){
    GuardarAcademicaIdioma();
    GuardarAcademicaComp();
    GuardarAcademicaFormal();      
}

function NextPage(){
    window.location = 'InsertarInfoLaboralAdmin.html';
}
