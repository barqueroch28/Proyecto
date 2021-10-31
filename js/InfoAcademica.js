
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
    let items = [];
    const table = document.getElementById('InfoFormal');
    table.innerHTML = '';
    data.foreach(item => {
        let tr = table.insertRow();

        let td1 = tr.insertCell(0);
        let inst = document.createTextNode(item.institucion);
        td1.appendChild(inst);

        let td2 = tr.insertCell(1);
        let acr = document.createTextNode(item.acreditacion);
        td2.appendChild(acr);

        let td3 = tr.insertCell(2);
        let fec = document.createTextNode(fec);
        td3.appendChild(fec);
    });
    items = data;
}
function GetInfoFormal(){
    const uri = 'https://localhost:44351/api/InfoAcademicaFormal';
    fetch(uri)
    .then(response => response.json())
    .then(data => MostrarInfoAcademicaFormal(data))
    .catch(e => console.error('No se pudo mostrar', e));
}
function BigGuardar(){
    GuardarAcademicaIdioma();
    GuardarAcademicaComp();
    GuardarAcademicaFormal();      
}
