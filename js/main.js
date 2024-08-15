class Carrito {
    constructor() {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        this.productos = carritoGuardado || [];
    }


    verCarrito() {
        const carritoContainer = document.getElementById("carritoContainer");
        const totalContainer = document.getElementById("totalContainer")
        carritoContainer.innerHTML = "";
        totalContainer.innerHTML = "";

        if (this.productos.length === 0) {
            alert("El carrito esta vacio")
        } else {
            let total = 0;

            this.productos.forEach((producto) => {
                const card = document.createElement("div");
                card.className = "card";

                const titulo = document.createElement("h3");
                titulo.innerText = producto.nombre;

                const imagen = document.createElement("img");
                imagen.src = producto.imagen;
                imagen.className = "img";

                const precio = document.createElement("p");
                precio.innerText = "$" + producto.precio;

                const cantidad = document.createElement("p");
                cantidad.innerText = "Cantidad: " + producto.cantidad;

                card.append(imagen);
                card.append(titulo);
                card.append(precio);
                card.append(cantidad);

                carritoContainer.appendChild(card);

                total += producto.precio * producto.cantidad;
            });

            const precioTotal = document.createElement("p");
            precioTotal.className = "precioTotal";
            precioTotal.innerText = "Total: $" + total;
            totalContainer.append(precioTotal);
        }
    }

    agregarProducto(producto) {
        const indexProducto = this.productos.findIndex(el => el.id === producto.id);
        if (indexProducto !== -1) {
            this.productos[indexProducto].cantidad += 1;
        } else {
            producto.cantidad = 1;
            this.productos.push(producto);
        }
    }

    vaciarCarrito() {
        this.productos = [];
        this.guardarCarrito();
        const carritoContainer = document.getElementById("carritoContainer");
        carritoContainer.innerHTML = "";
        totalContainer.innerHTML = "";
    }

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.productos));
    }

    limpiarCarrito() {
        localStorage.removeItem('carrito');
    }
}



class Producto {
    constructor(id, imagen, nombre, precio, estado) {
        this.id = id;
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.estado = estado;
        this.cantidad = 0;
    }

    detalles() {
        return 'Producto: ' + this.nombre + '\nPrecio: $' + this.precio + '\nEstado: ' + this.estado;
    }
}

const producto1 = new Producto(1,'/assets/sillon.jpg','sillon', 130, 'nuevo');
const producto2 = new Producto(2,'/assets/lampara.jpg','lampara', 15, 'nuevo');
const producto3 = new Producto(3,'/assets/alfombra.jpg','alfombra', 13, 'usado');
const producto4 = new Producto(4,'/assets/mesa.jpg','mesa', 23, 'nuevo');
const producto5 = new Producto(5,'/assets/mantel.jpg','mantel', 3, 'usado');

const productos = [producto1, producto2, producto3, producto4, producto5];
const carrito = new Carrito();

const container = document.getElementById("container");

function createCard(producto) {
    const card = document.createElement("div");
    card.className = "card";
    
    const titulo = document.createElement("h3");
    titulo.innerText = producto.nombre;
    
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.className = "img";
    
    const precio = document.createElement("p");
    precio.innerText = "$" + producto.precio;

    const estado = document.createElement("p");
    estado.className = "estado";
    estado.innerText = producto.estado;
    
    const boton = document.createElement("button");
    boton.className = "btn";
    boton.innerText = "Agregar al carrito";
    boton.onclick = () => carrito.agregarProducto(producto);
    
    card.append(imagen);
    card.append(titulo);
    card.append(precio);
    card.append(estado);
    card.append(boton);
    
    container.append(card);
}

productos.forEach(el => createCard(el));

const btnContainer = document.getElementById("btnContainer");

const vaciarCarrito = document.createElement("button");
vaciarCarrito.className = "vaciarCarrito";
vaciarCarrito.innerText = "Vaciar Carrito";
vaciarCarrito.onclick = () => {
    carrito.vaciarCarrito();
    alert('Vaciaste el carrito');
}

const verCarrito = document.createElement("button");
verCarrito.className = "verCarrito";
verCarrito.innerText = "Ver Carrito";
verCarrito.onclick = () => carrito.verCarrito();

btnContainer.append(vaciarCarrito);
btnContainer.append(verCarrito);
