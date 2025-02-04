// NUEVAS FUNCIONALIDADES PARA LA ENTREGA FINAL
// 1. Carga de localidades en un nuevo selector que creo con manejo de DOM 
// 2. Uso de setTimeout frenando el muestro de cotizacion para mostrar spinner antes de la cotización. 
// 3. Uso de new Promise para la carga de localidades en el selector creado anteriormente.


// creo array 
const nuevaCoti = [];
// //selecciono formulario y creo el contenedor de resultados
const form = document.getElementById("formularioCotizar");
// Crear un contenedor para mostrar el mensaje debajo del formulario
const resultadoDiv = document.createElement("div");
resultadoDiv.id = "resultadoCotizacion";
resultadoDiv.style.marginTop = "20px";
form.parentNode.appendChild(resultadoDiv);
// Creo etiqueta y selector de localidades
const localidadLabel = document.createElement("label");
localidadLabel.setAttribute("for", "localidad");
localidadLabel.textContent = "Localidad:";

const localidadSelect = document.createElement("select");
localidadSelect.id = "localidad";
localidadSelect.name = "localidad";
localidadSelect.required = true;

const opcionPorDefecto = document.createElement("option");
opcionPorDefecto.value = "";
opcionPorDefecto.textContent = "Seleccione una localidad";
opcionPorDefecto.disabled = true;
opcionPorDefecto.selected = true;
localidadSelect.appendChild(opcionPorDefecto);

// Agregar el selector al formulario
const fieldset = form.children[1]; 
fieldset.appendChild(localidadLabel);
fieldset.appendChild(localidadSelect);

// Funcion para cargar localidades del json usando new Promise, fetch , then y catch
function cargarLocalidades() {
    return new Promise((resolve, reject) => {
        fetch("./mocks/localidades.json")
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject("Error al obtener localidades:" + error));
    });
}

// Llamar a la funcion para cargar localidades y completar datos de localidades en el selector usando el forEach 
cargarLocalidades()
    .then(data => {
        data.forEach(loc => {
            const option = document.createElement("option");
            option.value = loc.localidad;
            option.textContent = loc.localidad;
            localidadSelect.appendChild(option);
        });
    })
    .catch(error => console.error(error));

// Evento submit del formulario frenandolo por 5 segundos con setTimeout y animacion de spinner ( me quedo medio a la izquierda pero no tengo tiempo para arreglarlo, le puse margin:auto pero no funciono )
form.addEventListener("submit", (event) => {
    event.preventDefault(); //parar el form en el evento submit ( boton cotizar )
    resultadoDiv.innerHTML = `<div style="margin: auto;" class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div>`;
    
    setTimeout(() => {
         //recupero campos usando children ( la que vimos en el ultimo after me parecio muy dificil ) .. utilizo metodo trim para sacar espacios al principio y final 
        const marca = form.children[0].children[2].value.trim();
        const modelo = form.children[0].children[4].value.trim();
        const anio = form.children[0].children[6].value.trim();
        const valorVehiculo = form.children[0].children[8].value.trim();
        const cobertura = form.children[0].children[10].value;
        const nya = form.children[1].children[2].value.trim();
        const cp = form.children[1].children[4].value.trim();
        const movil = form.children[1].children[6].value.trim();
        const localidad = localidadSelect.value;
//obtengo fecha para saber exactamente horario y fecha de cotizaciones
        const fechaCoti = new Date();
//envio los datos obtenidos anteriormente al constructor
        const cotizacion = new cotizaciones(
            nuevaCoti.length + 1, marca, modelo, anio,
            parseFloat(valorVehiculo), cobertura, nya, cp, movil, fechaCoti
        );
//local storage de la ultima cotizacion
        localStorage.setItem("Última cotización", JSON.stringify(cotizacion));
//llamo al metodo personalizado para obligarlo a calcular el precio antes de mostrarlo
        cotizacion.precioSeguro();
//creo variable con el precio para mejor manipulación y que quede en el objeto ( si solo la calculaba y usaba return no me quedaba en el objeto y no me parecia bien)
        const precioFinal = cotizacion.precio;
//inserto el objeto en el array con el metodo push y luego muestro en consola para ver que este todo bien
        nuevaCoti.push(cotizacion);
        mostrarResultado(nya, marca, modelo, cp, localidad, precioFinal, movil);
        form.reset();
    }, 5000);
});
// Mostrar el mensaje en un recuadro debajo del formulario
function mostrarResultado(nya, marca, modelo, cp, localidad, precioFinal, movil) {
    resultadoDiv.innerHTML = "";
    const mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("resultado-cotizacion");
    mensajeDiv.innerHTML = `
        <p><strong>${nya.toUpperCase()}</strong>, gracias por cotizar con nosotros tu 
        <strong>${marca.toUpperCase()} ${modelo.toUpperCase()}</strong> en la localidad <strong>${localidad}</strong> (CP: <strong>${cp}</strong>).</p>
        <p>El precio de tu seguro es: <strong>$${precioFinal}</strong>.</p>
        <p>Te estaremos contactando al <strong>${movil}</strong> para mayor asesoramiento.</p>
        <p>¡Saludos y que tengas un excelente día!</p>
    `;
    resultadoDiv.appendChild(mensajeDiv);
}
