let input = document.getElementById("input");
let banderas = Array.from(document.getElementsByClassName("country__flag"));
let boton = document.getElementById("button");
let elegido = 0 ; banderas[0].style.border = '2px solid white';
let objetoPais = venezuela;

//en android hace que el footer no se suba con el keyboard
var viewport = document.querySelector("meta[name=viewport]")
viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight)

//event listeners
banderas.forEach((item) => {
  item.addEventListener("click", elegirBandera)
});

boton.addEventListener("click", calcular)

//funciones de los listeners
function elegirBandera(event){
  banderas.forEach((item) => {
    item.style.border = "2px solid black"
  });
  event.target.style.border = '2px solid white';
  elegido = banderas.indexOf(event.target);
  switch (elegido) {
    case 0:
      input.placeholder = '$USA'
      objetoPais = venezuela
      break;
    case 1:
      input.placeholder = '$COL'
      objetoPais = colombia
      break;
    case 2:
      input.placeholder = '$MXN'
      objetoPais = mexico
  }
}

function calcular(){
  let mostradorImpuestos = document.getElementById("impuestos")
  let promedio = cambioPorcentual(objetoPais.salarioMedio, input.value);
  let endeudamiento = input.value * 0.35
  if (input.value) {
    document.getElementById("relacion-promedio").innerHTML = `Cambio Porcentual en relación al salario medio: ${promedio}%`
    document.getElementById("relacion-costovida").innerHTML = costovida(input.value)
    document.getElementById("capacidad-endeudamiento").innerHTML = `Capacidad de Endeudamiento: ${endeudamiento.toLocaleString()}$`
    switch (elegido) {
      case 0:
        mostradorImpuestos.innerHTML = 'Impuesto: No disponible.'
        break;
      case 1:
        mostradorImpuestos.innerHTML = 'Impuesto: ' + impuestoscol(input.value) + '%'
        break;
      case 2:
        mostradorImpuestos.innerHTML = 'Impuesto: ' + impuestosmex(input.value) + '%'
    }
  }
}

//helpers
function cambioPorcentual(promedio, personal){
  let cambio = ( (personal - promedio) / promedio ) * 100;
  return cambio.toFixed(1)
}

function costovida(ingreso){
  if (ingreso > objetoPais.costoVida) {
    return 'Se pueden cubrir todos los gastos básicos.'
  }
  return 'No se pueden cubrir los gastos básicos.'
}

function impuestoscol(ingresos){
  if (ingresos >= 0 && ingresos <= 1400000) {
    return 0;
  }
  else if(ingresos <= 1700000){
    return 19
  }
  else if(ingresos <= 4100000){
    return 28
  }
  return 33;
}

function impuestosmex(ingresos){
  if (ingresos >= 0 && ingresos <= 578.52) {
    return 1.92
  }
  else if(ingresos <= 4910.18){
    return 6.40
  }
  else if(ingresos <= 8629.21){
    return 10.88
  }
  else if(ingresos <= 10031.08){
    17.92
  }
  else if(ingresos <= 12009.95){
    return 21.36
  }
  else if(ingresos <= 24222.32){
    return 23.52
  }
  else if(ingresos <= 38177.70){
    return 30
  }
}
function promedio(array){
  let salariosRecogidos = array.map( i => i.salario)
  let sumado = salariosRecogidos.reduce( (acc, item) => acc += item);
  let resultado = (sumado / array.length).toFixed(1);
  return resultado;
}

function mediana(array){
  let ordenado = array.sort( (a,b) => a.salario - b.salario);
  let mitad = parseInt(array.length / 2);
  let mediana;
  if (array.length % 2 == 0) {
    let mitadCompartida = [array[mitad], array[mitad - 1]];
    mediana = promedio(mitadCompartida)
  } else{
    mediana = array[mitad]
  }
  return mediana
}

function medianaTop10(array){
  let ordenado = array.sort( (a,b) => a.salario - b.salario);
  let indexTop10 = array.length - (array.length * 0.10);
  let arrayTop10 = ordenado.filter( (item, index) => index >= indexTop10)
  let medianaTop10 = mediana(arrayTop10);
  return medianaTop10;
}
