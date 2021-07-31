//todos los inputs de numeros, donde se usaran los values para operar
let unidad = 'cm';
let buttons = document.getElementsByName('button');
let input_cuadrado = document.getElementById('input-cuadrado');
let input_triangulo1 = document.getElementById('input-triangulo1');
let input_triangulo2 = document.getElementById('input-triangulo2');
let input_triangulo3 = document.getElementById('input-triangulo3');
let input_triangulo4 = document.getElementById('input-triangulo4');
let input_isosceles1 = document.getElementById('input-isosceles1');
let input_isosceles2 = document.getElementById('input-isosceles2');
let input_isosceles3 = document.getElementById('input-isosceles3');
let input_circunferencia = document.getElementById('input-circunferencia');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", calcular(i));
}

function calcular(boton){
  //los outputs de las operaciones
  let cuadradoPe = document.getElementById("cuadrado-perimetro");
  let cuadradoAr = document.getElementById("cuadrado-area");
  let trianguloPe = document.getElementById("triangulo-perimetro");
  let trianguloAr = document.getElementById("triangulo-area");
  let circunferenciaPe = document.getElementById("circunferencia-perimetro");
  let circunferenciaAr = document.getElementById("circunferencia-area");
  let isoscelesAl = document.getElementById("isosceles-altura")
  return function(){
    switch (boton) {
      case 0:
        input_cuadrado.value ? cuadradoPe.innerHTML = perimetroCuadrado(input_cuadrado.value, unidad) : null ;
        break;
      case 1:
        input_cuadrado.value ? cuadradoAr.innerHTML = areaCuadrado(input_cuadrado.value, unidad) : null;
        break;
      case 2:
        input_triangulo1.value && input_triangulo2.value && input_triangulo3.value ? trianguloPe.innerHTML = perimetroTriangulo(input_triangulo1.value, input_triangulo2.value, input_triangulo3.value, unidad) : null;
        break;
      case 3:
        input_triangulo3.value && input_triangulo4.value ? trianguloAr.innerHTML = areaTriangulo(input_triangulo3.value, input_triangulo4.value, unidad) : null;
        break;
      case 4:
        input_isosceles1.value && input_isosceles2.value && input_isosceles3.value ? isoscelesAl.innerHTML = alturaTriangulo(input_isosceles1.value, input_isosceles2.value, input_isosceles3.value) : null;
      case 5:
        input_circunferencia.value ? circunferenciaPe.innerHTML = perimetroCircunferencia(input_circunferencia.value, unidad).toFixed(3) + unidad : null;
        break;
      case 6:
      input_circunferencia.value ? circunferenciaAr.innerHTML = areaCircunferencia(input_circunferencia.value, unidad).toFixed(3) + unidad + '^2': null;
    }
  }
}

function alturaTriangulo(lado1, lado2, base){
  let respuesta;
  if (lado1 == lado2 && lado1 != base && lado2 != base) {
    respuesta = Math.sqrt( (lado1 * lado1) - ( (base * base) / 4) ).toFixed(2) + unidad;
    if (isNaN(parseInt(respuesta))) {
      respuesta = 'Error matemático'
    }
  }
  else{
    respuesta = 'No es isósceles...'
  }
  return respuesta;
}
function perimetroCuadrado(lado, unidad){
  return (lado * 4) + unidad;
}
function areaCuadrado(lado, unidad){
  return (lado * lado) + unidad + '^2';
}
function perimetroTriangulo(lado1, lado2, base, unidad){
  return Number(lado1) + Number(lado2) + Number(base) + unidad;
}
function areaTriangulo(base, altura, unidad){
  return ((base * altura) / 2) + unidad + '^2';
}
function perimetroCircunferencia(radio){
  return (radio * 2) * Math.PI;
}
function areaCircunferencia(radio){
  return radio * radio * Math.PI;
}
