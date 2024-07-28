class Carrito {
        constructor() {
                this.productos = [];
    }

    agregarProducto = (producto) => {
        this.productos.push(producto);
    }
    
        verCarrito() {
                if (this.productos.length === 0) {
                        return 'El carrito esta vacio.';
                    } else {
                            let detallesCarrito = 'Carrito de compras:\n\n';
                            let total = 0;
                            this.productos.forEach((producto, el) => {
                    detallesCarrito += (el + 1) + '. ' + producto.nombre + ' - $' + producto.precio + '\n';
                total += producto.precio;
            });
            detallesCarrito += '\nTotal: $' + total;
            return detallesCarrito;
        }
    }
}

class Producto {
    constructor (nombre, precio, estado){
        this.nombre = nombre,
        this.precio = precio,
        this.estado = estado,
        this.detalles = () => {
            return 'Producto: ' + this.nombre + '\nPrecio: $' + this.precio + '\nEstado: ' + this.estado;
        }
    }
}

const producto1 = new Producto('sillon', 130, 'nuevo');
const producto2 = new Producto('lampara', 19, 'nuevo');
const producto3 = new Producto('alfombra', 13, 'usado');
const producto4 = new Producto('mesa', 23, 'nuevo');
const producto5 = new Producto('mantel', 3, 'usado')

const productos = [producto1, producto2, producto3, producto4, producto5];
const carrito = new Carrito();

let inicio;

do {
    inicio = prompt('Bienvenido a mi tienda online\n\nEscribe CONTINUAR para continuar o SALIR para salir').toUpperCase();

    if (inicio === 'CONTINUAR') {
        let productosALaVenta = 'Estos son nuestros productos a la venta:\n';
        productos.forEach(el => {
            productosALaVenta += '- ' + el.nombre + '\n';
        });
        
        let detalles;
        do{
        detalles = prompt(productosALaVenta + '\nEscribe el nombre del producto para ver mas detalles:\nEscribe CARRITO para ver el carrito o SALIR para salir').toLowerCase();
        let productoEncontrado = productos.find(el => el.nombre.toLowerCase() === detalles.toLowerCase());

        if (productoEncontrado) {
            alert(productoEncontrado.detalles());

            let comprar = confirm('Queres comprarlo?');
            if (comprar){
                carrito.agregarProducto(productoEncontrado);
                let seguirComprando = confirm('Gracias por tu compra.\n\nToca aceptar si queres seguir comprando!');
                if(!seguirComprando){
                    inicio = 'SALIR';
                    alert('Gracias por visitar o no nuestra tienda!');
                    break
                }
            }else{
                alert('Okey, segui navegando entonces!');
            }
        } else if(detalles === 'carrito'){
            alert(carrito.verCarrito());

        }else if(detalles === 'salir'){
            alert('Gracias por visitar nuestra tienda');
            break

        }else {
            alert('Producto no encontrado. Intenta denuevo');
        }
    }while(true);

    } else if (inicio === 'SALIR') {
        alert('Gracias por no visitar nuestra tienda!');

    } else {
        alert('Texto no valido. Escribe CONTINUAR o SALIR.');

    }
} while (inicio !== 'CONTINUAR' && inicio !== 'SALIR');


