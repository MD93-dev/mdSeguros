//construyo el objeto ... el precio no se pasa por aca lo calculo invocando el metodo precioSeguro
class cotizaciones {
    constructor(id, marca, modelo, anio, valor, cobertura, nya, cp, movil, date) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.valor = valor ;
        this.cobertura = cobertura;
        this.nya = nya;
        this.cp = cp;
        this.movil = movil;
        this.date = date;
        this.precio = 0;



    }

    precioSeguro() {
        if (this.cobertura == "basica") {
            this.precio = Math.floor(this.valor * 0.01); // calcula el 1% del valor del vehiculo.... agrego math.floor por que sino me quedaban muchas decimales
        } else if (this.cobertura == "completa") {
            this.precio = Math.floor(this.valor * 0.015); // calcula el 1.5% del valor del vehiculo ... agrego math.floor por que sino me quedaban muchas decimales
        } else if (this.cobertura == "premium") {
            this.precio = Math.floor(this.valor * 0.02); // calcula el 2% del valor del vehiculo... agrego math.floor por que sino me quedaban muchas decimales
        }
    }

 }
