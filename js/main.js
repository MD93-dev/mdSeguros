
//input de datos

let nombre = prompt("ingrese nombre")
let edad = prompt("ingrese edad, solo si sos mayor podes continuar")

// hago prueba de if

/*if (edad >= 18 ) {
    alert ("sos mayor")
} else {
    alert ("sos menor")
}*/

// hacemos un while para que vuelva a pedir edad hasta que sea mayor y uso ley DeMorgan para aplicar lo visto
while (!(edad >= 18)) {
     nombre = prompt(" la persona anterior era menor, ingrese nuevo nombre")
     edad = prompt("ingrese edad, solo si sos mayor podes continuar") 
}


// hacemos iteracion do while para practicar y mezclamos con condicional IF

let ingresarSistema 

do {
    ingresarSistema = prompt("¿Deseas ingresar al sistema " + nombre +" ? Responde 'SI' o 'NO':").toUpperCase();
} while (ingresarSistema !== "SI" && ingresarSistema !== "NO") ;

if (ingresarSistema === "SI") {
    alert("Bienvenido al sistema " + nombre);
} else {
    alert("Has decidido no ingresar al sistema " + nombre);
}

