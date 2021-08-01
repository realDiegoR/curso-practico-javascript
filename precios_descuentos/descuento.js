//define los cupones
let cupones = [{nombre:'Verano 2021', valor: 20, elegido: false}, {nombre:'Regreso a Clases', valor: 5, elegido: false}, {nombre:'Patriótico', valor: 10, elegido: false}]
let mostradorCupones = document.getElementById('cupones') //donde se clickean los cupones
//imprime los cupones para ser clickeados
cupones.forEach((item) => {
  mostradorCupones.innerHTML += `<li class="coupons__list-item">${item.nombre} [ ${item.valor}% ]</li>`
});

//algoritmo para detectar el cupon clickeado
let cuponesDisponibles = document.getElementsByClassName('coupons__list-item');
let cuponElegido = document.getElementById('coupon-true')
for (var i = 0; i < cuponesDisponibles.length; i++) {
  cuponesDisponibles[i].addEventListener('click', elegir(i))
}
//asigna el cupon elegido y elimina el anterior
function elegir(item){
  let ganador = cupones[item];
  return function(){
    cupones.forEach((todos) => todos.elegido = false);
    cuponElegido.innerHTML = `Elegido: ${ganador.nombre}`
    ganador.elegido = true;
  }
}

//elimina el cupon elegido
document.getElementById('quit-button').addEventListener("click", ()=>{
  cupones.forEach((todos) => todos.elegido = false);
  cuponElegido.innerHTML = `Elegido: Ninguno`
})

//detecta los inputs
let producto = document.getElementById("product");
let descuento = document.getElementById("discount");

//calcula los precios
document.getElementById("calculate").addEventListener("click", ()=>{
  let productoPrecio = parseInt(producto.value);
  let descuentoPrecio = parseInt(descuento.value);
  let cuponDescuento = cupones.find(function(item){
    return item.elegido == true;
  })
  if (cuponDescuento) {
    descuentoPrecio += cuponDescuento.valor;
    descuentoPrecio > 100 ? descuentoPrecio = 100 : null;
  }
  let precioD;
  let precioF;
  if (productoPrecio) {
    precioF = (productoPrecio * (100 - descuentoPrecio)) / 100;
    precioD = productoPrecio - precioF
  }
  document.getElementById("output-total-discount").innerHTML = `Descuento total: ${descuentoPrecio}%`;
  document.getElementById("output-discounted").innerHTML = `Precio descontado: ${precioD}$`;
  document.getElementById("output-final-price").innerHTML = `Precio final: ${precioF}$`
})

//limitar los inputs
producto.addEventListener("change", ()=>{
  if(producto.value < 0){
    producto.value = 0;
  }
})
descuento.addEventListener("change", ()=>{
  if(descuento.value > 100){
    descuento.value = 100;
  }else if(descuento.value < 0){
    descuento.value = 0;
  }
})
