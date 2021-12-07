let itemsDireccion = [];
let itemsPersonal = [];

function GuardarInfoPersonal() {
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
    const cedulaLocal = localStorage.setItem('CedulaNewCliente', cedula);
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
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            nombre.value = '';
            primerApe.value = '';
            segundoApe.value = '';
            cedula.value = '';
            fechaNacimiento.value = '';
            estadoCivil.value = '';
            numeroAsegurado.value = '';
            tipoSangre.value = '';
            cuentaBancaria.value = '';
            bancoEspecifico.value = '';
            contrasena.value = '';
        })
        .catch(e => console.error('no se pudo guardar', e));
}
function GuardarInfoDireccion() {
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
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => GetIdNewCliente())
        .catch(e => console.error('No se guardo info direccion', e));
}
function MostrarInfoPersonal(data) {
    let button = document.createElement('button');
    let table = document.getElementById('TablaPersonal');
    document.getElementById('TituloPersonal').innerHTML = 'Informacion Personal';
    table.innerHTML = '';
    let tablaPrincipal = document.getElementById('TablaPInfo');
    tablaPrincipal.hidden = false;
    data.forEach(item => {
        let editItem = button.cloneNode(false);
        editItem.innerHTML = 'Editar';
        editItem.setAttribute('onclick', `MostrarEditarPersonal(${item.id})`);

        let deleteItem = button.cloneNode(false);
        deleteItem.innerHTML = 'Eliminar';
        deleteItem.setAttribute('onclick', `EliminarMasivo(${item.id})`);

        let tr = table.insertRow();

        let td01 = tr.insertCell(0);
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

function MostrarInfoPersonalBusqueda(data) {
    let button = document.createElement('button');
    let table = document.getElementById('TablaPersonal');
    document.getElementById('TituloPersonal').innerHTML = 'Informacion Personal';
    table.innerHTML = '';
    console.log(data);
    let tablaPrincipal = document.getElementById('TablaPInfo');
    document.getElementById('IdResultado').value = data.id;
    tablaPrincipal.hidden = false;
    let editItem = button.cloneNode(false);
    editItem.innerHTML = 'Editar';
    //editItem.setAttribute('onclick', `MostrarEditarPersonalBusqueda(${data})`);
    //editItem.addEventListener("click", MostrarEditarPersonalBusqueda(data));

    let deleteItem = button.cloneNode(false);
    deleteItem.innerHTML = 'Eliminar';
    deleteItem.setAttribute('onclick', `EliminarMasivo(${data.id})`);

    let tr = table.insertRow();

    let td01 = tr.insertCell(0);
    td01.appendChild(editItem);
    let td02 = tr.insertCell(1);
    td02.appendChild(deleteItem);
    let td1 = tr.insertCell(2);
    let nom = document.createTextNode(data.nombre);
    td1.appendChild(nom);
    let td2 = tr.insertCell(3);
    let ape1 = document.createTextNode(data.primerApellido);
    td2.appendChild(ape1);
    let td3 = tr.insertCell(4);
    let ape2 = document.createTextNode(data.segundoApellido);
    td3.appendChild(ape2);
    let td4 = tr.insertCell(5);
    let ced = document.createTextNode(data.cedula);
    td4.appendChild(ced);
    let td5 = tr.insertCell(6);
    let nac = document.createTextNode(data.fechaNacimiento);
    td5.appendChild(nac);
    let td6 = tr.insertCell(7);
    let est = document.createTextNode(data.estadoCivil);
    td6.appendChild(est);
    let td7 = tr.insertCell(8);
    let numA = document.createTextNode(data.numeroAsegurado);
    td7.appendChild(numA);
    let td8 = tr.insertCell(9);
    let san = document.createTextNode(data.tipoSangre);
    td8.appendChild(san);
    let td9 = tr.insertCell(10);
    let iban = document.createTextNode(data.cuentaBancaria);
    td9.appendChild(iban);
    let td10 = tr.insertCell(11);
    let ban = document.createTextNode(data.bancoEspecifico);
    td10.appendChild(ban);
    let td11 = tr.insertCell(12);
    let con = document.createTextNode(data.contrasena);
    td11.appendChild(con);

    itemsPersonal = data;
}

function GetInfoPersonal() {
    let uri = 'https://localhost:44351/api/InformacionPersonal';
    fetch(uri)
        .then(response => response.json())
        .then(data => MostrarInfoPersonal(data))
        .catch(error => console.error('No se pudo traer la info personal', error));
}

function GetInfoPersonalBusqueda() {
    let uri = 'https://localhost:44351/api/InformacionPersonal';
    fetch(uri)
        .then(response => response.json())
        .then(data => MostrarInfoPersonalBusqueda(data))
        .catch(error => console.error('No se pudo traer la info personal', error));
}

function EliminarPersonal(id) {
    let uri = 'https://localhost:44351/api/InformacionPersonal';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => GetInfoPersonal())
        .catch(error => console.error('No se pudo eliminar la info Personal', error));
}
function EditarPersonal() {
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
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(() => GetInfoPersonal())
        .catch(error => console.error('no se pudo actualizar la info personal', error));
    CerrarFormPersonal();
    return false;
}

function EditarPersonalBusqueda() {
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
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(() => GetInfoPersonalBusqueda())
        .catch(error => console.error('no se pudo actualizar la info personal', error));
    CerrarFormPersonal();
    return false;
}

function MostrarEditarPersonal(id) {
    document.getElementById('FormEditPersonal').hidden = false;
    let item = itemsPersonal.find(item => item.id === id);
    document.getElementById('IdInfoPersonal').value = item.id;
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

function MostrarEditarPersonalBusqueda(data) {
    document.getElementById('FormEditPersonal').hidden = false;
    document.getElementById('IdInfoPersonal').value = data.id;
    document.getElementById('editNombre').value = data.nombre;
    document.getElementById('edit1Apellido').value = data.primerApellido;
    document.getElementById('edit2Apellido').value = data.segundoApellido;
    document.getElementById('editCedula').value = data.cedula;
    document.getElementById('editFechaNacimiento').value = data.fechaNacimiento;
    document.getElementById('editEstadoCivil').value = data.estadoCivil;
    document.getElementById('editNumeroAsegurado').value = data.numeroAsegurado;
    document.getElementById('editTipoSangre').value = data.tipoSangre;
    document.getElementById('editCuentaBancaria').value = data.cuentaBancaria;
    document.getElementById('editBancoEspecifico').value = data.bancoEspecifico;
    document.getElementById('editContrasena').value = data.contrasena;
}

function CerrarFormPersonal() {
    document.getElementById('FormEditPersonal').hidden = true;
}
function MostrarInfoDireccion(data) {
    let tabla = document.getElementById('TablaDireccion');
    let tablaPrincipal = document.getElementById('TablaPDire');
    document.getElementById('TituloDireccion').innerHTML = 'Informacion Direccion';
    const button = document.createElement('button');
    tabla.innerHTML = '';
    tablaPrincipal.hidden = false;
    data.forEach(item => {

        let editItem = button.cloneNode(false);
        editItem.innerHTML = 'Editar';
        editItem.setAttribute('onclick', `MostrarEditarDireccion(${item.idInformacionDireccion})`);

        /*let deleteItem = button.cloneNode(false);
        deleteItem.innerHTML = 'Eliminar';
        deleteItem.setAttribute('onclick', `EliminarDireccion(${item.idInformacionDireccion})`);
        */
        let tr = tabla.insertRow();
        let td01 = tr.insertCell(0);
        td01.appendChild(editItem);
        /*let td02 = tr.insertCell(1);
        td02.appendChild(deleteItem);*/
        let td1 = tr.insertCell(1);
        let pro = document.createTextNode(item.provincia);
        td1.appendChild(pro);
        let td2 = tr.insertCell(2);
        let can = document.createTextNode(item.canton);
        td2.appendChild(can);
        let td3 = tr.insertCell(3);
        let dis = document.createTextNode(item.distrito);
        td3.appendChild(dis);
        let td4 = tr.insertCell(4);
        let dir = document.createTextNode(item.direccionExacta);
        td4.appendChild(dir);
    });
    itemsDireccion = data;
}

function MostrarInfoDireccionBusqueda(data) {
    let tabla = document.getElementById('TablaDireccion');
    let tablaPrincipal = document.getElementById('TablaPDire');
    document.getElementById('TituloDireccion').innerHTML = 'Informacion Direccion';
    const button = document.createElement('button');
    tabla.innerHTML = '';
    tablaPrincipal.hidden = false;
    let editItem = button.cloneNode(false);
    editItem.innerHTML = 'Editar';
    editItem.setAttribute('onclick', `MostrarEditarDireccion(${data.idInformacionDireccion})`);

    let tr = tabla.insertRow();
    let td01 = tr.insertCell(0);
    td01.appendChild(editItem);
    /*let td02 = tr.insertCell(1);
    td02.appendChild(deleteItem);*/
    let td1 = tr.insertCell(1);
    let pro = document.createTextNode(data.provincia);
    td1.appendChild(pro);
    let td2 = tr.insertCell(2);
    let can = document.createTextNode(data.canton);
    td2.appendChild(can);
    let td3 = tr.insertCell(3);
    let dis = document.createTextNode(data.distrito);
    td3.appendChild(dis);
    let td4 = tr.insertCell(4);
    let dir = document.createTextNode(data.direccionExacta);
    td4.appendChild(dir);
    itemsDireccion = data;
}

function GetInfoDireccion() {
    let uri = 'https://localhost:44351/api/InfoDireccion';
    fetch(uri)
        .then(response => response.json())
        .then(data => MostrarInfoDireccion(data))
        .catch(error => console.error('No se pudo traer la informacion de direccion', error));
}
function EliminarDireccion(id) {
    let uri = 'https://localhost:44351/api/InfoDireccion';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    }).then(() => GetInfoDireccion())
        .catch(error => console.error('No se pudo eliminar la direccion', error));
}
function MostrarEditarDireccion(id) {
    let item = itemsDireccion.find(item => item.idInformacionDireccion === id);
    document.getElementById('IdInfoDireccion').value = item.idInformacionDireccion;
    document.getElementById('editProvincia').value = item.provincia;
    document.getElementById('editCanton').value = item.canton;
    document.getElementById('editDistrito').value = item.distrito;
    document.getElementById('editDireccion').value = item.direccionExacta;
    document.getElementById('FormEditarDireccion').hidden = false;
}
function EditarDireccion() {
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
    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => GetInfoDireccion())
        .catch(error => console.error('No se actualizo la informacion direcion', error));
    CerrarFormDireccion();
    return false;
}
function CerrarFormDireccion() {
    document.getElementById('FormEditarDireccion').hidden = true;
}

