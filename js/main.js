class Carrito {
    constructor() {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        this.productos = carritoGuardado || [];
    }

    verCarrito() {
        if (this.productos.length === 0) {
            Swal.fire("¡El carrito está vacío!");
            return;
        }

        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('carritoContent').style.display = 'block';
    
        document.querySelector(".verCarrito").style.display = 'none';
    
        const carritoContainer = document.getElementById("carritoContainer");
        const totalContainer = document.getElementById("totalContainer");
        carritoContainer.innerHTML = "";
        totalContainer.innerHTML = "";
    
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

    agregarProducto(producto) {
        const indexProducto = this.productos.findIndex(el => el.id === producto.id);
        if (indexProducto !== -1) {
            this.productos[indexProducto].cantidad += 1;
        } else {
            producto.cantidad = 1;
            this.productos.push(producto);
        }
        this.guardarCarrito();
    }

    vaciarCarrito() {
        if (this.productos.length === 0) {
            Swal.fire("El carrito está vacío!");
            return;
        }
        
        Swal.fire({
            title: "Estás seguro que quieres vaciar el carrito?",
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Sí",
            denyButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Vaciaste el carrito!", "", "success").then(() => {
                    this.productos = [];
                    this.limpiarCarrito();
                    this.verCarrito();
                });
            } else if (result.isDenied) {
                Swal.fire("No eliminaste el carrito!", "", "info");
            }
        });
    }
    

    guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(this.productos));
    }

    limpiarCarrito() {
        localStorage.removeItem("carrito");
        document.getElementById("carritoContainer").innerHTML = "";
        document.getElementById("totalContainer").innerHTML = "";
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

const carrito = new Carrito();

const container = document.getElementById("container");

async function cargarDatos() {
    try {
        const response = await fetch('./data.json');
        
        const data = await response.json();
        
        data.forEach(el => {
            createCard(el);
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

cargarDatos();

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

document.getElementById('volverBtn').onclick = () => {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('carritoContent').style.display = 'none';

    document.querySelector(".verCarrito").style.display = 'inline-block';
};

const btnContainer = document.getElementById("btnContainer");

const vaciarCarrito = document.createElement("button");
vaciarCarrito.className = "vaciarCarrito";
vaciarCarrito.innerText = "Vaciar Carrito";
vaciarCarrito.onclick = () => {
    carrito.vaciarCarrito();
}

const verCarrito = document.createElement("button");
verCarrito.className = "verCarrito";
verCarrito.innerText = "Ver Carrito";
verCarrito.onclick = () => carrito.verCarrito();

btnContainer.append(vaciarCarrito);
btnContainer.append(verCarrito);
