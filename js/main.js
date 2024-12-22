//para esta segunda entrega, proyecto, solicitar cotizacion por formulario y mostrar por alert el precio de su seguro basado en un calculo simple
// 1) se pide los datos
// 2)  tomamos todos estos datos, construimos el objeto con new y los ponemos en un array
// 3) calculamos en el objeto el precio de su seguro que va a ser el  1 , 1.5 o 2% del valor de su vehiculo segun el tipo de cobertura que elija
// 3) mostrar por alert el precio




// creo array 
const nuevaCoti = [];

//selecciono formulario

const form = document.getElementById("formularioCotizar");

//parar el form en el evento submit ( boton cotizar )

form.addEventListener("submit", (event) => {
    event.preventDefault();

    //recupero campos usando children ( la que vimos en el ultimo after me parecio muy dificil ) .. utilizo metodo trim para sacar espacios al principio y final 
const marca = form.children[0].children[2].value.trim();
const modelo = form.children[0].children[4].value.trim();
const anio = form.children[0].children[6].value.trim();
const valorVehiculo = form.children[0].children[8].value.trim();
const cobertura = form.children[0].children[10].value;
const nya = form.children[1].children[2].value.trim();
const cp = form.children[1].children[4].value.trim();
const movil = form.children[1].children[6].value.trim();

//obtengo fecha para saber  exactamente horario y fecha de cotizaciones
const fechaCoti = new Date;


//envio los datos obtenidos anteriormente al constructor
const cotizacion = new cotizaciones(nuevaCoti.length +1, marca, modelo, anio, parseFloat(valorVehiculo), cobertura, nya, cp, movil, fechaCoti);
//llamo al metodo personalizado para obligarlo a calcular el precio antes de mostrarlo
cotizacion.precioSeguro();
//creo variable con el precio para mejor manipulación y que quede en el objeto ( si solo la calculaba y usaba return no me quedaba en el objeto y no me parecia bien)
const precioFinal = cotizacion.precio;
//inserto el objeto en el array con el metodo push y luego muestro en consola para ver que este todo bien
nuevaCoti.push(cotizacion);
console.log(nuevaCoti);
console.log(nuevaCoti[nuevaCoti.length - 1].precio);


// saco resultado texto final por alert ...  lo pondria en un recuadro para que se muestre en html pero estoy cansado jefe
alert(nya.toUpperCase() + " Gracias por cotizar con nosotros tu " + marca.toUpperCase() + " " + modelo.toUpperCase() + " en el codigo postal " + cp + ". El precio de tu seguro es "+ precioFinal + " . Te vamos a estar contactando al " + movil + " para mayor asesoramiento. Saludos y que tenga un excelente dia.")
   

form.reset();
});


