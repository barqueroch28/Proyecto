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
function BigBoy(){
    GuardarInfoDireccion();
    GuardarInfoPersonal();
    window.location = 'InfoAcademica.html';
}