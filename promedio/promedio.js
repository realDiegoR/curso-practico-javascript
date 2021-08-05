let input = document.getElementById("input");
document.getElementById("boton").addEventListener("click", calcular);

function calcular(){
  let arrayRecogido = input.value.split(",");
  let arrayParseado = arrayRecogido.map( (item) => parseInt(item))
  let arrayLimpio = arrayParseado.filter( item => { if(item == 0) return 1; else return Boolean(item)} );

  document.getElementById("mediaArit").innerHTML = promedio(arrayLimpio)
  document.getElementById("mediaGeom").innerHTML = mediaGeometrica(arrayLimpio)
  document.getElementById("mediana").innerHTML = mediana(arrayLimpio)
  document.getElementById("moda").innerHTML = moda(arrayLimpio)
}

document.getElementById("ponderado").addEventListener("click", ponder);

function ponder(){
  let arrayRecogido = input.value.split(",");
  let arrayParseado = arrayRecogido.map( (item) => parseInt(item))
  let arrayLimpio = arrayParseado.filter( item => { if(item == 0) return 1; else return Boolean(item)} );
  let creditos = prompt(`Tienes ${arrayLimpio.length} elementos. Indica el crédito de cada uno, en el mismo orden con precaución. El orden es: ${arrayLimpio.join()}`)
  let creditoRecogido = creditos.split(",");
  let creditoParseado = creditoRecogido.map( (item) => parseInt(item))
  let arrayFinal = [];
  arrayLimpio.forEach((item, i) => {
    let objeto = new Elemento(item, creditoParseado[i])
    arrayFinal.push(objeto)
  });
  document.getElementById("mediaPond").innerHTML = ponderado(arrayFinal)
}

//FUNCIONES
function promedio(array){
  let sumado = array.reduce( (acc, item) => acc += item);
  let resultado = (sumado / array.length).toFixed(2);
  return resultado;
}

function mediana(array){
  let ordenado = array.sort( (a,b) => a - b);
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

function moda(array){
  //cuenta la cantidad de repeticiones
  let contador = {};
  array.map(
    (item) => {
      if (contador[item]) {
        contador[item] += 1;
      } else{
          contador[item] = 1;
      }
    }
  )
  //acomoda de mayor a menor
  let acomodar = []
  for (var i in contador) {
    acomodar.push([i, contador[i]])
  }
  acomodar.sort( (a,b) => b[1] - a[1]);
  //compara si todas las repeticiones son iguales
  let herramientaDeComparacion = acomodar[0][1];
  acomodar.map(
    (item) => {
      if (item[1] == herramientaDeComparacion) {
        item[2] = true;
      } else{
        item[2] = false;
      }
    }
  )
  // console.log(acomodar.every( (item) => item[2] == true))
  if (acomodar.every( (item) => item[2] == true)) {
    return 'No hay moda...'
  }
  //si hay alguna repeticion no igual, devuelve la mayor
  return acomodar[0][0];
}

function mediaGeometrica(array){
  let cantidad = array.length;
  let multiplicacion = array.reduce(
    (acc, item) => acc = acc * item
  )
  let mediaGeometrica = Math.pow(multiplicacion, 1 / cantidad) //raiz cuadrada, solo que expresada en potencia en fraccion
  return mediaGeometrica.toFixed(2);
}


function Elemento(elemento,peso){
  this.elemento = elemento;
  this.peso = peso;
}
function ponderado(array){
  let numerosMultiplicados = array.map( (item) => item.elemento * item.peso);
  let numerosMultiplicadosSumados = numerosMultiplicados.reduce( (acc, item) => acc += item);
  let pesos = array.map( (item) => item.peso)
  let numeroDePesosSumados = pesos.reduce( (acc, item) => acc += item)
  // let numeroDePesosSumados = array.reduce( (acc, item) => acc += item.peso) //no funciona, idk

  let ponderado = numerosMultiplicadosSumados / numeroDePesosSumados;
  if (isNaN(ponderado)) {
    return "ERROR"
  }
  return ponderado;
}
