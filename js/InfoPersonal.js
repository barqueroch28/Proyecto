let itemsDireccion = [];
let itemsPersonal = [];

function GuardarInfoPersonal(){
    const nombre = document.getElementById('Nombre').value;
    const primerApe = document.getElementById('1Apellido').value;
    const segundoApe = document.getElementById('2Apellido').value;
    const cedula = document.getElementById('Cedula').value;
    const fechaNacimiento = document.getElementById('FechaNacimiento').value;
    const estadoCivil = document.getElementById('EstadoCivil').value;
    const numeroAsegurado = document.getElementById('NumeroAsegurado').value;
    const tipoSangre = document.getElementById('TipoSangre').value;
    const cuentaBancaria = document.getElementById('CuentaBancaria').value;
    const bancoEspecifico = document.getElementById('BancoEspecifico').value;
    const contrasena = document.getElementById('Contrasena').value;
    const uri = 'https://localhost:44351/api/InformacionPersonal';
    item = {
        Nombre: nombre.trim(),
        PrimerApellido: primerApe.trim(),
        SegundoApellido: segundoApe.trim(),
        Cedula: cedula.trim(),
        FechaNacimiento: fechaNacimiento.trim(),
        NumeroAsegurado: numeroAsegurado.trim(),
        EstadoCivil: estadoCivil.trim(),
        TipoSangre: tipoSangre.trim(),
        CuentaBancaria: cuentaBancaria.trim(),
        BancoEspecifico: bancoEspecifico.trim(),
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
    .then(response => response.json())
    .then(()=>
    {
        nombre.value='';
        primerApe.value='';
        segundoApe.value='';
        cedula.value='';
        fechaNacimiento.value='';
        estadoCivil.value='';
        numeroAsegurado.value='';
        tipoSangre.value='';
        cuentaBancaria.value='';
        bancoEspecifico.value='';
        contrasena.value='';
    })
    .catch(e => console.error('no se pudo guardar', e));
    }
function GuardarInfoDireccion(){
    const provincia = document.getElementById('Provincia').value;
    const canton = document.getElementById('Canton').value;
    const distrito = document.getElementById('Distrito').value;
    const direccionExacta = document.getElementById('Direccion').value;
    const uri = 'https://localhost:44351/api/InfoDireccion';
    item = {
        Provincia: provincia.trim(),
        Canton: canton.trim(),
        Distrito: distrito.trim(),
        DireccionExacta: direccionExacta.trim()
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(()=>
    {
        provincia.value='';
        canton.value='';
        distrito.value='';
        direccionExacta.value='';
    })
    .catch(e => console.error('No se guardo info direccion', e));
}
function MostrarInfoPersonal(data){
    let button = document.createElement('button');
    let table = document.getElementById('TablaPersonal');
    table.innerHTML = '';
    let tablaPrincipal = document.getElementById('TablaPInfo');
    tablaPrincipal.hidden = false;
    data.forEach(item => {
        let editItem = button.cloneNode(false);
        editItem.innerHTML = 'Editar';
        editItem.setAttribute('onclick', `MostrarEditarPersonal(${item.idInfoPersonal})`);

        let deleteItem = button.cloneNode(false);
        deleteItem.innerHTML = 'Eliminar';
        deleteItem.setAttribute('onclick', `EliminarPersonal(${item.idInfoPersonal})`);

        let tr = table.insertRow();

        let td01= tr.insertCell(0);
        td01.appendChild(editItem);
        let td02 = tr.insertCell(1);
        td02.appendChild(deleteItem);
        let td1 = tr.insertCell(2);
        let nom = document.createTextNode(item.nombre);
        td1.appendChild(nom);
        let td2 = tr.insertCell(3);
        let ape1 = document.createTextNode(item.primerApellido);
        td2.appendChild(ape1);
        let td3 = tr.insertCell(4);
        let ape2 = document.createTextNode(item.segundoApellido);
        td3.appendChild(ape2);
        let td4 = tr.insertCell(5);
        let ced = document.createTextNode(item.cedula);
        td4.appendChild(ced);
        let td5 = tr.insertCell(6);
        let nac = document.createTextNode(item.fechaNacimiento);
        td5.appendChild(nac);
        let td6 = tr.insertCell(7);
        let est = document.createTextNode(item.estadoCivil);
        td6.appendChild(est);
        let td7 = tr.insertCell(8);
        let numA = document.createTextNode(item.numeroAsegurado);
        td7.appendChild(numA);
        let td8 = tr.insertCell(9);
        let san = document.createTextNode(item.tipoSangre);
        td8.appendChild(san);
        let td9 = tr.insertCell(10);
        let iban = document.createTextNode(item.cuentaBancaria);
        td9.appendChild(iban);
        let td10 = tr.insertCell(11);
        let ban = document.createTextNode(item.bancoEspecifico);
        td10.appendChild(ban);
        let td11 = tr.insertCell(12);
        let con = document.createTextNode(item.contrasena);
        td11.appendChild(con);
    });
    itemsPersonal = data;
}
function GetInfoPersonal(){
    let uri = 'https://localhost:44351/api/InformacionPersonal';
    fetch(uri)
    .then(response => response.json())
    .then(data => MostrarInfoPersonal(data))
    .catch(error => console.error('No se pudo traer la info personal', error));
}
function EliminarPersonal(id){
    let uri = 'https://localhost:44351/api/InformacionPersonal';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
    .then(()=> GetInfoPersonal())
    .catch(error => console.error('No se pudo eliminar la info Personal', error));
}
function EditarPersonal(){
    const uri = 'https://localhost:44351/api/InformacionPersonal';
    const id = document.getElementById('IdInfoPersonal').value;
    const nombre = document.getElementById('editNombre').value;
    const primerApe = document.getElementById('edit1Apellido').value;
    const segundoApe = document.getElementById('edit2Apellido').value;
    const cedula = document.getElementById('editCedula').value;
    const fechaNac = document.getElementById('editFechaNacimiento').value;
    const estadoCivil = document.getElementById('editEstadoCivil').value;
    const numeroAsegurado = document.getElementById('editNumeroAsegurado').value;
    const tipoSangre = document.getElementById('editTipoSangre').value;
    const cuentaBancaria = document.getElementById('editCuentaBancaria').value;
    const bancoEspecifico = document.getElementById('editBancoEspecifico').value;
    const contrasena = document.getElementById('editContrasena').value;
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
    }).then(() => GetInfoPersonal())
    .catch(error => console.error('no se pudo actualizar la info personal', error));
    CerrarFormPersonal();
    return false;
}
function MostrarEditarPersonal(id){
    document.getElementById('FormEditPersonal').hidden = false;
    let item = itemsPersonal.find(item => item.idInfoPersonal === id);
    document.getElementById('IdInfoPersonal').value = item.idInfoPersonal;
    document.getElementById('editNombre').value = item.nombre;
    document.getElementById('edit1Apellido').value = item.primerApellido;
    document.getElementById('edit2Apellido').value = item.segundoApellido;
    document.getElementById('editCedula').value = item.cedula;
    document.getElementById('editFechaNacimiento').value = item.fechaNacimiento;
    document.getElementById('editEstadoCivil').value = item.estadoCivil;
    document.getElementById('editNumeroAsegurado').value = item.numeroAsegurado;
    document.getElementById('editTipoSangre').value = item.tipoSangre;
    document.getElementById('editCuentaBancaria').value = item.cuentaBancaria;
    document.getElementById('editBancoEspecifico').value = item.bancoEspecifico;
    document.getElementById('editContrasena').value = item.contrasena;
}
function CerrarFormPersonal(){
    document.getElementById('FormEditPersonal').hidden = true;
}
function MostrarInfoDireccion(data){
    let tabla = document.getElementById('TablaDireccion');
    let tablaPrincipal = document.getElementById('TablaPDire');
    
    const button = document.createElement('button');
    tabla.innerHTML = '';
    tablaPrincipal.hidden = false;
    data.forEach(item => {
        
        let editItem = button.cloneNode(false);
        editItem.innerHTML = 'Editar';
        editItem.setAttribute('onclick', `MostrarEditarDireccion(${item.idInformacionDireccion})`);

        let deleteItem = button.cloneNode(false);
        deleteItem.innerHTML = 'Eliminar';
        deleteItem.setAttribute('onclick', `EliminarDireccion(${item.idInformacionDireccion})`);

        let tr = tabla.insertRow();
        let td01 = tr.insertCell(0);
        td01.appendChild(editItem);
        let td02 = tr.insertCell(1);
        td02.appendChild(deleteItem);  
        let td1 = tr.insertCell(2);
        let pro = document.createTextNode(item.provincia);
        td1.appendChild(pro);
        let td2 = tr.insertCell(3);
        let can = document.createTextNode(item.canton);
        td2.appendChild(can);
        let td3 = tr.insertCell(4);
        let dis = document.createTextNode(item.distrito);
        td3.appendChild(dis);
        let td4 = tr.insertCell(5);
        let dir = document.createTextNode(item.direccionExacta);
        td4.appendChild(dir);
    });
    itemsDireccion = data;
}
function GetInfoDireccion(){
    let uri = 'https://localhost:44351/api/InfoDireccion';
    fetch(uri)
    .then(response => response.json())
    .then(data => MostrarInfoDireccion(data))
    .catch(error => console.error('No se pudo traer la informacion de direccion', error));
}
function EliminarDireccion(id){
    let uri = 'https://localhost:44351/api/InfoDireccion';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    }).then(()=> GetInfoDireccion())
    .catch(error => console.error('No se pudo eliminar la direccion', error));
}
function MostrarEditarDireccion(id){
    let item = itemsDireccion.find(item => item.idInformacionDireccion === id);
    document.getElementById('IdInfoDireccion').value = item.idInformacionDireccion;
    document.getElementById('editProvincia').value = item.provincia;
    document.getElementById('editCanton').value = item.canton;
    document.getElementById('editDistrito').value = item.distrito;
    document.getElementById('editDireccion').value = item.direccionExacta;
    document.getElementById('FormEditarDireccion').hidden = false;
}
function EditarDireccion(){
    let uri = 'https://localhost:44351/api/InfoDireccion';
    let id = document.getElementById('IdInfoDireccion').value;
    let pro = document.getElementById('editProvincia').value;
    let can = document.getElementById('editCanton').value;
    let dis = document.getElementById('editDistrito').value;
    let dir = document.getElementById('editDireccion').value;
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
    .then(()=> GetInfoDireccion())
    .catch(error => console.error('No se actualizo la informacion direcion', error));
    CerrarFormDireccion();
    return false;
}
function CerrarFormDireccion(){
    document.getElementById('FormEditarDireccion').hidden = true;
}
function TraerInfo(){
    GetInfoDireccion();
    GetInfoPersonal();
}
function BigBoy(){
    GuardarInfoDireccion();
    GuardarInfoPersonal();   
}