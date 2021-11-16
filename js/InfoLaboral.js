let itemsLaboral = [];
function GuardarInfoLaboral(){
    const institucion= document.getElementById('Institucion').value;
    const fechaIng = document.getElementById('FechaInicio').value;
    const fechaFin = document.getElementById('FechaFin').value;
    const uri = 'https://localhost:44351/api/InformacionLaboral';
    const item = {
        Institucion: institucion.trim(),
        FechaInicio: fechaIng.trim(),
        FechaFinal: fechaFin.trim()
    }
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(()=> {
        institucion.value = '';
        fechaIng.value='';
        fechaFin.value='';
    })
    .catch(e => console.error('No se puede guardar', e));
}
function MostrarInfoLaboral(data){
    
    let tablaPrincipal = document.getElementById('tablaInfoLaboral');
    const table = document.getElementById('tableLaboral');
    let boton = document.createElement('button');
    document.getElementById('tituloLaboral').innerHTML = 'Informacion Laboral';
    table.innerHTML ='';
    tablaPrincipal.hidden = false;
    
    data.forEach(item => {
        let editarItem = boton.cloneNode(false);
        editarItem.innerHTML = 'Editar';
        editarItem.setAttribute('onclick', `MostrarEditarLaboral(${item.idInfoLaboral})`);

        let eliminarItem = boton.cloneNode(false);
        eliminarItem.innerHTML = 'Eliminar';
        eliminarItem.setAttribute('onclick', `EliminarLaboral(${item.idInfoLaboral})`);

        let tr = table.insertRow();

        let td01 = tr.insertCell(0);
        td01.appendChild(editarItem);

        let td02 = tr.insertCell(1);
        td02.appendChild(eliminarItem);

        let td1 = tr.insertCell(2);
        let inst = document.createTextNode(item.institucion);
        td1.appendChild(inst);

        let td2 = tr.insertCell(3);
        let ini = document.createTextNode(item.fechaInicio);
        td2.appendChild(ini);

        let td3 = tr.insertCell(4);
        let fin = document.createTextNode(item.fechaFinal);
        td3.appendChild(fin);
    });
    itemsLaboral = data;
}
function GetInfoLaboral(){
    const uri = 'https://localhost:44351/api/InformacionLaboral';
    fetch(uri)
    .then(response => response.json())
    .then(data => MostrarInfoLaboral(data))
    .catch(e => console.error('No trajo info laboral', e));
}
function EliminarLaboral(id){
    const uri = 'https://localhost:44351/api/InformacionLaboral';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    }).then(()=> GetInfoLaboral())
    .catch(error => console.error('No se pudo eliminar el objeto', error));
}
function MostrarEditarLaboral(id){
    let item = itemsLaboral.find(item => item.idInfoLaboral === id);
    document.getElementById('IdLaboral').value = item.idInfoLaboral;
    document.getElementById('editInstitucion').value = item.institucion;
    document.getElementById('editFechaInicio').value = item.fechaInicio;
    document.getElementById('editFechaFin').value = item.fechaFin;
    document.getElementById('FormEditLaboral').hidden = false;
}
function EditarLaboral(){
    let uri = 'https://localhost:44351/api/InformacionLaboral';
    let id = document.getElementById('IdLaboral').value;
    let inst = document.getElementById('editInstitucion').value;
    let inic = document.getElementById('editFechaInicio').value;
    let fin = document.getElementById('editFechaFin').value;
    let item = {
        idInfoLaboral: id,
        institucion: inst,
        fechaInicio: inic,
        fechaFinal: fin
    };
    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(() => GetInfoLaboral())
    .catch(error => console.error('No se actualizo laboral ', error));
    CerrarFormLaboral();
    return false;
}
function CerrarFormLaboral(){
    document.getElementById('FormEditLaboral').hidden = true;
}
function MeasuredBoy(){
    GuardarInfoLaboral();
}
function MostrarResultado(){
    window.location = 'MostrarInfoAdmin.html';
}