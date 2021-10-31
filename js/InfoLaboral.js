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
function MeasuredBoy(){
    GuardarInfoLaboral();
}