/*Info Academica*/

let itemsFormal = [];
let itemsComp = [];
let itemsIdioma = [];


function GuardarAcademicaFormal() {
    let institucion = document.getElementById('Institucion1').value;
    let acreditacion = document.getElementById('Acreditacion1').value;
    let fechaGraduacion = document.getElementById('FechaGraduacion1').value;
    let IdPersona = localStorage.getItem("IdCliente");
    const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
    const item = {
        Institucion: institucion.trim(),
        Acreditacion: acreditacion.trim(),
        FechaGraduacion: fechaGraduacion.trim(),
        informacionPersonalId: IdPersona
    };
    fetch(uri,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(response => response.json()).then(() => {
            institucion.value = '';
            acreditacion.value = '';
            fechaGraduacion.value = '';
        }).catch(error => console.error('No se guardo', error));
}

function GuardarAcademicaComp() {
    let institucion = document.getElementById('Institucion2').value;
    let acreditacion = document.getElementById('Acreditacion2').value;
    let fechaGraduacion = document.getElementById('FechaGraduacion2').value;
    const IdPersona = localStorage.getItem("IdCliente");
    const uri = 'https://localhost:44351/api/InfoAcademicaComp';
    const item = {
        Institucion: institucion.trim(),
        Acreditacion: acreditacion.trim(),
        FechaGraduacion: fechaGraduacion.trim(),
        informacionPersonalId: IdPersona
    };
    fetch(uri,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(response => response.json()).then(() => {
            institucion.value = '';
            acreditacion.value = '';
            fechaGraduacion.value = '';
        }).catch(error => console.error('no se guardo', error));
}
function GuardarAcademicaIdioma() {
    let idioma = document.getElementById('Idioma1').value;
    let nivel = document.getElementById('Nivel1').value;
    const IdPersona = localStorage.getItem("IdCliente");
    const uri = 'https://localhost:44351/api/InfoAcademicaIdioma';
    const item = {
        Idioma: idioma.trim(),
        Nivel: nivel.trim(),
        informacionPersonalId: IdPersona
    };
    fetch(uri,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(() => {
            idioma.value = '';
            nivel.value = '';
        })
        .catch(error => console.error('error al ingresar', error));
}
function MostrarInfoAcademicaFormal(data) {
    let button = document.createElement('button');
    let tablaPrincipal = document.getElementById('tablaInfoFormal');
    const table = document.getElementById('InfoFormal');
    table.innerHTML = '';
    tablaPrincipal.hidden = false;
    document.getElementById('tituloFormal').innerHTML = 'Informacion Academica Formal';
    data.forEach(item => {

        let editarItem = button.cloneNode(false);
        editarItem.innerHTML = 'Editar';
        editarItem.setAttribute('onclick', `MostrarEditarInfoFormal(${item.id})`);

        let tr = table.insertRow();

        let td01 = tr.insertCell(0);
        td01.appendChild(editarItem);

        let td1 = tr.insertCell(1);
        let inst = document.createTextNode(item.institucion);
        td1.appendChild(inst);

        let td2 = tr.insertCell(2);
        let acr = document.createTextNode(item.acreditacion);
        td2.appendChild(acr);

        let td3 = tr.insertCell(3);
        let fec = document.createTextNode(item.fechaGraduacion);
        td3.appendChild(fec);
    });
    itemsFormal = data;
}

function GetInfoFormal() {
    const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
    fetch(uri)
        .then(response => response.json())
        .then(data => MostrarInfoAcademicaFormal(data))
        .catch(e => console.error('No se pudo mostrar', e));
}
function EliminarInfoFormal(id) {
    const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => GetInfoFormal())
        .catch(error => console.error('No se pudo eliminar', error));
}
function MostrarEditarInfoFormal(id) {//cambiar
    const item = itemsFormal.find(item => item.id === id);
    document.getElementById('idInfoFormal').value = item.id;
    document.getElementById('EditInstF').value = item.institucion;
    document.getElementById('EditAcrF').value = item.acreditacion;
    document.getElementById('EditFinF').value = item.fechaGraduacion;
    document.getElementById('EditInfoFormal').hidden = false;
}
function EditarInfoFormal() {//cambiar
    const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
    const id = document.getElementById('idInfoFormal').value;
    //alert(id);
    const institucion = document.getElementById('EditInstF').value;
    const acreditacion = document.getElementById('EditAcrF').value;
    const fechaGraduacion = document.getElementById('EditFinF').value;
    const IdPersona = document.getElementById('IdNewCliente').value;
    const item = {
        id: id,
        institucion: institucion,
        acreditacion: acreditacion,
        fechaGraduacion: fechaGraduacion,
        informacionPersonalId: IdPersona
    };
    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(() => GetInfoFormal())
        .catch(error => console.error('no se pudo actualizar la info formal', error));
    CerrarFormFormal();
    return false;
}
function CerrarFormFormal() {
    document.getElementById('EditInfoFormal').hidden = true;
}
function MostrarInfoAcademicaComplementaria(data) {
    const table = document.getElementById('InfoComp');
    document.getElementById('tituloComp').innerHTML = 'Informacion Academica Complementaria';
    let boton = document.createElement('button');
    let tablaPrincipal = document.getElementById('tablaInfoComp');
    tablaPrincipal.hidden = false;
    table.innerHTML = '';
    data.forEach(item => {

        let editarItem = boton.cloneNode(false);
        editarItem.innerHTML = 'Editar';
        editarItem.setAttribute('onclick', `MostrarEditarInfoComp(${item.id})`);

        /*let eliminarItem = boton.cloneNode(false);
        eliminarItem.innerHTML = 'Eliminar';
        eliminarItem.setAttribute('onclick', `EliminarInfoComp(${item.idInformacionAcademicaComp})`)*/
        let tr = table.insertRow();

        let td01 = tr.insertCell(0);
        td01.appendChild(editarItem);

        /*let td02 = tr.insertCell(1);
        td02.appendChild(eliminarItem);
        */
        let td1 = tr.insertCell(1);
        let inst = document.createTextNode(item.institucion);
        td1.appendChild(inst);

        let td2 = tr.insertCell(2);
        let acr = document.createTextNode(item.acreditacion);
        td2.appendChild(acr);

        let td3 = tr.insertCell(3);
        let fec = document.createTextNode(item.fechaGraduacion);
        td3.appendChild(fec);
    });
    itemsComp = data;
}

function GetInfoComp() {
    const uri = 'https://localhost:44351/api/InfoAcademicaComp';
    fetch(uri)
        .then(response => response.json())
        .then(data => MostrarInfoAcademicaComplementaria(data))
        .catch(e => console.error('no se pudo mostrar la complementaria', e));
}
function EliminarInfoComp(id) {
    let uri = 'https://localhost:44351/api/InfoAcademicaComp';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => GetInfoComp())
        .catch(error => console.error('no se elimino', error));
}
function MostrarEditarInfoComp(id) {
    let item = itemsComp.find(item => item.id === id);
    document.getElementById('idInfoComp').value = item.id;
    document.getElementById('EditInstC').value = item.institucion;
    document.getElementById('EditAcrC').value = item.acreditacion;
    document.getElementById('EditFinC').value = item.fechaGraduacion;
    document.getElementById('EditInfoComp').hidden = false;
}
function EditarInfoComp() {
    const uri = 'https://localhost:44351/api/InfoAcademicaComp';
    const id = document.getElementById('idInfoComp').value;
    const institucion = document.getElementById('EditInstC').value;
    const acreditacion = document.getElementById('EditAcrC').value;
    const fechaGraduacion = document.getElementById('EditFinC').value;
    const IdPersona = document.getElementById('IdNewCliente').value;
    const item = {
        id: id,
        institucion: institucion,
        acreditacion: acreditacion,
        fechaGraduacion: fechaGraduacion,
        informacionPersonalId: IdPersona
    };
    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(() => GetInfoComp())
        .catch(error => console.error('no se pudo actualizar la info formal', error));
    CerrarFormComp();
    return false;
}
function CerrarFormComp() {
    document.getElementById('EditInfoComp').hidden = true;
}
function MostrarInfoAcademicaIdioma(data) {
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
        editarItem.setAttribute('onclick', `MostrarEditarInfoIdioma(${item.id})`);

        let td01 = tr.insertCell(0);
        td01.appendChild(editarItem);

        let td1 = tr.insertCell(1);
        let idioma = document.createTextNode(item.idioma);
        td1.appendChild(idioma);

        let td2 = tr.insertCell(2);
        let nivel = document.createTextNode(item.nivel);
        td2.appendChild(nivel);
    });
    itemsIdioma = data;
}
function GetInfoIdioma() {
    const uri = 'https://localhost:44351/api/InfoAcademicaIdioma';
    fetch(uri)
        .then(response => response.json())
        .then(data => MostrarInfoAcademicaIdioma(data))
        .catch(e => console.error('No se pudo traer info idioma', e));
}
function EliminarIdioma(id) {
    let uri = 'https://localhost:44351/api/InfoAcademicaIdioma';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => GetInfoIdioma())
        .catch(error => console.error('no se elimino', error));
}
function MostrarEditarInfoIdioma(id) {
    let item = itemsIdioma.find(item => item.id === id);
    document.getElementById('IdInfoIdioma').value = item.id;
    document.getElementById('EditIdioma').value = item.idioma;
    document.getElementById('EditNivel').value = item.nivel;
    document.getElementById('EditarInfoIdioma').hidden = false;
}
function EditarInfoIdioma() {
    let uri = 'https://localhost:44351/api/InfoAcademicaIdioma';
    let id = document.getElementById('IdInfoIdioma').value;
    let idioma = document.getElementById('EditIdioma').value;
    let nivel = document.getElementById('EditNivel').value;
    const IdPersona = document.getElementById('IdNewCliente').value;
    let item = {
        id: id,
        idioma: idioma,
        nivel: nivel,
        informacionPersonalId: IdPersona
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
function CerrarFormIdioma() {
    document.getElementById('EditarInfoIdioma').hidden = true;
}


/*Info Laboral*/

let itemsLaboral = [];
function GuardarInfoLaboral() {
    const institucion = document.getElementById('Institucion').value;
    const fechaIng = document.getElementById('FechaInicio').value;
    const fechaFin = document.getElementById('FechaFin').value;
    const IdPersona = localStorage.getItem("IdCliente");
    const uri = 'https://localhost:44351/api/InformacionLaboral';
    const item = {
        Institucion: institucion.trim(),
        FechaInicio: fechaIng.trim(),
        FechaFinal: fechaFin.trim(),
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
        .then(() => {
            institucion.value = '';
            fechaIng.value = '';
            fechaFin.value = '';
        })
        .catch(e => console.error('No se puede guardar', e));
}
function MostrarInfoLaboral(data) {

    let tablaPrincipal = document.getElementById('tablaInfoLaboral');
    const table = document.getElementById('tableLaboral');
    let boton = document.createElement('button');
    document.getElementById('tituloLaboral').innerHTML = 'Informacion Laboral';
    table.innerHTML = '';
    tablaPrincipal.hidden = false;

    data.forEach(item => {
        let editarItem = boton.cloneNode(false);
        editarItem.innerHTML = 'Editar';
        editarItem.setAttribute('onclick', `MostrarEditarLaboral(${item.idInfoLaboral})`);

        /*let eliminarItem = boton.cloneNode(false);
        eliminarItem.innerHTML = 'Eliminar';
        eliminarItem.setAttribute('onclick', `EliminarLaboral(${item.idInfoLaboral})`);
        */
        let tr = table.insertRow();

        let td01 = tr.insertCell(0);
        td01.appendChild(editarItem);

        /*let td02 = tr.insertCell(1);
        td02.appendChild(eliminarItem);
        */
        let td1 = tr.insertCell(1);
        let inst = document.createTextNode(item.institucion);
        td1.appendChild(inst);

        let td2 = tr.insertCell(2);
        let ini = document.createTextNode(item.fechaInicio);
        td2.appendChild(ini);

        let td3 = tr.insertCell(3);
        let fin = document.createTextNode(item.fechaFinal);
        td3.appendChild(fin);
    });
    itemsLaboral = data;
}
function GetInfoLaboral() {
    const uri = 'https://localhost:44351/api/InformacionLaboral';
    fetch(uri)
        .then(response => response.json())
        .then(data => MostrarInfoLaboral(data))
        .catch(e => console.error('No trajo info laboral', e));
}
function EliminarLaboral(id) {
    const uri = 'https://localhost:44351/api/InformacionLaboral';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    }).then(() => GetInfoLaboral())
        .catch(error => console.error('No se pudo eliminar el objeto', error));
}
function MostrarEditarLaboral(id) {
    let item = itemsLaboral.find(item => item.idInfoLaboral === id);
    document.getElementById('IdLaboral').value = item.idInfoLaboral;
    document.getElementById('editInstitucion').value = item.institucion;
    document.getElementById('editFechaInicio').value = item.fechaInicio;
    document.getElementById('editFechaFin').value = item.fechaFin;
    document.getElementById('FormEditLaboral').hidden = false;
}
function EditarLaboral() {
    let uri = 'https://localhost:44351/api/InformacionLaboral';
    let Id = document.getElementById('IdLaboral').value;
    let inst = document.getElementById('editInstitucion').value;
    let inic = document.getElementById('editFechaInicio').value;
    let fin = document.getElementById('editFechaFin').value;
    const IdPersona = document.getElementById('IdNewCliente').value;
    let item = {
        idInfoLaboral: Id,
        institucion: inst,
        fechaInicio: inic,
        fechaFinal: fin,
        informacionPersonalId: IdPersona
    };
    fetch(`${uri}/${Id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => GetInfoLaboral())
        .catch(error => console.error('No se actualizo laboral ', error));
    CerrarFormLaboral();
    return false;
}
function CerrarFormLaboral() {
    document.getElementById('FormEditLaboral').hidden = true;
}

let itemsContacto = [];

function GuardarInfoContacto() {
    const uri = 'https://localhost:44351/api/InfoContacto';
    let TCel = document.getElementById('TCelular').value;
    let TOfi = document.getElementById('TOficina').value;
    let TCasa = document.getElementById('TCasa').value;
    let TExtra = document.getElementById('TExtra').value;
    let Email = document.getElementById('Email').value;
    let ZIP = document.getElementById('ZIP').value;
    let TEme = document.getElementById('TEmergencia').value;
    let NomEme = document.getElementById('NomEmergencia').value;
    let item = {
        telefonoCelular: TCel,
        telefonoOficina: TOfi,
        telefonoCasa: TCasa,
        telefonoExtra: TExtra,
        email: Email,
        zip: ZIP,
        contactoEmergencia: TEme,
        contactoEmergenciaNombre: NomEme
    }
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(response => response.json())
        .then(() => { TCel = ''; TOfi = ''; TCasa = ''; TExtra = ''; Email = ''; ZIP = ''; TEme = ''; NomEme = ''; })
        .catch(error => console.error('No se pudo guardar', error));
}

function MostrarInfoContacto(data) {
    document.getElementById('tablaInfoContacto').hidden = false;
    let body = document.getElementById('tableContacto');
    body.innerHTML = '';
    let boton = document.createElement('button');
    document.getElementById('tituloContacto').innerHTML = 'Información Contacto';
    data.forEach(item => {
        let editarItem = boton.cloneNode(false);
        editarItem.innerHTML = 'Editar';
        editarItem.setAttribute('onclick', `MostrarEditarContacto(${item.idInfoContacto})`);

        let tr = body.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(editarItem);

        let td2 = tr.insertCell(1);
        let cel = document.createTextNode(item.telefonoCelular);
        td2.appendChild(cel);

        let td3 = tr.insertCell(2);
        let ofi = document.createTextNode(item.telefonoOficina);
        td3.appendChild(ofi);

        let td4 = tr.insertCell(3);
        let casa = document.createTextNode(item.telefonoCasa);
        td4.appendChild(casa);

        let td5 = tr.insertCell(4);
        let ext = document.createTextNode(item.telefonoExtra);
        td5.appendChild(ext);

        let td6 = tr.insertCell(5);
        let email = document.createTextNode(item.email);
        td6.appendChild(email);

        let td7 = tr.insertCell(6);
        let zip = document.createTextNode(item.zip);
        td7.appendChild(zip);

        let td8 = tr.insertCell(7);
        let eme = document.createTextNode(item.contactoEmergencia);
        td8.appendChild(eme);

        let td9 = tr.insertCell(8);
        let nomEme = document.createTextNode(item.contactoEmergenciaNombre);
        td9.appendChild(nomEme);
    });
    itemsContacto = data;
}

function MostrarInfoContactoBusqueda(data) {
    document.getElementById('tablaInfoContacto').hidden = false;
    let body = document.getElementById('tableContacto');
    body.innerHTML = '';
    let boton = document.createElement('button');
    document.getElementById('tituloContacto').innerHTML = 'Información Contacto';
    let editarItem = boton.cloneNode(false);
    editarItem.innerHTML = 'Editar';
    editarItem.setAttribute('onclick', `MostrarEditarContacto(${data.idInfoContacto})`);

    let tr = body.insertRow();

    let td1 = tr.insertCell(0);
    td1.appendChild(editarItem);

    let td2 = tr.insertCell(1);
    let cel = document.createTextNode(data.telefonoCelular);
    td2.appendChild(cel);

    let td3 = tr.insertCell(2);
    let ofi = document.createTextNode(data.telefonoOficina);
    td3.appendChild(ofi);

    let td4 = tr.insertCell(3);
    let casa = document.createTextNode(data.telefonoCasa);
    td4.appendChild(casa);

    let td5 = tr.insertCell(4);
    let ext = document.createTextNode(data.telefonoExtra);
    td5.appendChild(ext);

    let td6 = tr.insertCell(5);
    let email = document.createTextNode(data.email);
    td6.appendChild(email);

    let td7 = tr.insertCell(6);
    let zip = document.createTextNode(data.zip);
    td7.appendChild(zip);

    let td8 = tr.insertCell(7);
    let eme = document.createTextNode(data.contactoEmergencia);
    td8.appendChild(eme);

    let td9 = tr.insertCell(8);
    let nomEme = document.createTextNode(data.contactoEmergenciaNombre);
    td9.appendChild(nomEme);
    itemsContacto = data;
}

function GetInfoContacto() {
    let uri = 'https://localhost:44351/api/InfoContacto';
    fetch(uri)
        .then(response => response.json())
        .then(data => MostrarInfoContacto(data))
        .catch(error => console.error('No se encontraron datos de contacto', error));
}

function MostrarEditarContacto(id) {
    document.getElementById('EditarInfoContacto').hidden = false;
    let item = itemsContacto.find(i => i.idInfoContacto === id);
    document.getElementById('idContacto').value = item.idInfoContacto;
    document.getElementById('editTCelular').value = item.telefonoCelular;
    document.getElementById('editTOficina').value = item.telefonoOficina;
    document.getElementById('editTCasa').value = item.telefonoCasa;
    document.getElementById('editTExtra').value = item.telefonoExtra;
    document.getElementById('editEmail').value = item.email;
    document.getElementById('editZIP').value = item.zip;
    document.getElementById('editTEmergencia').value = item.contactoEmergencia;
    document.getElementById('editNomEmergencia').value = item.contactoEmergenciaNombre;
}
function CerrarFormContacto() {
    document.getElementById('EditarInfoContacto').hidden = true;
}
function EliminarInfoContacto(id) {
    const uri = 'https://localhost:44351/api/InfoContacto';
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => GetInfoContacto())
        .catch(error => console.error('No se pudo eliminar la info contacto', error));
}

function EditarContacto() {
    let uri = 'https://localhost:44351/api/InfoContacto';
    let TCel = document.getElementById('editTCelular').value;
    let TOfi = document.getElementById('editTOficina').value;
    let TCasa = document.getElementById('editTCasa').value;
    let TExtra = document.getElementById('editTExtra').value;
    let Email = document.getElementById('editEmail').value;
    let ZIP = document.getElementById('editZIP').value;
    let TEme = document.getElementById('editTEmergencia').value;
    let NomEme = document.getElementById('editNomEmergencia').value;
    let id = document.getElementById('idContacto').value;
    let item = {
        idInfoContacto: id,
        telefonoCelular: TCel,
        telefonoOficina: TOfi,
        telefonoCasa: TCasa,
        telefonoExtra: TExtra,
        email: Email,
        zip: ZIP,
        contactoEmergencia: TEme,
        contactoEmergenciaNombre: NomEme
    }
    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => GetInfoContacto())
        .catch(error => console.error('No se pudo actualizar la informacion', error));
    CerrarFormContacto();
    return false;
}

function MeasuredBoy() {
    GuardarInfoLaboral();
}
function MostrarResultado() {
    window.location = 'MostrarInfoAdmin.html';
}

function GetIdNewCliente(){
    let cedula = localStorage.getItem('CedulaNewCliente');
    $.get("https://localhost:44351/api/BusquedaCedula/" + cedula, function (data){
        localStorage.setItem("IdCliente", data.id);
        console.log(data.id);
    });
}

function EliminarMasivo(id) {
    EliminarPersonal(id);
    EliminarDireccion(id);
    EliminarInfoFormal(id);
    EliminarInfoComp(id);
    EliminarIdioma(id);
    EliminarLaboral(id);
    EliminarInfoContacto(id);
}
function BigGet() {
    GetInfoFormal();
    GetInfoComp();
    GetInfoIdioma();
}

function BigGuardar() {
    GuardarAcademicaIdioma();
    GuardarAcademicaComp();
    GuardarAcademicaFormal();

}
function TraerInfo() {
    GetInfoDireccion();
    GetInfoPersonal();
}
function BigBoy() {
    GuardarInfoDireccion();
    GuardarInfoPersonal();
    GuardarInfoContacto();
}
function NextPagePersonal() {
    window.location = 'InsertarInfoAcademicaAdmin.html';
}
function NextPage() {
    window.location = 'InsertarInfoLaboralAdmin.html';
}