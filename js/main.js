//para esta segunda entrega, proyecto, solicitar cotizacion por formulario y mostrar por alert el precio de su seguro basado en un calculo simple
// 1) se pide los datos
// 2)  tomamos todos estos datos, construimos el objeto con new y los ponemos en un array
// 3) calculamos en el objeto el precio de su seguro que va a ser el  1 , 1.5 o 2% del valor de su vehiculo segun el tipo de cobertura que elija
// 3) mostrar por alert el precio
// creo array 
const nuevaCoti = [];
//selecciono formulario
const form = document.getElementById("formularioCotizar");
// Crear un contenedor para mostrar el mensaje debajo del formulario
const resultadoDiv = document.createElement("div");
resultadoDiv.id = "resultadoCotizacion";
resultadoDiv.style.marginTop = "20px";
form.parentNode.appendChild(resultadoDiv);
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
    //obtengo fecha para saber exactamente horario y fecha de cotizaciones
    const fechaCoti = new Date();
    //envio los datos obtenidos anteriormente al constructor
    const cotizacion = new cotizaciones(
        nuevaCoti.length + 1,
        marca,
        modelo,
        anio,
        parseFloat(valorVehiculo),
        cobertura,
        nya,
        cp,
        movil,
        fechaCoti
    );

    //local storage de la ultima cotizacion
    localStorage.setItem("Última cotización", JSON.stringify(cotizacion)); //guardo la ultima cotizacion en formato json para que no me devuelva objet object 

    //llamo al metodo personalizado para obligarlo a calcular el precio antes de mostrarlo
    cotizacion.precioSeguro();
    //creo variable con el precio para mejor manipulación y que quede en el objeto ( si solo la calculaba y usaba return no me quedaba en el objeto y no me parecia bien)
    const precioFinal = cotizacion.precio;
    //inserto el objeto en el array con el metodo push y luego muestro en consola para ver que este todo bien
    nuevaCoti.push(cotizacion);
    console.log(nuevaCoti);
    console.log(nuevaCoti[nuevaCoti.length - 1].precio);

    // Mostrar el mensaje en un recuadro debajo del formulario
    mostrarResultado(nya, marca, modelo, cp, precioFinal, movil);
    // Reseteo del formulario
    form.reset();
});
// Función para mostrar el resultado en el DOM
function mostrarResultado(nya, marca, modelo, cp, precioFinal, movil) {
    // Limpio cualquier contenido de cotizacion anterior previa
    resultadoDiv.innerHTML = "";
    // Creo un recuadro para el mensaje de la coti
    const mensajeDiv = document.createElement("div");
    mensajeDiv.style.border = "1px solid #ddd";
    mensajeDiv.style.padding = "15px";
    mensajeDiv.style.borderRadius = "5px";
    mensajeDiv.style.backgroundColor = "#f9f9f9";
    mensajeDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    mensajeDiv.style.marginTop = "15px";
    mensajeDiv.style.fontSize = "16px";
    mensajeDiv.style.color = "#333";

    // Inserto el contenido del mensaje
    mensajeDiv.innerHTML = `
        <p><strong>${nya.toUpperCase()}</strong>, gracias por cotizar con nosotros tu 
        <strong>${marca.toUpperCase()} ${modelo.toUpperCase()}</strong> 
        en el código postal <strong>${cp}</strong>.</p>
        <p>El precio de tu seguro es: <strong>$${precioFinal}</strong>.</p>
        <p>Te estaremos contactando al <strong>${movil}</strong> para mayor asesoramiento.</p>
        <p>¡Saludos y que tengas un excelente día!</p>
    `;

    // Añado el recuadro al contenedor de resultados
    resultadoDiv.appendChild(mensajeDiv);
}


// Local storage del array para entrega //

// cuando apreta submit actualizo el localstorage, no me salio ponerlo en la escucha del evento anterior, asi que hice todo un nuevo codigo apra esto
form.addEventListener("submit", () => {
    guardarEnLocalStorage(nuevaCoti); // llamo a la funcion que declaro abajo y le paso de valor el array
    
});
// Función para guardar en local storage
function guardarEnLocalStorage(array) {
    const arrayJSON = JSON.stringify(array); // Convertir el array en formato JSON para que se muestre bien en el valor
    localStorage.setItem("Listado cotizaciones", arrayJSON); // Guardar en local storage
    
}

